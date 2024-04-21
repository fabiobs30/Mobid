import React from 'react';
import {Body,CarIcon,Container, ContainerCarIcon, Title} from './styles';
import { Button, GestureResponderEvent, } from 'react-native';
import { Text,  } from "react-native";
import { useNavigation } from '@react-navigation/native';
import CarImage from '../../assets/imagens/sedan.png';

export function TelaInicial() {
  const navigation = useNavigation();
  function navTelaLogin(){ 
    navigation.navigate('TelaLogin')
  } 

  function navTelaCadastro(){
    navigation.navigate('TelaCadastro');
  }

  return (
    <Container>
      <Body>
      <Title>Mobid</Title>
      <ContainerCarIcon>
      <CarIcon source={CarImage}resizeMode="contain"/>
      </ContainerCarIcon>
      <Button title='Entrar' onPress={navTelaLogin}/>

      <Text>Cadastrar-se</Text>
      <Button title='Cadastrar-se' onPress={navTelaCadastro}/>
      </Body>
    </Container>
  ) 
  
}
