import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({theme})=> theme.colors.colorWhite};
`;

export const Text = styled.Text`
  color: ${({theme})=> theme.colors.backgroundColor};
`;

export const TextInput = styled.TextInput`

`;
export const PictureContainer = styled.View`
  gap: ${RFValue(5)}px;
  align-items: center;
  justify-content: center;
  padding: ${RFValue(10)}px 0;
`;

export const ProfilePicture = styled.Image`
  border-radius: 100px;
  height: ${RFValue(100)}px;
  width: ${RFValue(80)}px;
`;