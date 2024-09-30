import React from "react";
import { Container, PictureContainer, ProfilePicture, Text, TextInput } from "./styles";
import { useAuth } from "../../../Hooks/Auth";
import fotoPerfil from '../../../assets/imagens/fotoperfil.png';


export function InicioCliente() {
  const{usuario}= useAuth()
  console.log(usuario.usuario_cliente)
  return (
    <Container>
      <Text>Olá, {usuario.nome}!</Text>
      

      <PictureContainer>
          {usuario.foto? (
            <ProfilePicture
              source={{uri: usuario.foto}}
              resizeMode="cover"
            />
          ) : (
            <ProfilePicture source={fotoPerfil} resizeMode="cover" />
          )}
        </PictureContainer>
    </Container>
  )
}