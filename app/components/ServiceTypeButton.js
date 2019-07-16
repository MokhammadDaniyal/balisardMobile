import React, { Component } from "react";

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground
} from "react-native";

const ServiceTypeButton = props => (
  <TouchableOpacity style={props.style} onPress={props.onPress}>
    <ImageBackground source={props.image} style={styles.buttonView}>
      <Text style={styles.textStyle}>{props.text}</Text>
    </ImageBackground>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "column",
    height: 182,
    width: 335,
    borderRadius: 17,
    margin: 20,
    justifyContent: "center"
  },
  textStyle: {
    marginLeft: 20,
    marginRight: 167,
    fontSize: 26,
    color: "#D7BF76"
  }
});

export default ServiceTypeButton;
