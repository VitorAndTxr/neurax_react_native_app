import { NavigationContainer} from '@react-navigation/native';
import { PatientRoutes, TherapistRoutes, UnloggedRoutes } from './unlogged.routes';
import { useAuthContext } from '../../framework/auth/AuthContextProvider';
import { UserProfileEnum } from '../../framework/domain/enum/UserProfileEnum';


export function Routes(){
    const{ 
        userProfile,
    } =  useAuthContext()

    if(userProfile===UserProfileEnum.Unlogged){
        return(
            <NavigationContainer>
                <UnloggedRoutes/>
            </NavigationContainer>
        )
    }
    if(userProfile===UserProfileEnum.Theraphist){
        return(
            <NavigationContainer>
                <TherapistRoutes/>
            </NavigationContainer>
        )
    }
    return(
        <NavigationContainer>
            <PatientRoutes/>
        </NavigationContainer>
    )
}