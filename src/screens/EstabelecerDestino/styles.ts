import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
padding: ${RFValue(5)}px;
  flex: 1;
  background-color: ${({theme})=> theme.colors.primary};

`;

export const TouchableOpacity = styled.TouchableOpacity`
 background-color: red;
`;