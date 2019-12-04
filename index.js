import { AppRegistry, View, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import App from "./App";
import { name as appName } from "./app.json";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import storeConfig from "./app/config/store";
import SplashScreen from "./app/screens/SplashScreen";
const { store, persistor } = storeConfig();

class AppRedux extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          {/* <SafeAreaView style={styles.safeArea}> */}
          <App />
          {/* </SafeAreaView> */}
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => AppRedux);
const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  }
});
