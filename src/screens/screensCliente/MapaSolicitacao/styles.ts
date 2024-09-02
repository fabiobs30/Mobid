import styled from "styled-components/native";




export const ButtonRider = styled.TouchableOpacity`
width: 100%;
height: 100px;
background-color: red;
border-radius: 10px;
align-items: center;
justify-content: center;
`;
export const ButtonRiderText  =styled.Text`
color: ${({theme})=> theme.colors.colorWhite};
font-size: 25px;
`;