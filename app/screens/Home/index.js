import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  ImageBackground,
  TouchableOpacity,
  Platform
} from "react-native";

import RegisterButton from "../../components/RegistreButton";
import ServiceTypeButton from "../../components/ServiceTypeButton";
import { postRequest } from "../../network/";
import { Icon } from "native-base";
import { RouteNames } from "../../navigation/routes";
import { navigate } from "../../navigation/NavigationService";
import images from "../LoginScreen/images";
import { Header } from "react-navigation";
class ServiceType extends Component {
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
    headerTitle: <Text style={{ fontSize: 25 }}>Регистрация</Text>
  });
  render() {
    return (
      <ImageBackground
        style={{
          flex: 1,
          paddingTop: Header.HEIGHT + (Platform.OS == "ios" ? 35 : 0),
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
        source={images.background}
      >
        <ServiceTypeButton
          image={require("./images/feemale.png")}
          text={"Услуги для женщин"}
          onPress={() => {
            navigate(RouteNames.MasterType, {
              title: "Услуги для женщин",
              genderType: 1
            });
          }}
        />
        <ServiceTypeButton
          image={require("./images/male.png")}
          text={"Услуги для мужчин"}
          onPress={() => {
            navigate(RouteNames.MasterType, {
              title: "Услуги для мужчин",
              genderType: 2
            });
          }}
        />
      </ImageBackground>
    );
  }
}

export default ServiceType;
