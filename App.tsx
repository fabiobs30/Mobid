import 'react-native-gesture-handler';
import React from "react";
import { ThemeProvider } from 'styled-components';
export default function myApp(){
  return(
    <ThemeProvider theme={theme}>
      <Routes/>
    </ThemeProvider>
  )
}