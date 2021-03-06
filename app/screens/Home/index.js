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
import { getStatusBarHeight } from "react-native-status-bar-height";

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
    headerTitle: (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 25, alignSelf: "center", color: "#282828" }}>
          Регистрация
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
  render() {
    return (
      <ImageBackground
        style={{
          flex: 1,
          paddingTop:
            Header.HEIGHT +
            (Platform.OS == "ios" && getStatusBarHeight() == 44 ? 35 : 0),
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
