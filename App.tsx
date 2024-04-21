import 'react-native-gesture-handler';
import React from "react";
import { ThemeProvider } from 'styled-components';
import { Routes } from './src/Routes';
import theme from './src/global/styles/theme';
export default function myApp(){
  return(
    <ThemeProvider theme={theme}>
      <Routes/>
    </ThemeProvider>
  )
}