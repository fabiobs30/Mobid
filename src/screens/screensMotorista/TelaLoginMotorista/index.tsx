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
import {InputComponent} from '../../../components/input';
import { useAuth } from '../../../Hooks/Auth';
import { Alert } from 'react-native';
import BackButton from '../../../components/BackButton';

export function TelaLoginMotorista() {
  const {LoginMotorista} = useAuth();
  const [Email, SetEmail] = useState('');
  const [Senha, SetSenha] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigation = useNavigation();
  function navEstabelecerDestino() {
    navigation.navigate('EstabelecerDestino');
  }
  const handlelogin = () => {
    LoginMotorista({
      email:Email,
      senha:Senha
    }).catch(_error => {
      setShowAlert(true);
    });
  };
  if (showAlert === true) {
    Alert.alert(
      'Erro de autenticação',
      'Login ou senha incorretos. Por favor, tente novamente.',
      [
        {text: 'OK', onPress: () => setShowAlert(false)}, // O botão "OK" fecha o alerta
      ],
    );
  }
  return (
    <Container>
      <Header>
      <BackButton/>
        
        <Title>Entrar em minha conta.</Title>
        <Subtitle>Que bom ter você de volta aqui motorista!</Subtitle>
      </Header>
      <ContainerInput>
        <InputComponent
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor={'silver'}
          onChangeText={text => SetEmail(text)}
          value={Email}
          isFocused={true}
        />
      </ContainerInput>
      <ContainerInput>
        <InputComponent
          onChangeText={text => SetSenha(text)}
          value={Senha}
          placeholderTextColor={'silver'}
          placeholder="Senha"
          secureTextEntry={true}
          isFocused={true}
        />
      </ContainerInput>
      <View>
        <Button onPress={handlelogin}>
          <TextButton>Entrar</TextButton>
        </Button>
      </View>
    </Container>
  );
}
