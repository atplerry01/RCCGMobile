import { createStackNavigator } from 'react-navigation';
import SignInScreen from '../Screens/Auth/SignInScreen';
import SignUpScreen from '../Screens/Auth/SignUpScreen';
import WelcomeScreen from '../Screens/Auth/WelcomeScreen';

const AuthStackNavigator = createStackNavigator(
    {
      Welcome: WelcomeScreen,
      SignIn: SignInScreen,
      SignUp: SignUpScreen
    }
  );
  
  export default AuthStackNavigator;