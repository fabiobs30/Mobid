import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import { addMessageHandler, removeMessageHandler } from './useWebSocket';
import useWebSocket from './useWebSocket';
import { useRoute } from '@react-navigation/native';
import  FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
interface Origem {
  latitude: number;
  longitude: number;
}

interface LocalizacaoMotorista {
  latitude: number;
  longitude: number;
}

const MapaMotorista = () => {
  const route = useRoute();
  const params = route.params as { origem: Origem };
  const origem = params.origem;

  const [localizacaoMotorista, setLocalizacaoMotorista] = useState<LocalizacaoMotorista | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);

  useWebSocket();

  useEffect(() => {
    const handleUpdateLocation = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.action === 'update_location') {
        const novaLocalizacao = {
          latitude: message.localizacao_lat,
          longitude: message.localizacao_lon,
        };
        setLocalizacaoMotorista(novaLocalizacao);
      }
    };

    addMessageHandler(handleUpdateLocation);

    return () => {
      removeMessageHandler(handleUpdateLocation);
    };
  }, []);

  useEffect(() => {
    const fetchRoute = async () => {
      if (localizacaoMotorista) {
        try {
          const response = await axios.get(
            'https://maps.googleapis.com/maps/api/directions/json',
            {
              params: {
                origin: `${origem.latitude},${origem.longitude}`,
                destination: `${localizacaoMotorista.latitude},${localizacaoMotorista.longitude}`,
                key: 'AIzaSyDlMAyleZW_XoPxeDhdw9_RJr8aHRauab4', // Substitua pela sua API Key do Google Maps
              },
            }
          );

          const points = response.data.routes[0].overview_polyline.points;
          const route = decodePolyline(points);
          setRouteCoordinates(route);
        } catch (error) {
          console.error('Erro ao buscar a rota:', error);
        }
      }
    };

    fetchRoute();
  }, [origem, localizacaoMotorista]);

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

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origem.latitude,
          longitude: origem.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Marker de Origem */}
        <Marker
          coordinate={origem}
          title="Origem"
          description="Local de origem da solicitação"
        />

        {/* Marker do Motorista com Ícone Personalizado */}
        {localizacaoMotorista && (
          <Marker
            coordinate={localizacaoMotorista}
            title="Motorista"
            description="Localização atual do motorista"
          >
            <FontAwesome5 name="car" size={24} color="blue" />
          </Marker>
        )}

        {/* Rota entre a origem e o motorista */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#0000FF"
            strokeWidth={3}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapaMotorista;
