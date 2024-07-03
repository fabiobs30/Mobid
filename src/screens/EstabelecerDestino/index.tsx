import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View, Alert, Platform } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import axios from "axios";
import { Container } from "./styles";
import { InputComponent } from "../../components/input";

interface Locais {
  name: string;
  vicinity: string;
  rating: number;
  user_ratings_total: number;
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  };
  opening_hours?: { open_now: boolean };
}

export function EstabelecerDestino() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [local, setLocal] = useState<string | undefined>(undefined);
  const [locais, setLocais] = useState<Locais[]>([]);
  const [latitudeDelta, setLatitudeDelta] = useState(0.005);
  const [longitudeDelta, setLongitudeDelta] = useState(0.005);
  const [destino, setDestino] = useState<string>("");

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
        setLocal(address);
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

  const searchPlaceByName = async () => {
    if (latitude && longitude && local) {
      try {
        const response = await axios.get("https://maps.googleapis.com/maps/api/place/textsearch/json", {
          params: {
            query: local,
            location: `${latitude},${longitude}`,
            radius: 20000, // Ajuste o raio conforme necessário
            key: "AIzaSyDlMAyleZW_XoPxeDhdw9_RJr8aHRauab4", // Substitua pela sua API Key do Google Maps
          }
        });
        setLocais(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const increaseZoom = () => {
    setLatitudeDelta(prev => Math.max(0.001, prev - 0.001));
    setLongitudeDelta(prev => Math.max(0.001, prev - 0.001));
  };

  const decreaseZoom = () => {
    setLatitudeDelta(prev => prev + 0.001);
    setLongitudeDelta(prev => prev + 0.001);
  };

  return (
    <Container>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <InputComponent
          style={{ flex: 1 }}
          onChangeText={setLocal}
          value={local}
          placeholder="Digite o nome do local"
          placeholderTextColor={"silver"}
        />
        <TouchableOpacity onPress={searchPlaceByName}>
          <Text>Buscar</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <InputComponent
          style={{ flex: 1 }}
          onChangeText={setDestino}
          value={destino}
          placeholder="Digite o destino"
          placeholderTextColor={"silver"}
        />
        <TouchableOpacity onPress={() => {}}>
          <Text>Iniciar Rota</Text>
        </TouchableOpacity>
      </View>
      
      {latitude && longitude && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {locais.map((local, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: local.geometry.location.lat,
                longitude: local.geometry.location.lng,
              }}
              title={local.name}
              description={local.vicinity}
            />
          ))}
        </MapView>
      )}
      
      <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
        <TouchableOpacity onPress={increaseZoom}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={decreaseZoom} style={{ marginLeft: 20 }}>
          <Text>-</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
