import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme})=> theme.colors.primary};

`;

export const TouchableOpacity = styled.TouchableOpacity`
 background-color: red;
`;