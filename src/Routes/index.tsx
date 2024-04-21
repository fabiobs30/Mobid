import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AuthRoutes } from "./Auth.Routes";

export function Routes(){
  return(
    <NavigationContainer>
      <AuthRoutes/>
    </NavigationContainer>
  )
}