import { createStackNavigator } from "react-navigation";
import HomePageManager from "./HomePageManager";
import ForgotPasswordController from "./ForgotPasswordController";

const AppNavigator = createStackNavigator({
  HomePageManager: { screen: HomePageManager },
  ForgotPasswordController: { screen: ForgotPasswordController }
});

export default AppNavigator;
