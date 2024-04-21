import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.colors.primary};
    
`;
export const Body = styled.View`
  justify-content: center;
  height: ${RFValue(300)}px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(25)}px;
  text-align: center;
  color: ${({theme})=> theme.colors.colorWhite};
`;