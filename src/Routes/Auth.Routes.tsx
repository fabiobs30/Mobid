import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import { TelaInicial } from "../screens/TelaInicial";
import { TelaLogin } from "../screens/TelaLogin";
import TelaCadastro from "../screens/TelaCadastro";

const {Navigator,Screen} = createStackNavigator();

export function AuthRoutes(){
  return(
    <Navigator>
      <Screen name="TelaInicial" component={TelaInicial}/>
      <Screen name="TelaCadastro" component={TelaCadastro}/>
      <Screen name="TelaLogin" component={TelaLogin}/>
    </Navigator>
  )
}

