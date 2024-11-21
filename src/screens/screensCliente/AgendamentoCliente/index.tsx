import React from "react";
import { AgendarTitulo, Buttom, ButtonCadastrar, ButtonEntrar, Container, ContainerAgendar} from "./styles";
import { useNavigation } from "@react-navigation/native";

export function AgendamentoCliente(){
  const navigation = useNavigation();
  function navAgendamento(){ 
    navigation.navigate('Agendar');
    console.log("fui")
  } 

  function navVerificarAgendamento(){
    navigation.navigate('SelecionarCadastro');
  }

  return(
    <Container>
      <ContainerAgendar>
        <AgendarTitulo>Agendamentos</AgendarTitulo>
        <Buttom onPress={navAgendamento}><ButtonEntrar >Agendar</ButtonEntrar></Buttom>
        <Buttom onPress={navVerificarAgendamento}><ButtonCadastrar>Consultar Agendamento</ButtonCadastrar></Buttom>
      </ContainerAgendar>
    </Container>
  )
}