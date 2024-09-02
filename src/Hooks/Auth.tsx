import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import api from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bool } from "yup";

interface Usuario {
  // Campos comuns
  cliente_id?:number;
  motorista_id?:number;
  nome?: string;
  cpf?: string;
  email?: string;
  senha?: string;
  telefone?: string;
  dt_nascimento?: string;
  sexo?: string;
  usuario_cliente?: boolean; // True para Cliente, False para Motorista

  // Campos específicos de Motorista
  rg?: string;
  cnh?: string;
  nome_mae?: string;
  foto?: string;
  motorista_latitude?: number;
  motorista_longitude?: number;
  status?: string;
  placa?: string;
}

interface SignInCredentials {
  email: string;
  senha: string;
}

interface AuthContextData {
  usuario: Usuario;
  LoginCliente: (credentials: SignInCredentials) => Promise<void>;
  LoginMotorista: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario>({});

  async function LoginCliente({ email, senha }: SignInCredentials) {
    try {
      const response = await api.post('/login/cliente', {
        email,
        senha,
      });

      if (response.data) {
        const usuario = response.data;
        setUsuario(usuario);

        const usuario_cliente = usuario.usuario_cliente; // Certifique-se de que 'Email' está correto
        await AsyncStorage.setItem('usuario_cliente', String(usuario_cliente))

        const usuarioString = JSON.stringify(usuario);
        await AsyncStorage.setItem('usuarioString', usuarioString);
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      // Talvez lance um erro customizado ou uma mensagem de erro mais amigável aqui
    }
  }
  async function LoginMotorista({ email, senha }: SignInCredentials) {
    try {
      const response = await api.post('/login/motorista', {
        email,
        senha,
      });

      if (response.data) {
        const usuario = response.data;
        setUsuario(usuario);

        const usuario_cliente = usuario.usuario_cliente; // Certifique-se de que 'Email' está correto
        await AsyncStorage.setItem('usuario_cliente', String(usuario_cliente))

        const usuarioString = JSON.stringify(usuario);
        await AsyncStorage.setItem('usuarioString', usuarioString);
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      // Talvez lance um erro customizado ou uma mensagem de erro mais amigável aqui
    }
  }
  async function destroyAllTables() {
    await AsyncStorage.setItem('usuarioString', '');

    setUsuario({} as Usuario);
  }

  async function signOut() {
    try {
      destroyAllTables();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw new Error('Erro ao fazer logout.');
    }
  }
  useEffect(() => {
    let isMounted = true;

    async function loadUserData() {
      const user = await AsyncStorage.getItem('usuarioString');

      if (user) {
        const userJson = JSON.parse(user);

        if (isMounted) {
          setUsuario(userJson as Usuario);
        }
      }
    }
    loadUserData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ usuario: usuario, LoginCliente,LoginMotorista,signOut, }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
