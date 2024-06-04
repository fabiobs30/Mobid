import React, {  useState } from "react";
import { Container, Header, ButtonView, Title, Subtitle, Content, View, Button, TextButton, Input, ContentPrimeiro } from './styles'
import { useNavigation } from "@react-navigation/native";

export function TelaLogin () {
  const [Email, SetEmail] = useState("")
  const [Senha, SetSenha] = useState("")
  const navigation = useNavigation();
  function navInicioCliente(){ 
    navigation.navigate('InicioCliente');
  };
  return (
    <Container>
        <Header>
            <ButtonView>
            </ButtonView>
            <Title>Entrar em minha conta.</Title>
            <Subtitle>Que bom ter você de volta aqui!</Subtitle>
        </Header>
        <ContentPrimeiro>
          <Input placeholder='Email'
            keyboardType='email-address'
            onChangeText={SetEmail} 
            value={Email}
            returnKeyType="next"/>
        </ContentPrimeiro>
        
        <Content>

          <Input placeholder='Senha'
            keyboardType='senha-address'
            onChangeText={SetSenha} 
            value={Senha}
            returnKeyType="next"/>
        </Content>

        <View>
            <Button>
                <TextButton onPress={navInicioCliente}>Entrar</TextButton>
            </Button>
        </View>
    </Container>
  )
}