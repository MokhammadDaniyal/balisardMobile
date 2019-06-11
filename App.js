import React, { Component } from "react";
import AppContainer from "./app/navigation";
import NavigationService from "./app/navigation/NavigationService";

export default class App extends Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
