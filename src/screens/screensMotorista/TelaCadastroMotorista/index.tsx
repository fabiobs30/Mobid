import React, {useEffect, useState} from 'react';
import {Container, FotoMotorista, Text, TouchableOpacity} from './styles';
import {InputComponent} from '../../../components/input';
import api from '../../../services/api';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../../../components/BackButton';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  OptionsCommon,
} from 'react-native-image-picker';
import fotoPerfil from '../../../assets/imagens/fotoperfil.png';
import {format} from 'date-fns';
import AWS from 'aws-sdk';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} from '@env';
import InputPicker from '../../../components/inputPicker';
import axios from 'axios';
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});
interface Estados {
  id: string;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}
interface Cidades {
  id: string;
  nome: string;
  microrregiao: {
    id: number;
    nome: string;
  };
}
export default function TelaCadastroMotorista() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cnh, setCnh] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [nome_mae, setNomeMae] = useState('');
  const [rg, setRG] = useState('');
  const [foto, setFoto] = useState(fotoPerfil);
  const [logradouro, setLogradouro] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUF] = useState('');
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [estados, setEstados] = useState<
    {label: string; value: string; id: string}[]
  >([]);
  const [cidades, setCidades] = useState<
    {label: string; value: string; id: string}[]
  >([]);
  const toggleScroll = (enabled: boolean) => {
    setScrollEnabled(enabled);
  };
  const Sexos = [
    {label: 'Masculino', value: 'Masculino'},
    {label: 'Feminino', value: 'Feminino'},
  ];
  const fetchProfileData = async (foto: string) => {
    const cleanedText = dataNascimento.replace(/\D/g, '');
    const dia = cleanedText.substring(0, 2);
    const mes = cleanedText.substring(2, 4);
    const ano = cleanedText.substring(4, 8);
    const novaData = new Date(
      parseInt(ano, 10),
      parseInt(mes, 10) - 1,
      parseInt(dia, 10),
    );

    const dataFormatada = format(novaData, 'yyyy-MM-dd');
    try {
      const response = await api.post('/api/cliente', {
        nome,
        cpf,
        email,
        senha,
        cep,
        logradouro,
        bairro,
        localidade,
        uf,
        telefone,
        dt_nascimento: dataFormatada,
        sexo,
        foto: foto,
      });

      Alert.alert('Sucesso', 'Usuario registrado com sucesso!');

      navTelaLogin();
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o cliente.');
    }
  };
  function navTelaLogin() {
    navigation.navigate('TelaLoginMotorista');
  }
  const fetchEstadosFromAPI = async () => {
    try {
      const response = await axios.get<Estados[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      );

      const estadosFormatted = response.data
        .map(estado => ({
          label: `${estado.nome} - ${estado.sigla}`,
          value: estado.sigla,
          id: estado.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setEstados(estadosFormatted);
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
      Alert.alert(
        'Erro',
        'Não foi possível carregar os estados. Verifique sua conexão.',
      );
    }
  };
  const fetchCidadesFromAPI = async () => {
    try {
      const response = await axios.get<Cidades[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
      );
      const data = response.data;
      const cidadesFormatted = data.map(cidade => ({
        label: cidade.nome,
        value: cidade.id,
        id: cidade.id,
      }));
      //console.log('cidadesFormatted:', cidadesFormatted);
      setCidades(cidadesFormatted);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  };
  const handleValueChangeState = (value: string) => {
    const estadoSelecionada = estados.find(estado => estado.value === value);
    if (estadoSelecionada) {
      setUF(estadoSelecionada.value); // Aqui definimos o valor selecionado
      //console.log('estado selecionado:', estadoSelecionada.label);
      //console.log('id estado:', estadoSelecionada.id);
    }
  };
  const handleValueChangeCity = (value: string) => {
    const cidadeSelecionada = cidades.find(cidade => cidade.value === value);
    if (cidadeSelecionada) {
      setLocalidade(cidadeSelecionada.label); // Aqui definimos o valor selecionado
      //console.log('estado selecionado:', estadoSelecionada.label);
      //console.log('id estado:', estadoSelecionada.id);
    }
  };
  const uploadImagesToS3 = async () => {
    try {
      // Função para ler e preparar o upload de uma imagem para o S3
      const uploadImage = async (uri: string) => {
        const fileData = await RNFS.readFile(uri, 'base64');
        const buffer = Buffer.from(fileData, 'base64');
        const fileName = uri.split('/').pop() || `${Date.now()}.jpg`;

        const s3 = new AWS.S3();
        const params = {
          Bucket: 'mobid',
          Key: fileName,
          Body: buffer,
          ContentType: 'image/jpeg',
        };

        return new Promise((resolve, reject) => {
          s3.upload(params, (err: any, data: any) => {
            if (err) {
              console.log('Erro ao fazer upload da imagem:', err);
              reject(err);
            } else {
              console.log('Upload realizado com sucesso:', data.Location);
              resolve(data.Location);
            }
          });
        });
      };

      // Executando os uploads em paralelo
      const [fotoUsuario] = (await Promise.all([uploadImage(foto)])) as [
        string,
      ];

      // Após ambos os uploads serem concluídos, registrar a guia
      await fetchProfileData(fotoUsuario);
    } catch (error) {
      console.error('Erro ao fazer upload das imagens:', error);
      Alert.alert('Erro', 'Não foi possível fazer upload das imagens.');
    }
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permissão de Câmera',
            message: 'Este aplicativo precisa acessar sua câmera',
            buttonNeutral: 'Perguntar Depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true; // iOS ou outras plataformas que não requerem permissão manual
    }
  };
  const navigation = useNavigation();
  const tirarFoto = async () => {
    Alert.alert('Escolha uma opção', 'De onde você quer selecionar a foto?', [
      {
        text: 'Galeria',
        onPress: () => handlePickImage('galeria'),
      },
      {
        text: 'Câmera',
        onPress: () => handlePickImage('camera'),
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  };
  const handlePickImage = async (source: string) => {
    const options: OptionsCommon = {
      mediaType: 'photo',
      includeBase64: true,
    };

    try {
      if (source === 'camera') {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
          Alert.alert(
            'Permissão Negada',
            'Permissão para acessar a câmera foi negada.',
          );
          return;
        }
      }

      const result =
        source === 'camera'
          ? await launchCamera(options)
          : await launchImageLibrary(options);

      if (result.errorCode || result.errorMessage) {
        console.log(
          'Erro ao capturar a nova foto:',
          result.errorCode,
          result.errorMessage,
        );
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const {uri} = result.assets[0];
        if (uri) {
          setFoto(uri);
        }
      }
    } catch (error) {
      console.log('Erro ao selecionar a imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };
  useEffect(() => {
    if (uf) {
      fetchCidadesFromAPI();
    }
  }, [uf]);
  useEffect(() => {
    fetchEstadosFromAPI();
  }, []);
  return (
    <Container scrollEnabled={scrollEnabled}>
      <BackButton />
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
        onChangeText={text => setRG(text)}
        value={rg}
        placeholderTextColor={'black'}
        placeholder="RG:"
        isFocused={true}
      />
      <InputPicker
        items={Sexos}
        onValueChange={setSexo}
        placeholder={{label: 'Sexo:', value: null}}
        onOpen={() => toggleScroll(false)}
        onClose={() => toggleScroll(true)}
      />
      <InputComponent
        onChangeText={text => setNomeMae(text)}
        value={nome_mae}
        placeholderTextColor={'black'}
        placeholder="Nome da Mãe:"
        isFocused={true}
      />
      <InputPicker
        items={estados}
        placeholder={{label: 'Estado', value: null}}
        onValueChange={handleValueChangeState}
        onOpen={() => toggleScroll(false)}
        onClose={() => toggleScroll(true)}
      />
      <InputPicker
        items={cidades}
        onValueChange={handleValueChangeCity}
        placeholder={{label: 'Cidade:', value: null}}
        onOpen={() => toggleScroll(false)}
        onClose={() => toggleScroll(true)}
        itemKey="id"
        emptyMessage="selecione primeiro um Estado"
      />
      <InputComponent
        onChangeText={text => setLogradouro(text)}
        value={logradouro}
        placeholderTextColor={'black'}
        placeholder="Logradouro:"
        isFocused={true}
      />
      <InputComponent
        onChangeText={text => setCep(text)}
        value={cep}
        placeholderTextColor={'black'}
        placeholder="CEP:"
        isFocused={true}
      />
      <InputComponent
        onChangeText={text => setBairro(text)}
        value={bairro}
        placeholderTextColor={'black'}
        placeholder="Bairro:"
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
        onChangeText={text => setEmail(text)}
        value={email}
        placeholderTextColor={'black'}
        placeholder="Email:"
        isFocused={true}
      />

      <InputComponent
        onChangeText={text => setCnh(text)}
        value={cnh}
        placeholderTextColor={'black'}
        placeholder="CNH:"
        isFocused={true}
      />
      <InputComponent
        onChangeText={(extracted: any) => {
          return setDataNascimento(extracted);
        }}
        mask="[00]/[00]/[0000]"
        placeholderTextColor={'black'}
        placeholder="Data de Nascimento"
        keyboardType="numeric"
        isFocused={true}
      />
      <InputComponent
        onChangeText={text => setSenha(text)}
        value={senha}
        placeholderTextColor={'black'}
        placeholder="Senha:"
        isFocused={true}
        secureTextEntry={true}
      />

      <FotoMotorista source={typeof foto === 'string' ? {uri: foto} : foto} />
      <TouchableOpacity onPress={tirarFoto}>
        <Text>tirar foto</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={uploadImagesToS3}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </Container>
  );
}
