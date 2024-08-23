import React, { createContext, useState, useContext, ReactNode } from "react";
import api from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Cliente {
  cliente_id?: number;
  nome?: string;
  cpf?: string;
  email?: string;
  senha?: string;
  telefone?: string;
  dt_nascimento?: string;
  sexo?: string;
  placa?:string
}

interface SignInCredentials {
  email: string;
  senha: string;
}

interface AuthContextData {
  cliente: Cliente;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<Cliente>({});

  async function signIn({ email, senha }: SignInCredentials) {
    try {
      const response = await api.post('/login/', {
        email,
        senha,
      });

      if (response.data) {
        const cliente = response.data;
        setData(cliente);

        const clienteEmail = cliente.email; // Certifique-se de que 'Email' está correto
        await AsyncStorage.setItem('clienteEmail', clienteEmail || '');

        const clienteString = JSON.stringify(cliente);
        await AsyncStorage.setItem('clienteString', clienteString);
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      // Talvez lance um erro customizado ou uma mensagem de erro mais amigável aqui
    }
  }

  return (
    <AuthContext.Provider value={{ cliente: data, signIn }}>
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
