import React, { Component } from "react";

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground
} from "react-native";

const MasterTypeSmallButton = props => (
  <TouchableOpacity style={props.style} onPress={props.onPress}>
    <ImageBackground
      source={require("./images/MasterTypeSmallButtonImage.png")}
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
    width: 154,
    borderRadius: 17,
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: "center"
  },
  textStyle: {
    textAlign: "center",
    marginHorizontal: 5,
    fontSize: 20,
    color: "#D7BF76"
  }
});

export default MasterTypeSmallButton;
