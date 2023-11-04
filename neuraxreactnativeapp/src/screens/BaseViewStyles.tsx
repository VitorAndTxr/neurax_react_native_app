import { Button, PixelRatio } from 'react-native';
import styled from 'styled-components/native';

const fontScale = PixelRatio.getFontScale();

export const ResponsiveSize = (size:number) => {
    return size*fontScale
}


export const BaseViewStyles = styled.View`
    flex:1;
    background-color: #C6EAFA;
`;

export const LoginViewStyles = styled(BaseViewStyles)`
    padding:35px;
    padding-top:150px;
`;

export const LoggedViewStyles = styled.View`
    margin:15px;
    border-radius: 10px;
    background-color: #FFFFFFB2;
    padding-top:20px;
    padding-bottom:20px;
    padding-left:35px;
    padding-right:35px;
`

export const PrimaryButton = styled.TouchableOpacity`
    background-color: ${(props) => (props.disabled ? '#08415Ccc' : '#08415C')};
    border-radius: 10px;
    elevation:10;
    padding:20px;
    color:#fff;
` 

export const PrimaryGreenButton = styled.TouchableOpacity`
    border-radius: 10px;
    background-color: #0A8754;
    elevation:10;
    padding:20px;
` 

export const PrimaryRedButton = styled.TouchableOpacity`
    border-radius: 10px;
    background-color: #F24236;
    elevation:10;
    padding:20px;
` 

export const LoginButton = styled(PrimaryButton)`
    margin-top:35px;
`

export const StyledTextInput = styled.TextInput`
    border-radius: 10px;
    background: #FFF;
    elevation:10;
    margin-bottom:35px;
    margin-top:5px;
    color: #000;

    font-size:20px;
    padding:20px;
`

export const LoginTextLabel = styled.Text`
    text-align: left;
    color: #08415C;
    font-family:Inter_600Bold;
    font-size:18px;
`
export const LoginTextBold = styled(LoginTextLabel)`
    font-weight:600;
`

export const H1 = styled.Text`
    color: #08415C;
    text-align: center;
    font-family:Inter_700Bold;
    font-size:30px;
    font-weight:700;

    margin-bottom:50px;
`

export const H2 = styled.Text`
    color: #08415C;
    text-align: center;
    font-family:Inter_700Bold;
    font-size:25px;
    font-weight:700;

    margin-bottom:50px;
`

export const H3 = styled.Text`
    color: #08415C;
    text-align: center;
    font-family:Inter_700Bold;
    font-weight:700;
    font-size:20px;
    margin-bottom:30px;

`

export const BigButtonText = styled.Text`
color: #FFF;
text-align: center;
font-family:Inter_400Regular;
font-size:30px;
`

export const RegularButtonText = styled.Text`
    color: #FFF;
    text-align: center;
    font-family:Inter_400Regular;
    font-size:24px;
`