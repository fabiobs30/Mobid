import React from "react";
import { Container, Text, TextInput } from "./styles";
import { useAuth } from "../../../Hooks/Auth";



export function InicioCliente() {
  const{usuario}= useAuth()
  return (
    <Container>
      <Text>ola {usuario.nome}</Text>
    </Container>
  )
}