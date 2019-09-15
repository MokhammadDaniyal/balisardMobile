import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { RouteNames } from "../../navigation";
import { navigate } from "../../navigation/NavigationService";

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    // props.navigation.navigate(RouteNames.Home);
  }
  render() {
    return <View style={{ flex: 1, backgroundColor: "green" }}></View>;
  }
}

const mapStateToProps = state => {
  return {
    rehydrated: state.user.rehydrated
  };
};
export default connect(mapStateToProps)(SplashScreen);
