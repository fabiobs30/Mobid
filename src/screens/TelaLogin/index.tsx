import React, { useRef } from "react";

import Input from '../../components/input';
import IconBack from '../../assets/imagens/icon-back.png';
import IconUser from '../../assets/imagens/icon-user.png';
import IconPassword from '../../assets/imagens/icon-password.png';

import { Container, Header, ButtonView, Title, Subtitle, Content, View, Text, Button, TextButton } from './styles'
export function TelaLogin () {
  const passwordRef = useRef<any>();
  return (
    <Container>
        <Header>
            <ButtonView>
                <IconBack fill='' width={24} height={24} />
            </ButtonView>
            <Title>Entrar em minha conta.</Title>
            <Subtitle>Que bom ter você de volta aqui!</Subtitle>
        </Header>

        <Content>
            <Input
                placeholder='Email'
                keyboardType='email-address'
                onChangeText={(text: string) => { }}
                icon={<IconUser fill='${({theme})=> theme.colors.primary};' width={16} height={16} />}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()} />

            <Input
                inputRef={passwordRef}
                placeholder='Senha'
                secureTextEntry
                onChangeText={(text: string) => { }}
                returnKeyType="done"
                onSubmitEditing={() => console.log('Chamando api de login')}
                icon={<IconPassword fill='#17161b;' width={16} height={16} />} />
        </Content>

        <View>
            <Button>
                <TextButton>Entrar</TextButton>
            </Button>
        </View>
    </Container>
  )
}   