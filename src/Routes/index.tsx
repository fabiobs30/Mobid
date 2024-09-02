import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AuthRoutes } from "./Auth.Routes";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { useAuth } from "../Hooks/Auth";
import { AppRoutes } from "./RoutesCliente/App.Stack.Routes.Cliente";
import { AppRoutesMotorista } from "./RoutesMotorista/App.Stack.Routes.Motorista";
export function Routes(){
  const {usuario} = useAuth();
  return(
    <SafeAreaProvider>
    <NavigationContainer>
    {usuario.usuario_cliente===true?(<AppRoutes />):
    usuario.usuario_cliente===false?(<AppRoutesMotorista/>):
    (<AuthRoutes/>)
    }
      
    </NavigationContainer>
    </SafeAreaProvider>
  )
}