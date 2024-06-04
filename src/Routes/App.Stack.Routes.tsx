import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import {AppTabNav} from './App.Tab.Routes';

const Stack = createStackNavigator();
export function AppRoutes(){
  return(
    <Stack.Navigator initialRouteName="AppTabNav">
      <Stack.Screen
        name="AppTabNav"
        component={AppTabNav}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}