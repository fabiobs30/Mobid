import React from 'react';
import {Container,Content,Text,TouchableOpacity} from './styles';
import MaterialCommunituIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import BackButton from '../BackButton';
interface button{
  Cliente:()=>void;
  Motorista:()=>void;


}
export function SelecionarCadastroLogin({Cliente,Motorista}:button){
  

  return (
    <Container>
      <BackButton/>
    <Content>
      <TouchableOpacity onPress={Cliente}>
        <MaterialCommunituIcons name="seat-passenger" size={100} color="black" />
        <Text>Cliente</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Motorista}>
        <Ionicons name="drivers-license-o" size={100} color="black" />
        <Text>Motorista</Text>
      </TouchableOpacity>
      </Content>
    </Container>
  );
};
