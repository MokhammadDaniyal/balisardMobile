import React, { Component } from "react";

import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const RegisterButton = props => (
  <TouchableOpacity style={props.style}>
    <View style={styles.buttonView}>
      <Text>Register</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    backgroundColor: "rgb(215,192,123)",
    height: 40,
    width: 250,
    borderRadius: 25,
    margin: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default RegisterButton;
