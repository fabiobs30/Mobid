import React, {useState} from 'react';
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
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '@env';
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});
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
  const fetchProfileData = async () => {
    // Formatar a data de nascimento
    const cleanedText = dataNascimento.replace(/\D/g, '');
    const dia = cleanedText.substring(0, 2);
    const mes = cleanedText.substring(2, 4);
    const ano = cleanedText.substring(4, 8);
    const novaData = new Date(
      parseInt(ano, 10),
      parseInt(mes, 10) - 1,
      parseInt(dia, 10)
    );
    const dataFormatada = format(novaData, 'yyyy-MM-dd');
  
    try {
      const response = await api.post('/api/motorista', {
        nome,
        cpf,
        email,
        senha,
        rg,
        cnh,
        dt_nascimento: dataFormatada,
        sexo,
        nome_mae,
        telefone,
        foto,
        logradouro,
        cep,
        bairro,
        localidade,
        uf
      });
     
      console.log(response.data);
      
      navigation.navigate('TelaLoginMotorista');
    } catch (error) {
      console.error('Erro ao cadastrar motorista:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o motorista.');
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
        return true;
      }

      if (result.assets && result.assets.length > 0) {
        const {uri, fileName} = result.assets[0];

        if (uri) {
          // Criar um nome de arquivo único para evitar conflitos
          const uniqueFileName = `${Date.now()}_${fileName}`;

          // Ler o arquivo usando react-native-fs
          const fileData = await RNFS.readFile(uri, 'base64');
          const buffer = Buffer.from(fileData, 'base64'); // Usando a biblioteca `buffer`

          // Configurar os parâmetros de upload
          const s3 = new AWS.S3();
          const params = {
            Bucket: 'mobid',
            Key: uniqueFileName,
            Body: buffer,
            ContentType: result.assets[0].type, // Define o tipo de conteúdo corretamente
          };

          // Enviar a imagem para o S3
          s3.upload(params, (err: any, data: any) => {
            if (err) {
              console.log('Erro ao fazer upload da imagem:', err);
              Alert.alert('Erro', 'Não foi possível fazer upload da imagem.');
              return;
            }
            console.log('Upload realizado com sucesso:', data.Location);

            // Salvar a URL da imagem no estado
            setFoto(data.Location);
          });
        }
      }
    } catch (error) {
      console.log('Erro ao selecionar a imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  return (
    <Container>
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
      <InputComponent
        onChangeText={text => setSexo(text)}
        value={sexo}
        placeholderTextColor={'black'}
        placeholder="Sexo:"
        isFocused={true}
      />
      <InputComponent
        onChangeText={text => setNomeMae(text)}
        value={nome_mae}
        placeholderTextColor={'black'}
        placeholder="Nome da Mãe:"
        isFocused={true}
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
        onChangeText={text => setLocalidade(text)}
        value={localidade}
        placeholderTextColor={'black'}
        placeholder="Endereço:"
        isFocused={true}
      />
      <InputComponent
        onChangeText={text => setUF(text)}
        value={uf}
        placeholderTextColor={'black'}
        placeholder="UF:"
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

      <FotoMotorista source={typeof foto === 'string' ? {uri: foto} : foto} />
      <TouchableOpacity onPress={tirarFoto}>
        <Text>tirar foto</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={fetchProfileData}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </Container>
  );
}
