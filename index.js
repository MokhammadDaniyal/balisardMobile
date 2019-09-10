import { AppRegistry, View } from "react-native";
import React from "react";
import App from "./App";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import storeConfig from "./app/config/store";

const { store, persistor } = storeConfig();
console.log("HERE" + JSON.stringify(persistor));

class AppRedux extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={<View style={{ flex: 1, backgroundColor: "green" }}></View>}
        >
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => AppRedux);
