import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import {AppTabNavCliente} from '../App.Tab.Routes';
import { MapaTela } from "../../screens/screensCliente/MapaSolicitacao";
import  MapaMotorista  from "../../screens/screensCliente/MapaMotorista";
import AgendarMotorista from "../../screens/screensMotorista/Agendar";
import { ConsultarAgendamentoMotorista } from "../../screens/screensMotorista/ConsultarAgendamento";

const Stack = createStackNavigator();
export function AppRoutesMotorista(){
  return(
    <Stack.Navigator initialRouteName="AppTabNav">
      <Stack.Screen
        name="AppTabNav"
        component={AppTabNavCliente}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="MapaTela"
        component={MapaTela}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MapaMotorista"
        component={MapaMotorista}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AgendarMotorista"
        component={AgendarMotorista}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="ConsultarAgendamentoMotorista"
        component={ConsultarAgendamentoMotorista}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}