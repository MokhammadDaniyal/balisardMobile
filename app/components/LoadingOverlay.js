import React from "react";
import { View, StyleSheet, Platform } from "react-native";

import { BarIndicator } from "react-native-indicators";

const LoadingOverlay = props => (
  <View style={styles.container}>
    <BarIndicator color="#D7BF76" count={5} />
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
    backgroundColor: "#00000070",
    ...Platform.select({
      ios: { zIndex: 10 },
      android: { elevation: 10 }
    })
  }
});
export default LoadingOverlay;
