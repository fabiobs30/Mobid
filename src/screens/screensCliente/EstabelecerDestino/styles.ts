import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import Entypo from 'react-native-vector-icons/Entypo';

export const Container = styled.View`
padding: ${RFValue(5)}px;
  flex: 1;
  background-color: ${({theme})=> theme.colors.primary};

`;

export const TouchableOpacity = styled.TouchableOpacity`
 background-color: red;
`;
export const IconLocation = styled(Entypo)`
  color: red;
  font-size: ${RFValue(30)}px;
`;
export const Buttonresearch = styled.TouchableOpacity`
background-color: red;
width: 100%;
height: 100px;
`