import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import {AppTabNav} from './App.Tab.Routes';
import { EstabelecerDestino } from "../screens/EstabelecerDestino";
import { MapaTela } from "../screens/MapaSolicitacao";
import  MapaMotorista  from "../screens/MapaMotorista";

const Stack = createStackNavigator();
export function AppRoutes(){
  return(
    <Stack.Navigator initialRouteName="AppTabNav">
      <Stack.Screen
        name="AppTabNav"
        component={AppTabNav}
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