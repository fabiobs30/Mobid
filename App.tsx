import 'react-native-gesture-handler';
import React from "react";
import { ThemeProvider } from 'styled-components';
import { Routes } from './src/Routes';
import theme from './src/global/styles/theme';
import { AppProvider } from './src/Hooks';
import theme_dark from './src/global/styles/theme_dark';
import { useColorScheme } from 'react-native';
export default function myApp(){
  const colorScheme = useColorScheme();
  const appTheme: any = colorScheme === 'dark' ? theme_dark : theme;
  return(
    <ThemeProvider theme={appTheme}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  )
}