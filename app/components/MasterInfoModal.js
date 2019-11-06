import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Text,
  Dimensions
} from "react-native";
import Modal from "react-native-modal";
import { Icon } from "native-base";

const width = Math.round(Dimensions.get("window").width);
class MasterInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  hideModal = () => {
    this.setState({ isVisible: false });
  };
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.setState({ isVisible: true });
          }}
        >
          <Image source={{ uri: this.props.image }} style={styles.image} />
        </TouchableOpacity>
        <Modal
          isVisible={this.state.isVisible}
          onBackButtonPress={this.hideModal}
          onBackdropPress={this.hideModal}
          backdropTransitionOutTiming={0}
          animationIn={"slideInUp"}
          animationOut={"slideOutDown"}
        >
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={this.hideModal}
              >
                <Icon type="AntDesign" name="close" style={styles.icon} />
              </TouchableOpacity>
              <Image
                source={{ uri: this.props.image }}
                style={styles.modalImage}
              />
              <View>
                <Text style={styles.masterName}>asdsadsadad</Text>
                <Text style={styles.masterType}>asdsadsadad</Text>
              </View>
            </View>
            <View style={styles.infoText}>
              <Text style={{ fontSize: 15, margin: 5 }}>{this.props.info}</Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    width: width / 2 - 2,
    borderWidth: 1,
    borderColor: "#D7BF76"
  },
  modalContainer: {
    flex: 1,
    width: "100%"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  iconButton: {
    position: "absolute",
    top: 0,
    right: 5
  },
  icon: {
    fontSize: 25,
    color: "#D7BF76"
  },
  masterName: {
    fontSize: 26,
    color: "#D7BF76"
  },
  masterType: {
    fontSize: 15,
    color: "#D7BF76"
  },
  modalImage: {
    borderWidth: 2,
    borderColor: "#D7BF76",
    height: 120,
    width: 120,
    borderRadius: 60
  },
  infoText: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 5
  }
});

export default MasterInfoScreen;
