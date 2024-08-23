import React, {useState} from 'react';
import {Container,Text,TouchableOpacity} from './styles';
import {InputComponent} from '../../components/input';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';


export default function TelaCadastroMotorista() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [senha, setSenha] = useState('');
  const [dt_nascimento, setDt_nascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [nome_mae, setNomeMae] = useState('');
  const [rg, setRG] = useState('');
  const [foto, setFoto] = useState('');
  const fetchProfileData = async () => {
    try {
      const response = await api.post("/api/motorista",{nome,cpf,nome_mae,rg,senha,endereco,telefone,dt_nascimento,sexo,foto})

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
        placeholderTextColor={'black'}
        placeholder="Nome:"
      />
      <InputComponent
        onChangeText={text => setCpf(text)}
        value={cpf}
        placeholderTextColor={'black'}
        placeholder="CPF:"
      />
      <InputComponent
        onChangeText={text => setRG(text)}
        value={rg}
        placeholderTextColor={'black'}
        placeholder="RG:"
      />
      <InputComponent
        onChangeText={text => setSexo(text)}
        value={sexo}
        placeholderTextColor={'black'}
        placeholder="Sexo:"
      />
      <InputComponent
        onChangeText={text => setNomeMae(text)}
        value={nome_mae}
        placeholderTextColor={'black'}
        placeholder="Nome da Mãe:"
      />
      <InputComponent
        onChangeText={text => setEndereco(text)}
        value={endereco}
        placeholderTextColor={'black'}
        placeholder="Endereço:"
      />
      <InputComponent
        onChangeText={text => setTelefone(text)}
        value={telefone}
        placeholderTextColor={'black'}
        placeholder="Telefone:"
      />
      <InputComponent
        onChangeText={text => setDt_nascimento(text)}
        value={dt_nascimento}
        placeholderTextColor={'black'}
        placeholder="Data de Nascimento:"
      />
      <InputComponent
        onChangeText={text => setSenha(text)}
        value={senha}
        placeholderTextColor={'black'}
        placeholder="Senha:"
      />
      <InputComponent
      onChangeText={text => setFoto(text)}
      value={foto}
      placeholderTextColor={'black'}
      placeholder="Foto:"
      />
      
        <TouchableOpacity onPress={fetchProfileData}>
          <Text onPress={navTelaLogin}>
            Cadastrar
          </Text>
        </TouchableOpacity>

    </Container>
  );
}
