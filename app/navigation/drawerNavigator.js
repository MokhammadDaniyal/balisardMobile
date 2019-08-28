import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from "react-native";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";

import setStackNavigator from "../navigation/mainStackNavigator";

import Routes, { RouteNames } from "../navigation/routes";

import Home from "../screens/Home";

class Feed extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="TEST"
          onPress={() => {
            console.log(this.props.navigation);
            this.props.navigation.navigate(RouteNames.FeedTest);
          }}
        />
        <Text>Feed</Text>
      </View>
    );
  }
}

export class FeedTest extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Feed Test</Text>
      </View>
    );
  }
}

class Profile extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile</Text>
      </View>
    );
  }
}
class Settings extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Settings</Text>
      </View>
    );
  }
}

export default (AppDrawerNavigator = createDrawerNavigator({
  Home: setStackNavigator({ Home: Home }),
  Profile: setStackNavigator({ Profile: Profile }),
  Settings: setStackNavigator({ Settings: Settings })
}));
