import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AuthRoutes } from "./Auth.Routes";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { useAuth } from "../Hooks/Auth";
import { AppRoutes } from "./App.Stack.Routes";
export function Routes(){
  const {cliente} = useAuth();
  return(
    <SafeAreaProvider>
    <NavigationContainer>
    
        {cliente.email ? <AppRoutes /> : <AuthRoutes />}
      
    </NavigationContainer>
    </SafeAreaProvider>
  )
}