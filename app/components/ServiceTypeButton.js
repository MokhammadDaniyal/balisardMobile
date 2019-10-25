import React, { Component } from "react";

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground
} from "react-native";

const ServiceTypeButton = props => (
  <TouchableOpacity style={props.style} onPress={props.onPress}>
    <Image source={props.image} style={styles.image} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    borderRadius: 125,
    width: 250,
    height: 250,
    borderColor: "#D7BF76",
    borderWidth: 2
  },
  textStyle: {
    marginLeft: 20,
    marginRight: 167,
    fontSize: 26,
    color: "#D7BF76"
  }
});

export default ServiceTypeButton;
