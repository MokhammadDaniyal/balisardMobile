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
              <Text style={{ fontSize: 15 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Tellus mauris a diam maecenas. Faucibus purus in massa tempor
                nec feugiat nisl pretium. Vel elit scelerisque mauris
                pellentesque pulvinar pellentesque habitant morbi. Lorem donec
                massa sapien faucibus et molestie ac. Morbi quis commodo odio
                aenean sed adipiscing diam donec. Enim ut tellus elementum
                sagittis vitae. Iaculis urna id volutpat lacus laoreet non
                curabitur gravida. Ultricies leo integer malesuada nunc vel
                risus commodo viverra. Arcu vitae elementum curabitur vitae nunc
                sed velit. Morbi tincidunt augue interdum velit euismod in
                pellentesque massa. Nisl suscipit adipiscing bibendum est. Amet
                nulla facilisi morbi tempus iaculis. In hac habitasse platea
                dictumst. Pulvinar etiam non quam lacus suspendisse faucibus.
                Lacus vestibulum sed arcu non. Cursus euismod quis viverra nibh
                cras pulvinar mattis. Leo in vitae turpis massa sed elementum
                tempus egestas. Proin nibh nisl condimentum id venenatis a.
              </Text>
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
