import React, { useEffect, useState } from "react";
import { Buttom, ButtonEntrar, Container, ContainerButtom, ContainerListaLocais, ContainerMap, TextListaLocais, TextListaLocaisNome, TituloInput, TouchableOpacityListaLocais, ContainerScroll } from "./styles";
import InputPicker from "../../../components/inputPicker";
import { Alert, FlatList,Platform, View} from "react-native";
import axios from "axios";
import api from "../../../services/api";
import { GOOGLE_PLACE_API_KEY } from "@env";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { InputComponent } from "../../../components/input";
import Geolocation from "@react-native-community/geolocation";
import { useAuth } from "../../../Hooks/Auth";
import MapView, { Marker, Polyline } from 'react-native-maps'
import {format} from 'date-fns';
import BackButton from "../../../components/BackButton";
interface Estados {
  id: string;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}
interface Cidades {
  id: string;
  nome: string;
  microrregiao: {
    id: number;
    nome: string;
  };
}
interface Place {
  name: string;
  place_id: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  };
}
export default function Agendar(){
  const [estados, setEstados] = useState<
    {label: string; value: string; id: string}[]
  >([]);
  const [cidades, setCidades] = useState<
    {label: string; value: string; id: string}[]
  >([]);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitudeEmbarque, setLatitudeEmbarque] = useState<number | null>(null);
  const [longituDesembarque, setLongitudeEmbarque] = useState<number | null>(null);
  const [latitudeDesembarque, setLatitudeDesembarque] = useState<number | null>(null);
  const [longitudeDesembarque, setLongitudeDsembarque] = useState<number | null>(null);
  const [localAtual, setLocalAtual] = useState<string>("");
  const [embarque, setEmbarque] = useState<string>("");
  const [destino, setDestino] = useState<string>("");
  const [cidadeId, setCidadeId] = useState('');
  const [estadoId, setEstadoId] = useState('');
  const [estado, setEstado] = useState('');
  const [sugestoesOrigem, setSugestoesOrigem] = useState<Place[]>([]);
  const [sugestoesDestino, setSugestoesDestino] = useState<Place[]>([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [hora, setHora] = useState<string | null>(null);
  const [dt_nascimento, setDt_nascimento] = useState('');
  const{usuario}= useAuth()
  useEffect(()=>{
    requestLocationPermission();
    fetchEstadosFromAPI();
  },[]);
  useEffect(() => {
    if (estado) {
      fetchCidadesFromAPI();
    }
  }, [estado]);
  const requestLocationPermission = async () => {
    try {
      const status = await check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );

      if (status === RESULTS.GRANTED) {
        getMyLocation();
      } else {
        const result = await request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );

        if (result === RESULTS.GRANTED) {
          getMyLocation();
        } else {
          Alert.alert(
            'Permissão de Localização Negada',
            'A permissão para acessar a localização foi negada. Por favor, permita o acesso nas configurações do dispositivo.',
          );
        }
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão de localização:', error);
    }
  };
  const gerarHorarios = () => {
    let horarios = [];
    for (let hora = 0; hora < 24; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 10) {
        let horaFormatada = String(hora).padStart(2, '0');
        let minutoFormatado = String(minuto).padStart(2, '0');
        horarios.push({
          label: `${horaFormatada}:${minutoFormatado}`,
          value: `${horaFormatada}:${minutoFormatado}`,
        });
      }
    }
    return horarios;
  };
  const [horaItems] = useState(gerarHorarios());
  const fetchCidadesFromAPI = async () => {
    try {
      const response = await axios.get<Cidades[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`,
      );
      const data = response.data;
      const cidadesFormatted = data.map(cidade => ({
        label: cidade.nome,
        value: cidade.id,
        id: cidade.id,
      }));
      //console.log('cidadesFormatted:', cidadesFormatted);
      setCidades(cidadesFormatted);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  };

  const handleValueChangeState = (value: string) => {
    const estadoSelecionada = estados.find(estado => estado.value === value);
    if (estadoSelecionada) {
      setEstado(estadoSelecionada.value); // Aqui definimos o valor selecionado
      setEstadoId(estadoSelecionada.id); // Aqui definimos o ID selecionado
      //console.log('estado selecionado:', estadoSelecionada.label);
      //console.log('id estado:', estadoSelecionada.id);
      
    }
  };
  const fetchEstadosFromAPI = async () => {
    try {
      const response = await axios.get<Estados[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      );

      const estadosFormatted = response.data
        .map(estado => ({
          label: `${estado.nome} - ${estado.sigla}`,
          value: estado.sigla,
          id: estado.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setEstados(estadosFormatted);
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
      Alert.alert(
        'Erro',
        'Não foi possível carregar os estados. Verifique sua conexão.',
      );
    }
  };
  const getMyLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitudeEmbarque(position.coords.latitude);
        setLongitudeEmbarque(position.coords.longitude);
        reverseGeocode(position.coords.latitude, position.coords.longitude);
      },
      error => {
        Alert.alert(
          'Erro',
          'Não foi possível obter a sua localização. Verifique as configurações do GPS.',
        );
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 1000 },
    );
  };
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          latlng: `${lat},${lng}`,
          key: GOOGLE_PLACE_API_KEY, // Substitua pela sua API Key do Google Maps
        }
      });
      if (response.data.results.length > 0) {
        const address = response.data.results[0].formatted_address;
        setLocalAtual(address); // Definir o endereço atual
        setEmbarque(address);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleValueChangeCity = async (value: string) => {
    const cidadeSelecionada = cidades.find(cidade => cidade.value === value);
    if (cidadeSelecionada) {
      setCidadeId(cidadeSelecionada.id); // Aqui definimos o ID selecionado
      //console.log('Cidade selecionada:', cidadeSelecionada.label);
      //console.log('id Cidade:', value);
      try {
        const response = await axios.get(
          `https://servicodados.ibge.gov.br/api/v3/malhas/municipios/${cidadeSelecionada.id}/metadados`,
        );
        //console.log('Dados da cidade:', response.data);
        const {latitude, longitude} = response.data[0].centroide;
        //console.log('latitude da cidade:', latitude);
        //console.log('longitude da cidade:', longitude);
        setLatitude(latitude);
        setLongitude(longitude);
      } catch (err) {
        console.error('Erro ao buscar dados da cidade:', err);
      }
    }
  };
  const searchPlaceByName = async (query: string, type: 'origem' | 'destino') => {
    if (latitudeEmbarque && longituDesembarque) {
      try {
        const response = await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
          params: {
            keyword:query,
            location: `${latitudeEmbarque},${longituDesembarque}`,
            radius: 20000, // Ajuste o raio conforme necessário
            key: GOOGLE_PLACE_API_KEY, // Substitua pela sua API Key do Google Maps
          }
        });
        if (type === 'origem') {
          setSugestoesOrigem(response.data.results);
          console.log(query)
        } else {
          setSugestoesDestino(response.data.results);
          //console.log("response:",response.data.results)
          console.log(query)
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  
  const handleSelectPlace = (place: Place, type: 'origem' | 'destino') => {
    if (type === 'origem') {
      setSugestoesOrigem([]);
      setLocalAtual(place.name); 
      setLatitudeEmbarque(place.geometry.location.lat)
      setLongitudeEmbarque(place.geometry.location.lng)
      // Define o local atual como origem
      
    } else {
      setSugestoesDestino([]);
      setDestino(place.name); // Define o destino
      setLatitudeDesembarque(place.geometry.location.lat)
      setLongitudeDsembarque(place.geometry.location.lng)
      fetchRoute()
      
    }

    const coordenadas = {
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
    };

  };
  const fetchRoute = async () => {
    if (latitudeEmbarque && longituDesembarque && latitudeDesembarque && longitudeDesembarque) {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
          params: {
            origin: `${latitudeEmbarque},${longituDesembarque}`,
            destination: `${latitudeDesembarque},${longitudeDesembarque}`,
            key: GOOGLE_PLACE_API_KEY, // Substitua pela sua chave de API
            mode: 'driving', // Você pode alterar para 'walking', 'bicycling', ou 'transit'
          }
        });

        if (response.data.routes.length > 0) {
          const points = response.data.routes[0].legs[0].steps.map((step: any)=> {
            return {
              latitude: step.end_location.lat,
              longitude: step.end_location.lng,
            };
          });

          setRouteCoordinates(points);
        }
      } catch (error) {
        console.error('Erro ao buscar rota:', error);
      }
    }
  };
  
  const handleSubmit = async () => {
    
    const cleanedText = dt_nascimento.replace(/\D/g, '');
    const dia = cleanedText.substring(0, 2);
    const mes = cleanedText.substring(2, 4);
    const ano = cleanedText.substring(4, 8);
    const novaData = new Date(
      parseInt(ano, 10),
      parseInt(mes, 10) - 1,
      parseInt(dia, 10),
    );
    
    const dataFormatada = format(novaData, 'yyyy-MM-dd');
      try {
        const response = await api.post('/agendamentos/', {
          cliente_id:usuario.cliente_id,
          estado_id:parseInt(estadoId, 10),
          municipio_id:parseInt(cidadeId, 10),
          nome_local_embarque:localAtual,
          local_embarque_lat: latitudeEmbarque,
          local_embarque_lon: longituDesembarque,
          nome_local_desembarque:destino,
          local_desembarque_lat: latitudeDesembarque, 
          local_desembarque_lon: longitudeDesembarque,
          horario_embarque: hora, 
          data_agendamento:dataFormatada
        });
        Alert.alert('Sucesso',response.data);
       
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
        Alert.alert('Erro', 'Não foi possível enviar os dados. Tente novamente.');
      }
    
  };

  return(
    
    <Container>
      <BackButton/>
      <TituloInput>Estado</TituloInput>
      <InputPicker
        items={estados}
        placeholder={{label: 'Obrigatório', value: null}}
        onValueChange={handleValueChangeState}
      />
      <TituloInput>Cidade</TituloInput>
      <InputPicker
        items={cidades}
        placeholder={{label: 'Obrigatório', value: null}}
        onValueChange={handleValueChangeCity}
        emptyMessage="selecione primeiro um Estado"
      />
      <TituloInput>Local de embarque</TituloInput>
      <InputComponent
        onChangeText={(text) => {
          setEmbarque(text);
          searchPlaceByName(text, 'origem');
         
        }}
        value={embarque} // Mostrar o local atual no input
        placeholder="Digite o local de origem"
        placeholderTextColor={"silver"}
        isFocused={true}
      />
      {localAtual !== embarque && sugestoesOrigem.length>0 && (
        <FlatList
          data={sugestoesOrigem}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <ContainerListaLocais>
            <TouchableOpacityListaLocais onPress={() => handleSelectPlace(item, 'origem')}>
              <TextListaLocaisNome>{item.name}</TextListaLocaisNome>
              <TextListaLocais>{item.vicinity}</TextListaLocais>
            </TouchableOpacityListaLocais>
            </ContainerListaLocais>
          )}
          
        />
      )}
      <TituloInput>Local de desembarque</TituloInput>
      <InputComponent
        onChangeText={(text) => {
          setDestino(text);
          searchPlaceByName(text, 'destino');
        }}
        value={destino} // Atualizar o valor do input de destino
        placeholder="Digite o nome do destino"
        placeholderTextColor={"silver"}
        isFocused={true}
      />
      {sugestoesDestino.length > 0 && (
        <FlatList
          data={sugestoesDestino}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <ContainerListaLocais>
            <TouchableOpacityListaLocais onPress={() => handleSelectPlace(item, 'destino')}>
            <TextListaLocaisNome>{item.name}</TextListaLocaisNome>
            <TextListaLocais>{item.vicinity}</TextListaLocais>
            </TouchableOpacityListaLocais>
            </ContainerListaLocais>
          )}
        />
      )}
      <TituloInput>Data do embarque</TituloInput>
      <InputComponent
        onChangeText={(formatted, extracted: any) => {
          return setDt_nascimento(extracted);
        }}
        mask="[00]/[00]/[0000]"
        placeholderTextColor={'black'}
        placeholder="Digite a data do embarque"
        keyboardType="numeric"
        isFocused={true}
      />
      <TituloInput>Horário de embarque</TituloInput>
      <InputPicker
            items={horaItems}
            onValueChange={(value: string) => setHora(value)}
            placeholder={{label: 'Horário', value: null}}
          />
      <ContainerButtom>
      <Buttom onPress={handleSubmit}>
      <ButtonEntrar >Cadastrar Agendamento</ButtonEntrar>
      </Buttom>
      </ContainerButtom>
      {latitudeEmbarque && longituDesembarque && latitudeDesembarque && longitudeDesembarque && (
        <ContainerMap>
        <MapView
          style={{ flex: 1, marginTop: 20 }}  // Adjust styling as needed
          initialRegion={{
            latitude: (latitudeEmbarque + latitudeDesembarque) / 2,
            longitude: (longituDesembarque + longitudeDesembarque) / 2,
            latitudeDelta: Math.abs(latitudeEmbarque - latitudeDesembarque) + 0.1,
            longitudeDelta: Math.abs(longituDesembarque - longitudeDesembarque) + 0.1,
          }}
        >
          {/* Markers for embarque and desembarque */}
          <Marker coordinate={{ latitude: latitudeEmbarque, longitude: longituDesembarque }} title="Embarque" />
          <Marker coordinate={{ latitude: latitudeDesembarque, longitude: longitudeDesembarque }} title="Desembarque" />
          
          {/* Route between embarque and desembarque */}
         
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#000"
          strokeWidth={4}
        />
      
        </MapView>
        </ContainerMap>
      )}
      
    </Container>
  );
} 