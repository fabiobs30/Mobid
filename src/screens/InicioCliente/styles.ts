import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({theme})=> theme.colors.colorWhite};
`;

export const Text = styled.Text`
  color: ${({theme})=> theme.colors.background};
`;

export const TextInput = styled.TextInput`

`;