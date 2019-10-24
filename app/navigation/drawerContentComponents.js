import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { Text, View, StyleSheet, ImageBackground, Image } from "react-native";
import { white } from "ansi-colors";
import images from "../screens/LoginScreen/images";

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
              flex: 1,
              width: 200,
              justifyContent: "center",
              resizeMode: "contain"
            }}
          ></Image>
        </View>
        <View style={styles.screenContainer}>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == "Home"
                ? styles.activeBackgroundColor
                : null
            ]}
          >
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == "Home"
                  ? styles.selectedTextStyle
                  : null
              ]}
              onPress={this.navigateToScreen("Home")}
            >
              Главная Страница
            </Text>
          </View>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == "Profile"
                ? styles.activeBackgroundColor
                : null
            ]}
          >
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == "Profile"
                  ? styles.selectedTextStyle
                  : null
              ]}
              onPress={this.navigateToScreen("Profile")}
            >
              Профайл
            </Text>
          </View>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == "Contacts"
                ? styles.activeBackgroundColor
                : null
            ]}
          >
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == "Contacts"
                  ? styles.selectedTextStyle
                  : null
              ]}
              onPress={this.navigateToScreen("Contacts")}
            >
              Контакты
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Социальные Сети</Text>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              source={require("../screens/ContactsScreen/images/facebook.png")}
            />
            <Image
              style={styles.icon}
              source={require("../screens/ContactsScreen/images/instagram.png")}
            />
          </View>
          <View
            style={[
              styles.iconContainer,
              { justifyContent: "center", marginBottom: 15 }
            ]}
          >
            <Image
              style={styles.icon}
              source={require("../screens/ContactsScreen/images/www.png")}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  },
  headerContainer: {
    height: 150
  },
  headerText: {
    color: "#fff8f8"
  },
  screenContainer: {
    flex: 1,
    paddingTop: 20,
    width: "100%"
  },
  screenStyle: {
    height: 30,
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
    color: "#00adff"
  },
  activeBackgroundColor: {
    backgroundColor: "grey"
  },
  footer: {
    backgroundColor: "#656565",
    width: "100%"
  },
  footerText: {
    color: "#D7BF76",
    margin: 10,
    fontSize: 16,
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
