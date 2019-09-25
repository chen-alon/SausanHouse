import {createStackNavigator, createAppContainer} from 'react-navigation';
import ForgotPasswordController from './ForgotPasswordController';
import LoginForm from './LoginForm';

const MainNavigator = createStackNavigator({
  LoginForm: {
    screen: LoginForm
  },
  ForgotPasswordController: {
    screen: ForgotPasswordController
  }
},

{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
  );

const LoginFormNavigation = createAppContainer(MainNavigator);

export default LoginFormNavigation;