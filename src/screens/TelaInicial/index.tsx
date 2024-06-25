import React from 'react';
import {Body, Buttom, ButtonCadastrar, ButtonEntrar, Buttons, CarIcon,Container, ContainerCarIcon, Subtitle, Title} from './styles';
import { useNavigation } from '@react-navigation/native';


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
      <Body>
        <Title>Mobid</Title>
        <ContainerCarIcon>
        
        </ContainerCarIcon>
        
        <Subtitle>Tudo ao seu alcance</Subtitle>
      </Body>  
      <Buttons>
        <Buttom onPress={navTelaLogin}><ButtonEntrar >Entrar</ButtonEntrar></Buttom>
        <Buttom onPress={navSelecionarCadastro}><ButtonCadastrar>Cadastrar-se</ButtonCadastrar></Buttom>
      </Buttons>
    </Container>
  ) 
}
