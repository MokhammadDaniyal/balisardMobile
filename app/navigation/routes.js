import MasterTypeScreen from "../screens/MasterTypeScreen";
import ServiceScreen from "../screens/ServiceScreen/";
import ProfileScreen from "../screens/ProfileScreen/";
import ServiceType from "../screens/Home/";
import ContactsScreen from "../screens/ContactsScreen";

export default Routes = {
  MasterType: MasterTypeScreen,
  Service: ServiceScreen,
  Profile: ProfileScreen,
  ServiceType: ServiceType,
  Contacts: ContactsScreen
};

export const RouteNames = Object.keys(Routes).reduce(
  (acc, item) => ({ ...acc, [item]: item }),
  {}
);
