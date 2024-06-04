import React from "react";
import { Container, Text, TextInput } from "./styles";



export function InicioCliente() {
  return (
    <Container>
      <Text>Vamos começar!</Text>
      <TextInput 
        placeholderTextColor={'black'}
        value="destino"
        placeholder="Para onde você vai?"
      />
    </Container>
  )
}