import React, { useEffect, useState } from "react";
import { Container, TouchableOpacity } from "./styles";
import axios from "axios";
import { InputComponent } from "../../components/input";
import { Alert, Platform, Text } from "react-native";
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

interface Locais {
  name: string;
  vicinity: string;
  rating: number;
  user_ratings_total:number;
  opening_hours?:{open_now:boolean};  
}

export function EstabelecerDestino(){
  const [latitude, setLatitude] = useState<number|null>(null);
  const [longitude, setLongitude] = useState<number|null>(null);
  const [local, setLocal] = useState<string|undefined>(undefined);
  const [locais, setLocais] = useState<Locais[]>([]);
  useEffect(() => {
    requestLocationPermission();
  }, []);
  const getMyLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
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
  const location = async () => {
    if(latitude && longitude && local){
      try {
        const response = await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json",
          {
            params:{
              location: `${latitude},${longitude}`, 
              radius: 2000000,
              keyword: local, key:"AIzaSyDlMAyleZW_XoPxeDhdw9_RJr8aHRauab4",
            }
          }
        );
        setLocais(
          response.data.results
        );
        console.log(response.data.results);
        console.log("latitude",latitude,"longitude",longitude,"local",local);
      } catch (error) {
        console.error(error);
      }
    }
  } 
  return(
    <Container>
      <InputComponent
      onChangeText={setLocal} value={local} placeholder="local" placeholderTextColor={"silver"}/>
      <TouchableOpacity onPress={location}>
        <Text>toa</Text>
      </TouchableOpacity>
    </Container>
  )
}