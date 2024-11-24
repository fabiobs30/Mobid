import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex:1;
  padding: ${RFValue(5)}px ${RFValue(8)}px;
`;
export const ContainerScroll = styled.ScrollView``;
export const TituloInput = styled.Text`
color: ${({theme})=> theme.colors.primary};
font-size: 20px;
padding: 0 0 0 ${RFValue(2)}px ;
`;
export const ContainerListaLocais = styled.View`
background-color: 'rgba(48,48,48,1)';
`
export const TouchableOpacityListaLocais = styled.TouchableOpacity`
border: solid 2px ${({theme})=> theme.colors.primary};

`;
export const TextListaLocaisNome =styled.Text`
color: ${({theme})=> theme.colors.colorWhite};
font-size: 20px;
font-weight: bold;
`;
export const TextListaLocais = styled.Text`
color: ${({theme})=> theme.colors.colorWhite};
font-size: 17px;
`;
export const ContainerButtom= styled.View`
width: 100%;
align-items: center;

`;
export const Buttom = styled.TouchableOpacity`
  background-color: ${({theme})=> theme.colors.primary};
  width: 80%;
  height: ${RFValue(40)}px;
  margin-top: ${RFValue(1)}px;
  justify-content: center;
  border-radius: 15px;
`;
export const ButtonEntrar = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({theme})=> theme.colors.colorWhite};
  text-align: center;
`;
export const ContainerMap = styled.View`
flex: 1;
`;