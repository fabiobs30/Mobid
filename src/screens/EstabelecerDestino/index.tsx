import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View, Alert, FlatList, Platform } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import axios from "axios";
import { Container } from "./styles";
import { InputComponent } from "../../components/input";
import { useAuth } from "../../Hooks/Auth";
import { useNavigation } from '@react-navigation/native';

interface Place {
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  };
}

export function EstabelecerDestino() {
  const { cliente } = useAuth();
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [localAtual, setLocalAtual] = useState<string>("");
  const [destino, setDestino] = useState<string>("");
  const [sugestoesOrigem, setSugestoesOrigem] = useState<Place[]>([]);
  const [sugestoesDestino, setSugestoesDestino] = useState<Place[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const getMyLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
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
          key: "AIzaSyDlMAyleZW_XoPxeDhdw9_RJr8aHRauab4", // Substitua pela sua API Key do Google Maps
        }
      });
      if (response.data.results.length > 0) {
        const address = response.data.results[0].formatted_address;
        setLocalAtual(address); // Definir o endereço atual
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const searchPlaceByName = async (query: string, type: 'origem' | 'destino') => {
    if (latitude && longitude) {
      try {
        const response = await axios.get("https://maps.googleapis.com/maps/api/place/textsearch/json", {
          params: {
            query: query,
            location: `${latitude},${longitude}`,
            radius: 20000, // Ajuste o raio conforme necessário
            key: "AIzaSyDlMAyleZW_XoPxeDhdw9_RJr8aHRauab4", // Substitua pela sua API Key do Google Maps
          }
        });
        if (type === 'origem') {
          setSugestoesOrigem(response.data.results);
        } else {
          setSugestoesDestino(response.data.results);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSelectPlace = (place: Place, type: 'origem' | 'destino') => {
    if (type === 'origem') {
      setLocalAtual(place.name); // Define o local atual como origem
      setSugestoesOrigem([]);
    } else {
      setDestino(place.name); // Define o destino
      setSugestoesDestino([]);
    }

    const coordenadas = {
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
    };

    if (type === 'destino') {
      navigation.navigate('MapaTela', {
        origem: { latitude, longitude },
        destino: coordenadas
      });
    }
  };


  return (
    <Container>
      <InputComponent
        onChangeText={(text) => {
          setLocalAtual(text);
          searchPlaceByName(text, 'origem');
        }}
        value={localAtual} // Mostrar o local atual no input
        placeholder="Digite o local de origem"
        placeholderTextColor={"silver"}
      />
      {sugestoesOrigem.length > 0 && (
        <FlatList
          data={sugestoesOrigem}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectPlace(item, 'origem')}>
              <Text>{item.name} - {item.vicinity}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <InputComponent
        onChangeText={(text) => {
          setDestino(text);
          searchPlaceByName(text, 'destino');
        }}
        value={destino} // Atualizar o valor do input de destino
        placeholder="Digite o nome do destino"
        placeholderTextColor={"silver"}
      />
      {sugestoesDestino.length > 0 && (
        <FlatList
          data={sugestoesDestino}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectPlace(item, 'destino')}>
              <Text>{item.name} - {item.vicinity}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </Container>
  );
}
