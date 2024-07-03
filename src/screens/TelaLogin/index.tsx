import React, {useState} from 'react';
import {
  Container,
  Header,
  ButtonView,
  Title,
  Subtitle,
  View,
  Button,
  TextButton,
  ContainerInput,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import {InputComponent} from '../../components/input';

export function TelaLogin() {
  const [Email, SetEmail] = useState('');
  const [Senha, SetSenha] = useState('');
  const navigation = useNavigation();
  function navEstabelecerDestino() {
    navigation.navigate('EstabelecerDestino');
  }
  return (
    <Container>
      <Header>
        <ButtonView></ButtonView>
        <Title>Entrar em minha conta.</Title>
        <Subtitle>Que bom ter você de volta aqui!</Subtitle>
      </Header>
      <ContainerInput>
        <InputComponent
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={text => SetEmail(text)}
          value={Email}
        />
      </ContainerInput>
      <ContainerInput>
        <InputComponent
          onChangeText={text => SetSenha(text)}
          value={Senha}
          placeholderTextColor={'silver'}
          placeholder="Senha"
          secureTextEntry={true}
        />
      </ContainerInput>
      <View>
        <Button>
          <TextButton onPress={navEstabelecerDestino}>Entrar</TextButton>
        </Button>
      </View>
    </Container>
  );
}
