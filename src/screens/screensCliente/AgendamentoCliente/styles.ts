import styled from "styled-components/native";

export const Container = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;
export const ContainerAgendar= styled.View`

`
export const AgendarTitulo = styled.Text`
font-size:20px ;
color: ${({theme})=> theme.colors.primary};
font-weight: bold;
text-align: center;
`
