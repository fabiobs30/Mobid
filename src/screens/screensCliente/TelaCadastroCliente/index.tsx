import React, {useState} from 'react';
import {Container,Text,TouchableOpacity} from './styles';
import {InputComponent} from '../../../components/input';
import api from '../../../services/api';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../../components/BackButton';
import {format} from 'date-fns';

export default function TelaCadastroCliente() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [senha, setSenha] = useState('');
  const [dt_nascimento, setDt_nascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const cleanedText = dt_nascimento.replace(/\D/g, '');
  const dia = cleanedText.substring(0, 2);
  const mes = cleanedText.substring(2, 4);
  const ano = cleanedText.substring(4, 8);

 
  const fetchProfileData = async () => {
    const novaData = new Date(
      parseInt(ano, 10),
      parseInt(mes, 10) - 1,
      parseInt(dia, 10),
    );
  
    const dataFormatada = format(novaData, 'yyyy-MM-dd');
    try {
      const response = await api.post("/api/clientes",{
        nome:nome,
        cpf:cpf,
        email:email,
        senha:senha,
        endereco:endereco,
        telefone:telefone,
        dt_nascimento:dataFormatada,
        sexo:sexo})

      console.log('tudo certo')
    } catch (error) {
      console.error('Erro ao obter dados do perfil:', error);
    } finally {
      console.log('finalizar')
    }
  };

  const navigation = useNavigation();
  function navTelaLogin(){ 
    navigation.navigate('SelecionarLogin');
  };
 
  return (
    <Container>
      <BackButton/>
      <InputComponent
        onChangeText={text => setNome(text)}
        value={nome}
        placeholderTextColor={'black'}
        placeholder="Nome:"
        isFocused={true}
      />
      <InputComponent
        onChangeText={text => setCpf(text)}
        value={cpf}
        placeholderTextColor={'black'}
        placeholder="CPF:"
        isFocused={true}
      />
      <InputComponent
        onChangeText={text => setSexo(text)}
        value={sexo}
        placeholderTextColor={'black'}
        placeholder="Sexo:"
        isFocused={true}
      />
      <InputComponent
        onChangeText={text => setEmail(text)}
        value={email}
        placeholderTextColor={'black'}
        placeholder="Email:"
        isFocused={true}
      />
      <InputComponent
        onChangeText={text => setEndereco(text)}
        value={endereco}
        placeholderTextColor={'black'}
        placeholder="Endereço:"
        isFocused={true}
      />
      <InputComponent
        onChangeText={text => setTelefone(text)}
        value={telefone}
        placeholderTextColor={'black'}
        placeholder="Telefone:"
        isFocused={true}
      />
      <InputComponent
            onChangeText={(formatted, extracted: any) => {
              return setDt_nascimento(extracted);
            }}
            mask="[00]/[00]/[0000]"
            placeholderTextColor={'silver'}
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            keyboardType="numeric"
            isFocused={true}
          />
      <InputComponent
        onChangeText={text => setSenha(text)}
        value={senha}
        placeholderTextColor={'black'}
        placeholder="Senha:"
        isFocused={true}
      />
      <TouchableOpacity onPress={fetchProfileData} >
        <Text onPress={navTelaLogin}>
          Cadastrar
        </Text>
      </TouchableOpacity>
    </Container>
  );
}
