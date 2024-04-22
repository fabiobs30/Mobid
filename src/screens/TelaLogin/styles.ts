import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const Container = styled.View`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme})=> theme.colors.colorWhite};
`

export const Header = styled.View`
  margin-top: ${getStatusBarHeight(true)}px;
  width: 100%;
`

export const ButtonView = styled.TouchableOpacity`

`

export const Title = styled.Text`
  margin-top: 20px;
  font-size: 32px;
  font-weight: bold;
  color: #17161b;
`

export const Subtitle = styled.Text`
  margin-top: 10px;
  font-size: 38px;
  font-weight: 200;
  color: #17161b;

`

export const Content = styled.View`
  width: 100%;
  margin-bottom: 20px;
  align-items: center;
`

export const View = styled.View`
  width: 100%;
  margin-bottom: 20px;
  flex-direction: column;
  align-items: flex-start;
`

export const Text = styled.Text`
  color: #17161b;
`

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 55px;
  margin-top: 20px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme})=> theme.colors.primary};
`

export const TextButton = styled.Text`
  justify-content: center;
  align-items: center;
`;