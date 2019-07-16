import MasterTypeScreen from "../screens/MasterTypeScreen";
import ServiceScreen from "../screens/ServiceScreen";

export default (Routes = {
  MasterType: MasterTypeScreen,
  Service: ServiceScreen
});

export const RouteNames = Object.keys(Routes).reduce(
  (acc, item) => ({ ...acc, [item]: item }),
  {}
);
