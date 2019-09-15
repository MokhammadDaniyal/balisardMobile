import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { RouteNames } from "../../navigation";
import { navigate } from "../../navigation/NavigationService";

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.navigate(this.props.user.id ? "Home" : "Login");
  }
  render() {
    if (this.props.rehydrated) {
      return <View style={{ flex: 1, backgroundColor: "blue" }}></View>;
    } else return <View style={{ flex: 1, backgroundColor: "green" }}></View>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(SplashScreen);
