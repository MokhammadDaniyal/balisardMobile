import React, { Component } from "react";

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Platform
} from "react-native";

import Modal from "react-native-modal";

import PlusButton from "./PlusButton";

import { Icon } from "native-base";

class ServiceButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  resetPlus = () => {
    if (Platform.OS == "ios") {
      this.plusButton.resetButton();
    }
  };
  closeModal = () => {
    this.setState({ modalVisible: false });
  };
  showModal = (title, body) => {
    this.setState({ modalVisible: true });
  };
  renderInfoModal = () => {
    return (
      <View>
        <Modal
          isVisible={this.state.modalVisible}
          onBackButtonPress={this.closeModal}
          onBackdropPress={this.closeModal}
          backdropTransitionOutTiming={0}
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{this.props.name}</Text>
            <Text style={styles.modalBody}>{this.props.info}</Text>
          </View>
        </Modal>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.buttonView}>
        {this.renderInfoModal()}
        <View style={styles.leftView} />
        <View style={styles.mainView}>
          <View style={styles.textViewStyle}>
            <Text>{this.props.name}</Text>
            <Text
              style={{
                color: "grey"
              }}
            >
              {this.props.duration_h == "0"
                ? ""
                : this.props.duration_h + " час"}{" "}
              {this.props.duration_m == "0"
                ? ""
                : this.props.duration_m + " минут"}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 0,
              marginRight: 15
            }}
            onPress={this.showModal}
          >
            <Icon
              type="SimpleLineIcons"
              name="info"
              style={{ fontSize: 20, color: "#D7BF76" }}
            />
          </TouchableOpacity>
          {Platform.OS == "ios" && (
            <PlusButton
              ref={plusButton => {
                this.plusButton = plusButton;
              }}
              onPress={this.props.onPress}
            />
          )}
          {Platform.OS == "android" && this.props.showPlus && (
            <PlusButton
              ref={plusButton => {
                this.plusButton = plusButton;
              }}
              onPress={this.props.onPress}
            />
          )}
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
    left: -1,
    width: 10,
    height: "101%",
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
  },
  modalView: {
    flex: 0,
    borderRadius: 15,
    backgroundColor: "white",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "column"
  },
  modalTitle: {
    margin: 5,
    color: "#D7BF76",
    fontSize: 25
  },
  modalBody: {
    margin: 10,
    fontSize: 15
  }
});

export default ServiceButton;
