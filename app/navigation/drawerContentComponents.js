import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";
import { white } from "ansi-colors";
import images from "../screens/LoginScreen/images";
import { openFacebook, openInstagram, openWeb } from "../utils";

export default class drawerContentComponents extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={images.logo}
            style={{
              flex: 0,
              width: 150,
              height: 120,
              justifyContent: "center",
              resizeMode: "contain",
              alignSelf: "center"
            }}
          />
        </View>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={styles.line} />
        </View>
        <View style={styles.screenContainer}>
          <View style={[styles.screenStyle]}>
            <Text
              style={[styles.screenTextStyle]}
              onPress={this.navigateToScreen("Home")}
            >
              Главная Страница
            </Text>
          </View>
          <View style={[styles.screenStyle]}>
            <Text
              style={[styles.screenTextStyle]}
              onPress={this.navigateToScreen("MasterInfo")}
            >
              Мастера
            </Text>
          </View>
          <View style={[styles.screenStyle]}>
            <Text
              style={[styles.screenTextStyle]}
              onPress={this.navigateToScreen("Profile")}
            >
              Профайл
            </Text>
          </View>
          <View style={[styles.screenStyle]}>
            <Text
              style={[styles.screenTextStyle]}
              onPress={this.navigateToScreen("Contacts")}
            >
              Контакты
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Социальные сети</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={openFacebook}>
              <Image
                style={styles.icon}
                source={require("../screens/ContactsScreen/images/facebook.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={openInstagram}>
              <Image
                style={styles.icon}
                source={require("../screens/ContactsScreen/images/instagram.png")}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.iconContainer,
              { justifyContent: "center", marginBottom: 15 }
            ]}
          >
            <TouchableOpacity onPress={openWeb}>
              <Image
                style={styles.icon}
                source={require("../screens/ContactsScreen/images/www.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: Platform.OS == "ios" ? 20 : 0,
    alignItems: "center"
  },
  headerContainer: {
    flex: 0
  },
  headerText: {
    color: "#fff8f8"
  },
  screenContainer: {
    flex: 1,
    width: "100%"
  },
  line: {
    flex: 1,
    borderColor: "#D7BF76",
    borderTopWidth: 1,
    height: 1
  },
  screenStyle: {
    height: 35,
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  screenTextStyle: {
    fontSize: 20,
    marginLeft: 20,
    textAlign: "center"
  },
  selectedTextStyle: {
    fontWeight: "bold",
    color: "#D7BF76"
  },
  footer: {
    backgroundColor: "#656565",
    width: "100%"
  },
  footerText: {
    color: "#D7BF76",
    margin: 10,
    fontSize: 18,
    alignSelf: "center"
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 5
  },
  icon: {
    width: 45,
    height: 45
  }
});
