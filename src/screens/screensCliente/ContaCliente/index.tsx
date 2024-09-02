import React from "react";
import { ButtoLogout, ButtoLogoutText, Container } from "./styles";
import { useAuth } from "../../../Hooks/Auth";

export function ContaCliente(){
  const {signOut,usuario} = useAuth();
function HandleLogout() {
  signOut();
}

  return(
    <Container>
      <ButtoLogout onPress={HandleLogout}>
      <ButtoLogoutText>
        Deslogar
      </ButtoLogoutText>

      </ButtoLogout>
    </Container>
  )
}