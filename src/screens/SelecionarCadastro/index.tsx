import React from 'react';
import {Container,Text,TouchableOpacity} from './styles';
import MaterialCommunituIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/FontAwesome';

export function SelecionarCadastro(){
  const navigation = useNavigation();
  function navTelaCadastroCliente(){ 
    navigation.navigate('TelaCadastroCliente');
  } 

  function navTelaCadastroMotorista(){
    navigation.navigate('TelaCadastroMotorista');
  }
  return (
    <Container>
      <TouchableOpacity onPress={navTelaCadastroCliente}>
        <MaterialCommunituIcons name="seat-passenger" size={100} color="black" />
        <Text>Cliente</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navTelaCadastroMotorista}>
        <Ionicons name="drivers-license-o" size={100} color="black" />
        <Text>Motorista</Text>
      </TouchableOpacity>
    </Container>
  );
};
