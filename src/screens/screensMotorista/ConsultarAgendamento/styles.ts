import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";


export const Container = styled.View`
padding: ${RFValue(10)}px ${RFValue(20)}px ${RFValue(60)}px ${RFValue(20)}px;
`;

export const ContainerAgendamentosPendentes = styled.View`
`;
export const TituloAgendamentos = styled.Text`
color: ${({theme})=> theme.colors.primary};
font-size: 25px;
font-weight: bold;
`;

export const ContainerAgendamento = styled.View`
border: 1px solid ${({theme})=> theme.colors.primary};
margin: ${RFValue(10)}px 0;
padding:${RFValue(5)}px;
border-radius: 8px;
`;
export const NomeLocalEmbarque = styled.Text`
color: ${({theme})=> theme.colors.backgroundColor};
font-size: 20px;
`;
export const NomeLocalDesembarque = styled.Text`
color: ${({theme})=> theme.colors.backgroundColor};
font-size: 20px;
`;
export const ContainerAgendamentoConfirmados = styled.View`

`;