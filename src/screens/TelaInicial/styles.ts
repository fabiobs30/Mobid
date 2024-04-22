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
export const Entrar = styled.TouchableOpacity`
  background-color: ${({theme})=> theme.colors.colorWhite};
`;
export const ButtonEntrar = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({theme})=> theme.colors.primary};;
  text-align: center;
`;
export const Cadastrar = styled.TouchableOpacity`
  background-color: ${({theme})=> theme.colors.colorWhite};
  border-radius: 1, 5;
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
  padding: 10;
  flex-direction: column;
  border-radius: 14px;
  position: absolute;
  top: 0;
`;
