import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.colors.colorWhite};
    padding: ${RFValue(22)}px;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-top: ${RFValue(10)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  text-align: center;
  color: ${({theme})=> theme.colors.colorWhite};
`;

export const TouchableOpacity = styled.TouchableOpacity`
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme})=> theme.colors.primary};
  margin-bottom:  ${RFValue(60)}px;
  width: 90%;
  height: ${RFValue(40)}px;
  margin-top: ${RFValue(10)}px;
`;

export const Text = styled.Text`
  color: #ffffff;
  font-size: 20px;
`;
