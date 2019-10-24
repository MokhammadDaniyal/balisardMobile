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

import Home from "../screens/Home1";
import drawerContentComponents from "./drawerContentComponents";

export default AppDrawerNavigator = createDrawerNavigator(
  {
    Home: setStackNavigator({ Home: Home })
  },
  {
    contentComponent: drawerContentComponents
  }
);
