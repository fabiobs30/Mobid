import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import TextInputMask from 'react-native-text-input-mask';

export const Input = styled(TextInputMask)`
  font-size: ${RFValue(20)}px;
  color: black;
  background-color: ${({theme}) => theme.colors.colorWhite};
  border: solid 1px black;
  border-radius: 10px;
`;