import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreenContextProvider } from '../context/LoginScreenContext';
import { useStackNavigatorContext } from './StackNavigatorProvider';


export function UnloggedRoutes(){

    const {currentScreen} = useStackNavigatorContext()

    switch (currentScreen) {
        case 'Login':
          return (
            <LoginScreenContextProvider>
                <LoginScreen/>
            </LoginScreenContextProvider>
          );
    
        default:
          return <div>Screen not found</div>;
      }
}

export function UserRoutes(){
    const {currentScreen} = useStackNavigatorContext()

    switch (currentScreen) {
        case 'Home':
          return (
            <HomeScreen/>
          );
    
        default:
          return <div>Screen not found</div>;
      }
}