import React, { Component } from "react";

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Platform
} from "react-native";

import PlusButton from "./PlusButton";

import { Icon } from "native-base";

class ServiceButton extends React.Component {
  constructor(props) {
    super(props);
  }
  resetPlus = () => {
    this.plusButton.resetButton();
  };
  render() {
    return (
      <View style={styles.buttonView}>
        <View style={styles.leftView} />
        <View style={styles.mainView}>
          <View style={styles.textViewStyle}>
            <Text>{this.props.name}</Text>
            <Text
              style={{
                color: "grey"
              }}
            >
              {this.props.duration_h} час
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 0,
              marginRight: 15
            }}
          >
            <Icon
              type="SimpleLineIcons"
              name="info"
              style={{ fontSize: 20, color: "#D7BF76" }}
            />
          </TouchableOpacity>
          <PlusButton
            ref={plusButton => {
              this.plusButton = plusButton;
            }}
            onPress={this.props.onPress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    height: 55,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: {
          width: 0,
          height: 2
        }
      },
      android: {
        elevation: 5
      }
    }),
    borderColor: "#d2d1d150",
    borderWidth: 1,
    backgroundColor: "#FFFFFF"
  },
  leftView: {
    position: "absolute",
    left: 0,
    width: 10,
    height: "100%",
    backgroundColor: "#D7BF76",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  mainView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20
  },
  plusButtonStyle: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderLeftColor: "#D8D8D8",
    borderLeftWidth: 1
  },
  textViewStyle: {
    flex: 5,
    flexDirection: "column"
  }
});

export default ServiceButton;
