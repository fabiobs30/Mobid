import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.colors.primary};
    justify-content: center;  
`;
export const Body = styled.View`
  justify-content: center;
  width: 100%;
`;
export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  text-align: center;
  color: ${({theme})=> theme.colors.colorWhite};
`;
export const ContainerCarIcon= styled.View`
 align-items: center;
 justify-content: center;
padding:  ${RFValue(25)}px 0;
`;
export const CarIcon = styled.Image`
height: ${RFValue(120)}px;
`;
export const Subtitle = styled.Text`
  font-size: ${RFValue(20)}px;
  text-align: center;
  color: ${({theme})=> theme.colors.colorWhite};
`;

export const ButtonEntrar = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({theme})=> theme.colors.primary};
  text-align: center;
`;
export const Buttom = styled.TouchableOpacity`
  background-color: ${({theme})=> theme.colors.colorWhite};
  width: 80%;
  height: ${RFValue(40)}px;
  margin-top: ${RFValue(10)}px;
  justify-content: center;
  border-radius: 15px;
`;
export const ButtonCadastrar = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({theme})=> theme.colors.primary};
  text-align: center;
`;
export const Buttons = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  border-radius: 14px;
  top: 0;
`;