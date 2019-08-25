import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Platform
} from "react-native";

import LottieView from "lottie-react-native";

const ConfirmationOverlay = proprs => (
  <TouchableWithoutFeedback onPress={proprs.closeDialog}>
    <View style={styles.container}>
      <View style={styles.confirmationDialog}>
        <LottieView
          source={require("./images/checkmark.json")}
          autoPlay={true}
          loop={false}
          style={styles.animation}
          speed={1.3}
        />
        <Text style={styles.title}>Ваш запрос был отправлен успешно!</Text>
        <Text style={styles.body}>
          Администратор вам перезвонит в течении нескольких минут для
          подтверждения записи.
        </Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
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
    flexDirection: "row"
  },
  confirmationDialog: {
    flex: 0,
    alignItems: "center",
    marginHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#FFFFFF"
  },
  animation: {
    height: 75,
    width: 75
  },
  title: {
    color: "#D7BF76"
  },
  body: {
    marginHorizontal: 10,
    marginVertical: 15
  }
});

export default ConfirmationOverlay;
