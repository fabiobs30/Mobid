// MapaTela.tsx
import React, { useEffect, useRef, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ButtonRider, ButtonRiderText } from "./styles";
import { useAuth } from "../../../Hooks/Auth";

interface MapaTelaProps {
  origem: { latitude: number; longitude: number };
  destino: { latitude: number; longitude: number };
}

export function MapaTela() {
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRoute();
  const params = route.params as MapaTelaProps;
  const { origem, destino } = params;
  const websocketRef = useRef<WebSocket | null>(null);
  const{usuario}= useAuth()
  const navigation = useNavigation();
  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const response = await axios.get("https://maps.googleapis.com/maps/api/directions/json", {
          params: {
            origin: `${origem.latitude},${origem.longitude}`,
            destination: `${destino.latitude},${destino.longitude}`,
            key: "AIzaSyDlMAyleZW_XoPxeDhdw9_RJr8aHRauab4", // Substitua pela sua API Key do Google Maps
          }
        });

        const points = response.data.routes[0].overview_polyline.points;
        const route = decodePolyline(points);
        setRouteCoordinates(route);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDirections();
  }, [origem, destino]);
  useEffect(() => {
    const ws = new WebSocket(`ws://192.168.100.249:8000/ws/cliente/${usuario.cliente_id}`);
    websocketRef.current = ws;
  
    ws.onopen = () => {
      console.log('Conexão estabelecida com sucesso.');
    };
  
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Mensagem recebida:", message);
  
      // Aqui você pode fazer algo com a mensagem recebida, como navegar para outra tela
      // ou armazenar o estado para exibir a informação.
    };
  
    return () => {
      ws.close();
    };
  }, [usuario.cliente_id]);
  // Função para decodificar polyline
  const decodePolyline = (t: string) => {
    let points = [];
    let index = 0, len = t.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({ latitude: (lat / 1E5), longitude: (lng / 1E5) });
    }
    return points;
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  
  const solicitarCorrida = () => {
    const solicitar = {
      solicitacao_corrida: {
        origem: { latitude: origem.latitude, longitude: origem.longitude },
        destino: { latitude: destino.latitude, longitude: destino.longitude },
        valor: 50.00
      }
    };
  
    // Verifica se o WebSocket está aberto e envia a mensagem
    if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
      websocketRef.current.send(JSON.stringify(solicitar));
      console.log("Mensagem enviada:", solicitar);
  
      // Agora, você pode navegar para a outra tela
      navigation.navigate('MapaMotorista', {
        origem: solicitar.solicitacao_corrida.origem
      });
      
    } else {
      console.log("WebSocket não está conectado.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: (origem.latitude + destino.latitude) / 2,
          longitude: (origem.longitude + destino.longitude) / 2,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker pinColor="yellow" coordinate={origem} title="Origem" />
        <Marker coordinate={destino} title="Destino" />

        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={5}
            strokeColor="blue"
          />
        )}
      </MapView>
      <ButtonRider onPress={solicitarCorrida}>
        <ButtonRiderText>solicitar corrida</ButtonRiderText>
      </ButtonRider>
    </View>
  );
};


