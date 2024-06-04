import React, {useState} from 'react';
import {Container,Text,TouchableOpacity} from './styles';
import {InputComponent} from '../../components/input';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';


export default function TelaCadastroCliente() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [senha, setSenha] = useState('');
  const [dt_nascimento, setDt_nascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const fetchProfileData = async () => {
    try {
      const response = await api.post("/api/clientes",{nome,cpf,email,senha,endereco,telefone,dt_nascimento,sexo})

      console.log('tudo certo')
    } catch (error) {
      console.error('Erro ao obter dados do perfil:', error);
    } finally {
      console.log('finalizar')
    }
  };

  const navigation = useNavigation();
  function navTelaLogin(){ 
    navigation.navigate('TelaLogin');
  };

  return (
    <Container>
      <InputComponent
        onChangeText={text => setNome(text)}
        value={nome}
        placeholderTextColor={'white'}
        placeholder="Nome:"
      />
      <InputComponent
        onChangeText={text => setCpf(text)}
        value={cpf}
        placeholderTextColor={'white'}
        placeholder="CPF:"
      />
      <InputComponent
        onChangeText={text => setSexo(text)}
        value={sexo}
        placeholderTextColor={'white'}
        placeholder="Sexo:"
      />
      <InputComponent
        onChangeText={text => setEmail(text)}
        value={email}
        placeholderTextColor={'white'}
        placeholder="Email:"
      />
      <InputComponent
        onChangeText={text => setEndereco(text)}
        value={endereco}
        placeholderTextColor={'white'}
        placeholder="Endereço:"
      />
      <InputComponent
        onChangeText={text => setTelefone(text)}
        value={telefone}
        placeholderTextColor={'white'}
        placeholder="Telefone:"
      />
      <InputComponent
        onChangeText={text => setDt_nascimento(text)}
        value={dt_nascimento}
        placeholderTextColor={'white'}
        placeholder="Data de Nascimento:"
      />
      <InputComponent
        onChangeText={text => setSenha(text)}
        value={senha}
        placeholderTextColor={'white'}
        placeholder="Senha:"
      />
      <TouchableOpacity onPress={fetchProfileData} >
        <Text onPress={navTelaLogin}>
          Cadastrar
        </Text>
      </TouchableOpacity>
    </Container>
  );
}
