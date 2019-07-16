import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import AppDrawerNavigator from "../navigation/drawerNavigator";

const Routes = {
  Login: {
    screen: LoginScreen
  },
  Registration: {
    screen: RegistrationScreen
  },
  Home: {
    screen: AppDrawerNavigator
  }
};

export const RouteNames = Object.keys(Routes).reduce(
  (acc, item) => ({ ...acc, [item]: item }),
  {}
);

const AppStackNavigator = createStackNavigator(Routes, {
  initialRouteName: "Login",
  headerMode: "none",
  defaultNavigationOptions: {
    gesturesEnabled: false
  }
});

const appContainer = createAppContainer(AppStackNavigator);

export default appContainer;
