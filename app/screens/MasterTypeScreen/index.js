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
import { fetchServiceCategoriesSuccess } from "../../store/services/actions";
import { Icon } from "native-base";
import { getRequest } from "../../network/";
import { RouteNames } from "../../navigation/routes";
import { navigate } from "../../navigation/NavigationService";
import MasterTypeButton from "../../components/MasterTypeButton";
import LoadingOverlay from "../../components/LoadingOverlay";
import { Header } from "react-navigation";
import images from "../LoginScreen/images";

class ServiceCategoryScreen extends Component {
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
        <Text style={{ fontSize: 25, alignSelf: "center", color: "#282828" }}>
          {navigation.state.params.title}
        </Text>
      </View>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(RouteNames.Profile);
        }}
      >
        <Icon
          type="AntDesign"
          name="user"
          style={{ marginRight: 10, fontSize: 25, color: "black" }}
        />
      </TouchableOpacity>
    )
  });
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = {
      loginPlaceholder: "Username",
      usernameText: "",
      passwordPlaceholder: "Password",
      passwordText: ""
    };
  }

  componentDidMount() {
    getRequest("services/categories", this.props.storeServiceCategories);
  }
  render() {
    return (
      <ImageBackground source={images.background} style={styles.container}>
        <FlatList
          data={this.props.serviceCategories}
          renderItem={category => {
            return (
              <MasterTypeButton
                // style={{ borderColor: "black", borderWidth: 2 }}
                key={category.item.id}
                text={category.item.name}
                onPress={() => {
                  navigate(RouteNames.Service, {
                    type: category.item.id,
                    genderType: this.params.genderType,
                    title: category.item.name
                  });
                }}
              />
            );
          }}
        />
        {this.props.isLoading && <LoadingOverlay />}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Header.HEIGHT + (Platform.OS == "ios" ? 25 : 0),
    justifyContent: "center",
    alignItems: "center"
  },
  loginContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  loginInput: {
    marginLeft: 15,
    flex: 1,
    color: "white"
  },
  passwordInput: {
    marginLeft: 15,
    flex: 1,
    color: "white"
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#e0e0eb10",
    height: 35,
    width: 250,
    borderRadius: 10,
    margin: 10
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#e0e0eb25",
    height: 40,
    width: 250,
    borderRadius: 25,
    margin: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    alignContent: "center"
  },
  logo: { marginBottom: 20, resizeMode: "contain" },

  additionalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    serviceCategories: state.services.serviceCategories,
    isLoading: state.services.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeServiceCategories: categories => {
      dispatch(fetchServiceCategoriesSuccess(categories));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceCategoryScreen);
