import React, { Component } from "react";

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground
} from "react-native";

const MasterTypeButton = props => (
  <TouchableOpacity style={props.style} onPress={props.onPress}>
    <ImageBackground
      source={require("./images/MasterTypeButtonImage.png")}
      style={styles.buttonView}
    >
      <Text style={styles.textStyle}>{props.text}</Text>
    </ImageBackground>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "column",
    height: 96,
    width: 335,
    borderRadius: 17,
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: "center"
  },
  textStyle: {
    marginLeft: 20,
    marginRight: 120,
    fontSize: 26,
    color: "#D7BF76"
  }
});

export default MasterTypeButton;
