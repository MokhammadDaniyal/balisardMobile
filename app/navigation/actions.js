const navAction = type => (routeName, params) => ({
  type,
  payload: { routeName, params, key: routeName }
});

export const NAVIGATE_TO = `NAVIGATE_TO`;
export const navigateTo = navAction(NAVIGATE_TO);
