import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;
export const ContainerAgendar= styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: ${RFValue(10)}px 0;

`
export const AgendarTitulo = styled.Text`
font-size:25px ;
color: ${({theme})=> theme.colors.primary};
font-weight: bold;
text-align: center;
`
export const ButtonEntrar = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({theme})=> theme.colors.colorWhite};
  text-align: center;
`;
export const Buttom = styled.TouchableOpacity`
  background-color: ${({theme})=> theme.colors.primary};
  width: 80%;
  height: ${RFValue(40)}px;
  margin-top: ${RFValue(10)}px;
  justify-content: center;
  border-radius: 15px;

`;
export const ButtonCadastrar = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({theme})=> theme.colors.colorWhite};
  text-align: center;
`;