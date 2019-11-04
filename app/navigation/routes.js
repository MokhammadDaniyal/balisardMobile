import MasterTypeScreen from "../screens/MasterTypeScreen";
import ServiceScreen from "../screens/ServiceScreen/";
import ProfileScreen from "../screens/ProfileScreen/";
import ServiceType from "../screens/Home/";
import ContactsScreen from "../screens/ContactsScreen";
import MasterInfoScreen from "../screens/MasterInfoScreen";

export default Routes = {
  MasterType: MasterTypeScreen,
  Service: ServiceScreen,
  Profile: ProfileScreen,
  ServiceType: ServiceType,
  Contacts: ContactsScreen,
  MasterInfo: MasterInfoScreen
};

export const RouteNames = Object.keys(Routes).reduce(
  (acc, item) => ({ ...acc, [item]: item }),
  {}
);
