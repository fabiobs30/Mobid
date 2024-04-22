import React from 'react';
import {ButtonCadastrar, ButtonEntrar,Buttons,Cadastrar,CarIcon,Container, ContainerCarIcon, Entrar, Subtitle, Title} from './styles';
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
      <Title>Mobid</Title>
      <ContainerCarIcon>
      <CarIcon source={CarImage}resizeMode="contain"/>
      </ContainerCarIcon>
      
      <Subtitle>Tudo ao seu alcance</Subtitle>
      
      <Buttons>
        <Entrar onPress={navTelaLogin}><ButtonEntrar >Entrar</ButtonEntrar></Entrar>
        <Cadastrar onPress={navTelaLogin}><ButtonCadastrar>Cadastrar-se</ButtonCadastrar></Cadastrar>
      </Buttons>
    </Container>
  ) 
}
