import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import AppDrawerNavigator from "../navigation/drawerNavigator";
import SplashScreen from "../screens/SplashScreen";

const Routes = {
  Splash: {
    screen: SplashScreen
  },
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

const AppStackNavigator = createSwitchNavigator(Routes, {
  initialRouteName: "Splash",
  headerMode: "none",
  defaultNavigationOptions: {
    gesturesEnabled: false
  }
});

const appContainer = createAppContainer(AppStackNavigator);

export default appContainer;
