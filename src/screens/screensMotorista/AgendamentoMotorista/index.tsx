import React from "react";
import { AgendarTitulo, Buttom, ButtonCadastrar, ButtonEntrar, Container, ContainerAgendar} from "./styles";
import { useNavigation } from "@react-navigation/native";

export function AgendamentoMotorista(){
  const navigation = useNavigation();
  function navAgendamento(){ 
    navigation.navigate('AgendarMotorista');
  } 
  function navVerificarAgendamento(){
    navigation.navigate('ConsultarAgendamentoMotorista');
  }

  return(
    <Container>
      <ContainerAgendar>
        <AgendarTitulo>Agendamentos</AgendarTitulo>
        <Buttom onPress={navAgendamento}>
          <ButtonEntrar >Agendar</ButtonEntrar>
          </Buttom>
        <Buttom onPress={navVerificarAgendamento}>
          <ButtonCadastrar>Meus Agendamentos</ButtonCadastrar>
          </Buttom>
      </ContainerAgendar>
    </Container>
  )
}