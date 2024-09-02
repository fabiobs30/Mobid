import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import {AppTabNavCliente} from './App.Tab.Routes.Cliente';
import { MapaTela } from "../../screens/screensCliente/MapaSolicitacao";
import  MapaMotorista  from "../../screens/screensCliente/MapaMotorista";

const Stack = createStackNavigator();
export function AppRoutes(){
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
      
    </Stack.Navigator>
  )
}