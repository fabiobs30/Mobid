import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(80)}px;
  flex: 1;
  padding: ${RFValue(20)}px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({theme})=> theme.colors.colorWhite};
`;


export const Header = styled.View`
  margin-top: ${getStatusBarHeight(true)}px;
  width: 100%;
`;

export const ButtonView = styled.TouchableOpacity`

`;

export const Title = styled.Text`
  margin-top: ${RFValue(20)}px;
  margin-bottom: ${RFValue(5)}px;
  font-size: ${RFValue(28)}px;
  font-weight: bold;
  color: black;
`;

export const Subtitle = styled.Text`
  margin-top: ${RFValue(10)}px;
  margin-bottom: ${RFValue(100)}px;
  font-size: ${RFValue(27)}px;
  font-weight: 200;
  color: black;

`;

export const ContainerInput = styled.View`
width: 100%;
margin-top: ${RFValue(10)}px;
`;

export const Content = styled.View`
  width: 100%;
  align-items: last baseline;
  border-color: ${({theme})=> theme.colors.colorBlack};
  border-radius: 20px;
  border-width: ${RFValue(2)}px;
  justify-content: space-between;
  margin-top: ${RFValue(20)}px;
`;

export const View = styled.View`
  width: 100%;
  margin-bottom: ${RFValue(20)}px;
  flex-direction: column;
  align-items: flex-start;
`

export const Text = styled.Text`
  color: ${({theme})=> theme.colors.colorBlack};
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(55)}px;
  margin-top: ${RFValue(100)}px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme})=> theme.colors.primary};

`;

export const TextButton = styled.Text`
  justify-content: center;
  align-items: center;
  font-size: ${RFValue(23)}px;
  color:white;
`;