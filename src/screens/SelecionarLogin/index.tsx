import React from "react";
import { SelecionarCadastroLogin } from "../../components/SelecionarCadastroLogin";
import { useNavigation } from "@react-navigation/native";


export function SelecionarLogin(){
  const navigation = useNavigation()
  function ClienteCadastro(){
    navigation.navigate('TelaLoginCliente');
  }
  function MotoristaCadastro(){
    navigation.navigate('TelaLoginMotorista');
  }

  return(
    <SelecionarCadastroLogin Cliente={ClienteCadastro} Motorista={MotoristaCadastro}/>
  )
}