import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

export const Routes = {
  Login: {
    screen: LoginScreen
  },
  Registration: {
    screen: RegistrationScreen
  }
};

export const RouteNames = Object.keys(Routes).reduce(
  (acc, item) => ({ ...acc, [item]: item }),
  {}
);

const Navigator = createStackNavigator(Routes, {
  initialRouteName: "Login"
});

const appContainer = createAppContainer(Navigator);

export default appContainer;
