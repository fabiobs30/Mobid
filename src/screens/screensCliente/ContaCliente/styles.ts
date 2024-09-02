import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
flex: 1;
justify-content: flex-end;

`;
export const ButtoLogout = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(55)}px;
  margin-top: ${RFValue(100)}px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme})=> theme.colors.primary};

`;
export const ButtoLogoutText = styled.Text`
color: ${({theme})=> theme.colors.backgroundColor};
`;
