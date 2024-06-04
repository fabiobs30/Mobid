import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import { TelaInicial } from "../screens/TelaInicial";
import { TelaLogin } from "../screens/TelaLogin";
import TelaCadastro from "../screens/TelaCadastroCliente";
import TelaCadastroMotorista from "../screens/TelaCadastroMotorista";
import { SelecionarCadastro } from "../screens/SelecionarCadastro";
import TelaCadastroCliente from "../screens/TelaCadastroCliente";
import { InicioCliente } from "../screens/InicioCliente";

const {Navigator,Screen} = createStackNavigator();

export function AuthRoutes(){
  return(
    <Navigator>
      <Screen name="TelaInicial" component={TelaInicial} options={{headerShown:false}}/>
      <Screen name="TelaCadastro" component={TelaCadastro} options={{headerShown:false}}/>
      <Screen name="TelaLogin" component={TelaLogin} options={{headerShown:false}}/>
      <Screen name="InicioCliente" component={InicioCliente} options={{headerShown:false}}/>
      <Screen name="TelaCadastroCliente" component={TelaCadastroCliente} options={{headerShown:false}}/>
      <Screen name="TelaCadastroMotorista" component={TelaCadastroMotorista} options={{headerShown:false}}/>
      <Screen name="SelecionarCadastro" component={SelecionarCadastro} options={{headerShown:false}}/>
    </Navigator>
  )
}

