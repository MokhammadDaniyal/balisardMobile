import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "native-base";

const DrawerButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
    <Icon name="menu" />
  </TouchableOpacity>
);

export default DrawerButton;
