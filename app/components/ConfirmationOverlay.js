import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";

// import LottieView from "lottie-react-native";

const ConfirmationOverlay = proprs => (
  <View style={styles.container}>
    <View style={styles.confirmationDialog}>
      {/* <LottieView
        source={require("./images/checkmark.json")}
        autoPlay={true}
        loop={true}
      /> */}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000070"
  },
  confirmationDialog: {
    height: 250,
    width: 200,
    borderRadius: 25,
    backgroundColor: "#FFFFFF"
  }
});

export default ConfirmationOverlay;
