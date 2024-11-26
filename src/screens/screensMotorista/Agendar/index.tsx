import React, {useEffect, useState} from 'react';
import {
  Buttom,
  ButtonEntrar,
  Container,
  ContainerButtom,
  ContainerListaLocais,
  ContainerMap,
  TextListaLocais,
  TextListaLocaisNome,
  TituloInput,
  TouchableOpacityListaLocais,
} from './styles';
import InputPicker from '../../../components/inputPicker';
import {Alert, FlatList, Platform} from 'react-native';
import axios from 'axios';
import api from '../../../services/api';
import {GOOGLE_PLACE_API_KEY} from '@env';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import MapView, {Marker, Polyline} from 'react-native-maps';
import BackButton from '../../../components/BackButton';
import {useAuth} from '../../../Hooks/Auth';
import { useNavigation } from '@react-navigation/native';
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
interface Agendamento {
  cliente_id: number;
  data_agendamento: string;
  horario_embarque: string;
  id: number;
  local_desembarque_lat: number;
  local_desembarque_lon: number;
  local_embarque_lat: number;
  local_embarque_lon: number;
  municipio_id: number;
  nome_cliente: string;
  nome_local_desembarque: string;
  nome_local_embarque: string;
  status_agendamento: boolean;
}
interface AgendamentoSelecionado {
  motorista_id?: number;
  agendamento_id?: number;
  cliente_id?: number;
}
export default function AgendarMotorista() {
  const navigation = useNavigation()
  const [estados, setEstados] = useState<
    {label: string; value: string; id: string}[]
  >([]);
  const {usuario} = useAuth();
  const [cidades, setCidades] = useState<
    {label: string; value: string; id: string}[]
  >([]);
  const [AgendamentoSelecionado, setAgendamentoSelecionad] =
    useState<AgendamentoSelecionado>({});
  const [latitudeEmbarque, setLatitudeEmbarque] = useState<number | null>(null);
  const [longituDesembarque, setLongitudeEmbarque] = useState<number | null>(
    null,
  );
  const [latitudeDesembarque, setLatitudeDesembarque] = useState<number | null>(
    null,
  );
  const [longitudeDesembarque, setLongitudeDsembarque] = useState<
    number | null
  >(null);
  const [estado, setEstado] = useState('');
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [Agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  useEffect(() => {
    requestLocationPermission();
    fetchEstadosFromAPI();
  }, []);
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
      setEstado(estadoSelecionada.value);
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
      {enableHighAccuracy: true, timeout: 12000, maximumAge: 1000},
    );
  };
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            latlng: `${lat},${lng}`,
            key: GOOGLE_PLACE_API_KEY, // Substitua pela sua API Key do Google Maps
          },
        },
      );
      if (response.data.results.length > 0) {
        const address = response.data.results[0].formatted_address;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleValueChangeCity = async (value: string) => {
    const cidadeSelecionada = cidades.find(cidade => cidade.value === value);
    if (cidadeSelecionada) {
      try {
        // Utilizamos o ID diretamente na chamada da API
        const response = await api.get(
          `/buscar/agendamentos/pendentes/${cidadeSelecionada.id}`,
        );
        setAgendamentos(response.data);
      } catch (err) {
        console.error('Erro ao buscar agendamentos pendentes:', err);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post('/confirmar/agendamento', {
        motorista_id: usuario.motorista_id,
        agendamento_id: AgendamentoSelecionado.agendamento_id,
        cliente_id: AgendamentoSelecionado.cliente_id,
      });
  
      // Verifica se a resposta foi um sucesso (código 200)
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Agendamento confirmado!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('AgendamentoMotorista'), // Navega para a tela desejada
          },
        ]);
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      Alert.alert('Erro', 'Não foi possível enviar os dados. Tente novamente.');
    }
  };
  const HandleScheduling = (agendamentoId: number, clienteId: number) => {
    const novoAgendamento = {
      motorista_id: usuario.motorista_id,
      agendamento_id: agendamentoId,
      cliente_id: clienteId,
    };

    setAgendamentoSelecionad(novoAgendamento);
    console.log(novoAgendamento); // Loga o novo valor imediatamente
  };

  return (
    <Container>
      <BackButton />
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

      <FlatList
        data={
          AgendamentoSelecionado?.agendamento_id
            ? Agendamentos.filter(
                item => item.id === AgendamentoSelecionado.agendamento_id,
              )
            : Agendamentos
        }
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ContainerListaLocais>
            <TouchableOpacityListaLocais
              onPress={() => HandleScheduling(item.id, item.cliente_id)}>
              <TextListaLocaisNome>Nome: {item.nome_cliente}</TextListaLocaisNome>
              <TextListaLocais>Embarque: {item.nome_local_embarque}</TextListaLocais>
              <TextListaLocais>Desembarque: {item.nome_local_desembarque}</TextListaLocais>
              <TextListaLocais>Data: {item.data_agendamento}</TextListaLocais>
              <TextListaLocais>Horário: {item.horario_embarque}</TextListaLocais>
            </TouchableOpacityListaLocais>
          </ContainerListaLocais>
        )}
      />

      <ContainerButtom>
        <Buttom onPress={handleSubmit}>
          <ButtonEntrar>Aceitar</ButtonEntrar>
        </Buttom>
      </ContainerButtom>
      {latitudeEmbarque &&
        longituDesembarque &&
        latitudeDesembarque &&
        longitudeDesembarque && (
          <ContainerMap>
            <MapView
              style={{flex: 1, marginTop: 20}} // Adjust styling as needed
              initialRegion={{
                latitude: (latitudeEmbarque + latitudeDesembarque) / 2,
                longitude: (longituDesembarque + longitudeDesembarque) / 2,
                latitudeDelta:
                  Math.abs(latitudeEmbarque - latitudeDesembarque) + 0.1,
                longitudeDelta:
                  Math.abs(longituDesembarque - longitudeDesembarque) + 0.1,
              }}>
              {/* Markers for embarque and desembarque */}
              <Marker
                coordinate={{
                  latitude: latitudeEmbarque,
                  longitude: longituDesembarque,
                }}
                title="Embarque"
              />
              <Marker
                coordinate={{
                  latitude: latitudeDesembarque,
                  longitude: longitudeDesembarque,
                }}
                title="Desembarque"
              />

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
