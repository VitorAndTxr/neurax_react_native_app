import { Button, PixelRatio } from 'react-native';
import styled from 'styled-components/native';
const fontScale = PixelRatio.getFontScale();

export const ResponsiveSize = (size:number) => {
    return size*fontScale
}

export const BaseViewStyles = styled.View`
    padding-top:150px;
    flex:1;
    background-color: #C6EAFA;
`;

export const PrimaryButton = styled.TouchableOpacity`
    border-radius: 10px;
    background-color: #08415C;
    elevation:10;
    margin:35px;

` 

export const LoginButton = styled(PrimaryButton)`
    padding:20px;
`



export const StyledTextInput = styled.TextInput`
    border-radius: 10px;
    background: #FFF;
    elevation:10;
    margin-left:35px;
    margin-right:35px;
    margin-bottom:35px;
    margin-top:5px;

    font-size:20px;
    padding:20px;
`

export const LoginTextLabel = styled.Text`
    margin-left:35px;
    text-align: left;
    font-family:Inter_400Regular;
    font-size:18px;
`

export const H1 = styled.Text`
    color: #08415C;
    text-align: center;
    font-family:Inter_700Bold;
    font-size:30px;
    margin-bottom:50px;
    `

export const BigButtonText = styled.Text`
color: #FFF;
text-align: center;
font-family:Inter_400Regular;
font-size:30px;
`