import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme})=> theme.colors.primary};
`;
export const Content = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-around;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: ${RFValue(25)}px;
  color: ${({theme})=> theme.colors.backgroundColor};
`;

export const TouchableOpacity = styled.TouchableOpacity`

`;