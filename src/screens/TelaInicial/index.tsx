import React from 'react';
import {Buttom, ButtonCadastrar, ButtonEntrar, Buttons, CarIcon,Container, ContainerCarIcon, Subtitle, Title} from './styles';
import { useNavigation } from '@react-navigation/native';
import CarImage from '../../assets/imagens/sedan.png';

export function TelaInicial() {
  const navigation = useNavigation();
  function navTelaLogin(){ 
    navigation.navigate('TelaLogin');
  } 

  function navSelecionarCadastro(){
    navigation.navigate('SelecionarCadastro');
  }

  return (
    <Container>
      <Title>Mobid</Title>
      <ContainerCarIcon>
      <CarIcon source={CarImage}resizeMode="contain"/>
      </ContainerCarIcon>
      
      <Subtitle>Tudo ao seu alcance</Subtitle>
      
      <Buttons>
      <Buttom onPress={navTelaLogin}><ButtonEntrar >Entrar</ButtonEntrar></Buttom>
        <Buttom onPress={navSelecionarCadastro}><ButtonCadastrar>Cadastrar-se</ButtonCadastrar></Buttom>
      </Buttons>
    </Container>
  ) 
}
