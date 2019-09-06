import React, { Component } from "react";

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Platform
} from "react-native";

import LottieView from "lottie-react-native";

class PlusButton extends React.Component {
  constructor(props) {
    super(props);
  }
  resetButton = () => {
    this.plusAnimation.reset();
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.plusButtonStyle}
        onPress={() => {
          if (Platform.OS == "ios") {
            this.plusAnimation.play(0, 20);
          }
          this.props.onPress();
        }}
      >
        <LottieView
          ref={animation => {
            this.plusAnimation = animation;
          }}
          source={require("../components/images/plus.json")}
          loop={false}
          // onAnimationFinish={this.props.onPress}
        />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  plusButtonStyle: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderLeftColor: "#D8D8D8",
    borderLeftWidth: 1
  }
});

export default PlusButton;
