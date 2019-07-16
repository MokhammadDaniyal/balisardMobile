import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { Icon } from "native-base";

import { RouteNames } from "../../navigation/routes";
import { navigate } from "../../navigation/NavigationService";

import MasterTypeButton from "../../components/MasterTypeButton";

class ServiceScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          type="AntDesign"
          name="left"
          style={{ margin: 10, fontSize: 25, color: "black" }}
        />
      </TouchableOpacity>
    ),
    headerTitle: <Text style={{ fontSize: 25 }}>Услуги для женщин</Text>
  });
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.state = {
      loginPlaceholder: "Username",
      usernameText: "",
      passwordPlaceholder: "Password",
      passwordText: ""
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ImageBackground
          style={{
            width: "100%",
            height: "100%"
          }}
          imageStyle={{ opacity: 0.8 }}
          source={require("../../images/background.jpg")}
        >
          <FlatList
            data={[{ key: "a" }, { key: "b" }]}
            renderItem={({ item }) => (
              <MasterTypeButton
                // style={{ borderColor: "black", borderWidth: 2 }}
                text={"Парикхмахер - стилист"}
                onPress={() => {
                  navigate(RouteNames.Service);
                }}
              />
            )}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  return {};
};

// const mapDispatchToProps = { increment, decrement, reset };

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(ServiceScreen);
