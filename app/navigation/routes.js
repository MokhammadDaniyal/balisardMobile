import MasterTypeScreen from "../screens/MasterTypeScreen";
import ServiceScreen from "../screens/ServiceScreen/";
import ProfileScreen from "../screens/ProfileScreen/";

export default (Routes = {
  MasterType: MasterTypeScreen,
  Service: ServiceScreen,
  Profile: ProfileScreen
});

export const RouteNames = Object.keys(Routes).reduce(
  (acc, item) => ({ ...acc, [item]: item }),
  {}
);
