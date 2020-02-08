import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { serverAddress } from "../../network/config";
import { fetchServiceCategoriesSuccess } from "../../store/services/actions";
import { Icon } from "native-base";
import { postRequest, postRequestResponse } from "../../network/";
import { RouteNames } from "../../navigation/routes";
import { navigate } from "../../navigation/NavigationService";
import LoadingOverlay from "../../components/LoadingOverlay";
import { Header } from "react-navigation";
import images from "../LoginScreen/images";
import MasterInfoModal from "../../components/MasterInfoModal";
import { getStatusBarHeight } from "react-native-status-bar-height";

class MasterInfoScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name="arrowleft"
          type="AntDesign"
          style={{ marginHorizontal: 10 }}
        />
      </TouchableOpacity>
    ),
    headerTitle: (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 25, alignSelf: "center" }}>Мастера</Text>
      </View>
    )
  });
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <ImageBackground source={images.background} style={styles.container}>
        <FlatList
          data={this.props.masters}
          renderItem={({ item }) => {
            return (
              <MasterInfoModal
                // image={"data:image/jpg;base64," + item.image}
                image={serverAddress + "images/masters/" + item.id + ".jpg"}
                name={item.name}
                info={item.info}
              />
            );
          }}
          numColumns={2}
          keyExtractor={item => item.id}
        />
        {/* {this.props.isLoading && <LoadingOverlay />} */}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Header.HEIGHT +
      (Platform.OS == "ios" && getStatusBarHeight() == 44 ? 35 : 0),
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  console.log(state.reservations.masters);
  return {
    masters: state.reservations.masters,
    isLoading: state.reservations.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterInfoScreen);
