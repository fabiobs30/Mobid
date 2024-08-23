import 'react-native-gesture-handler';
import React from "react";
import { ThemeProvider } from 'styled-components';
import { Routes } from './src/Routes';
import theme from './src/global/styles/theme';
import { AppProvider } from './src/Hooks';
export default function myApp(){
  return(
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  )
}