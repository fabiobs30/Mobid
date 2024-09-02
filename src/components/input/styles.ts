import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import TextInputMask from 'react-native-text-input-mask';
interface InputProps {
  isFocused: boolean;
  inputId: number;
}
export const Input =styled(TextInputMask)<InputProps>`
  font-size: ${RFValue(20)}px;
  color: black;
  background-color: ${({theme}) => theme.colors.colorWhite};
  border: 2px solid
    ${({theme, isFocused}) => (isFocused ? theme.colors.primary : 'gray')};
  border-radius: 10px;
  width: 100%;
  margin-bottom:10px;
`;