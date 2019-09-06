import React, { Component } from "react";
import { View, Button, Text, ImageBackground } from "react-native";

import RegisterButton from "../../components/RegistreButton";
import ServiceTypeButton from "../../components/ServiceTypeButton";
import { postRequest } from "../../network/";

import { RouteNames } from "../../navigation/routes";
import { navigate } from "../../navigation/NavigationService";

class Home extends Component {
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
          {/* <Button
          title="TEST"
          onPress={() => {
            console.log(this.props.navigation);
            this.props.navigation.navigate(RouteNames.FeedTest);
          }}
        />
        <Text>Home</Text> */}
          {/* <RegisterButton style={{ borderColor: "black", borderWidth: 2 }} /> */}
          <ServiceTypeButton
            image={require("../../components/images/serviceFemale.png")}
            // style={{ borderColor: "black", borderWidth: 2 }}
            text={"Услуги для женщин"}
            onPress={() => {
              navigate(RouteNames.MasterType);
            }}
          />
          <ServiceTypeButton
            image={require("../../components/images/serviceMale.png")}
            // style={{ borderColor: "black", borderWidth: 2 }}
            text={"Услуги для Мужчин"}
          />
          <ServiceTypeButton
            image={require("../../components/images/serviceKids.png")}
            // style={{ borderColor: "black", borderWidth: 2 }}
            text={"Услуги для Детей"}
          />
        </ImageBackground>
      </View>
    );
  }
}

export default Home;
