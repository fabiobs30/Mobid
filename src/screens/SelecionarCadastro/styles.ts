import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    flex-direction: row;
    background-color: ${({theme})=> theme.colors.primary};
    justify-content: space-around;
    align-items: center;
`;

export const Text = styled.Text`
  font-size: ${RFValue(25)}px;
  color: ${({theme})=> theme.colors.backgroundColor};
`;

export const TouchableOpacity = styled.TouchableOpacity`

`;