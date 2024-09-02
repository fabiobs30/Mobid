import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import { TelaInicial } from "../screens/TelaInicial";
import TelaCadastro from "../screens/screensCliente/TelaCadastroCliente";
import TelaCadastroMotorista from "../screens/screensMotorista/TelaCadastroMotorista";
import { SelecionarCadastro } from "../screens/SelecionarCadastro";
import TelaCadastroCliente from "../screens/screensCliente/TelaCadastroCliente";
import { InicioCliente } from "../screens/screensCliente/InicioCliente";
import { TelaLoginCliente } from "../screens/screensCliente/TelaLoginCliente";
import { TelaLoginMotorista } from "../screens/screensMotorista/TelaLoginMotorista";
import { SelecionarLogin } from "../screens/SelecionarLogin";

const {Navigator,Screen} = createStackNavigator();

export function AuthRoutes(){
  return(
    <Navigator>
      <Screen name="TelaInicial" component={TelaInicial} options={{headerShown:false}}/>
      <Screen name="TelaLoginCliente" component={TelaLoginCliente} options={{headerShown:false}}/>
      <Screen name="TelaLoginMotorista" component={TelaLoginMotorista} options={{headerShown:false}}/>
      <Screen name="TelaCadastro" component={TelaCadastro} options={{headerShown:false}}/>
      <Screen name="InicioCliente" component={InicioCliente} options={{headerShown:false}}/>
      <Screen name="TelaCadastroCliente" component={TelaCadastroCliente} options={{headerShown:false}}/>
      <Screen name="TelaCadastroMotorista" component={TelaCadastroMotorista} options={{headerShown:false}}/>
      <Screen name="SelecionarCadastro" component={SelecionarCadastro} options={{headerShown:false}}/>
      <Screen name="SelecionarLogin" component={SelecionarLogin} options={{headerShown:false}}/>
    </Navigator>
  )
}

