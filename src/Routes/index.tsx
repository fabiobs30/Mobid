import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from `@react-navigation/stack`;
import React from "react";
export function Routes(){
  return(
    <NavigationContainer>
      <AppRoutes/>
      <AuthRoutes/>
    </NavigationContainer>
  )
}