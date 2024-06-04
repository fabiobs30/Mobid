// src/components/MapScreen.js
/*import React, { useState, useEffect } from 'react';
import { View, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Polyline from '@mapbox/polyline';
import { styles } from '';

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [destination, setDestination] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão de Localização',
            message: 'Este aplicativo precisa acessar sua localização',
            buttonNeutral: 'Pergunte-me depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Permissão de Localização negada');
        }
      } else {
        getCurrentLocation();
      }
    };

    requestLocationPermission();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          ...region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handlePlaceSelect = async (data, details) => {
    const {
      geometry: { location },
    } = details;
    const dest = {
      latitude: location.lat,
      longitude: location.lng,
      title: data.description,
    };
    setDestination(dest);
    const route = await getDirections(region, dest);
    setRouteCoords(route);
  };

  const getDirections = async (start, end) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&key=SUA_API_KEY_GOOGLE_DIRECTIONS`
      );
      const json = await response.json();
      const points = Polyline.decode(json.routes[0].overview_polyline.points);
      const coords = points.map(point => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      return coords;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker coordinate={region} title="Minha Localização" />
        {destination && (
          <Marker
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            title={destination.title}
          />
        )}
        {routeCoords.length > 0 && <Polyline coordinates={routeCoords} />}
      </MapView>
      <GooglePlacesAutocomplete
        placeholder="Para onde?"
        onPress={handlePlaceSelect}
        query={{
          key: 'SUA_API_KEY_GOOGLE_PLACES',
          language: 'pt',
        }}
        styles={{
          container: styles.autocompleteContainer,
          listView: styles.listView,
        }}
      />
    </View>
  );
};

export default MapScreen;
*/