import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import InputPicker from "../../../components/inputPicker";
import { Alert, Platform } from "react-native";
import axios from "axios";
import { GOOGLE_PLACE_API_KEY } from "@env";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
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
  vicinity: string;
  rating: number;
  user_ratings_total: number;
  opening_hours?: {open_now: boolean};
  place_id: string;
}

export default function Agendar(){
  const [estados, setEstados] = useState<
    {label: string; value: string; id: string}[]
  >([]);
  const [cidades, setCidades] = useState<
    {label: string; value: string; id: string}[]
  >([]);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [cidadeId, setCidadeId] = useState('');
  const [local, setLocal] = useState<string | undefined>(undefined);
  const [estadoId, setEstadoId] = useState('');
  const [estado, setEstado] = useState('');
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
        //getLocation();
      } else {
        const result = await request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );

        if (result === RESULTS.GRANTED) {
          //getLocation();
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
  const fetchPlaces = async () => {
    if (latitude && longitude && local) {
      try {
        const response = await axios.get(
          'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
          {
            params: {
              location: `${latitude},${longitude}`,
              radius: 225347,
              keyword: local,
              key: GOOGLE_PLACE_API_KEY,
            },
          },
        );
        //console.log('latitude api', latitude, 'longitude api', longitude);
        setPlaces(response.data.results);
        console.log('resultado', response.data.results);
      } catch (error) {
        console.error(error);
      }
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

      // Formatando os estados para o formato que o InputPicker espera
      const estadosFormatted = response.data.map(estado => ({
        label: `${estado.nome} - ${estado.sigla}`,
        value: estado.sigla,
        id: estado.id,
      }));

      setEstados(estadosFormatted);
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
      Alert.alert(
        'Erro',
        'Não foi possível carregar os estados. Verifique sua conexão.',
      );
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
  return(
    <Container>
      <InputPicker
        items={estados}
        onValueChange={handleValueChangeState}
      />
      <InputPicker
        items={cidades}
        onValueChange={handleValueChangeCity}
      />
    </Container>
  );
} 