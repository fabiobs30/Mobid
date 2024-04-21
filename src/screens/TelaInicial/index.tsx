import React from 'react';
import {Body, Container} from './styles';
import { Button, GestureResponderEvent, } from 'react-native';
import { Text,  } from "react-native";
import { useNavigation } from '@react-navigation/native';

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
      <Text>Entrar</Text>
      <Button title='Entrar' onPress={navTelaLogin}/>

      <Text>Cadastrar-se</Text>
      <Button title='Cadastrar-se' onPress={navTelaCadastro}/>
      </Body>
    </Container>
  ) 
  
}
