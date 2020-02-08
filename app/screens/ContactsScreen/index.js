import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Linking,
  Platform
} from "react-native";
import { openInstagram, openWeb, openFacebook } from "../../utils";
import { Header } from "react-navigation";
import { getStatusBarHeight } from "react-native-status-bar-height";

class Contacts extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{ fontSize: 25 }}>Контакты</Text>
  });
  constructor(props) {
    super(props);
  }

  open2gis = () => {
    Linking.canOpenURL(
      "dgis://2gis.ru/routeSearch/rsType/car/to/76.923917,43.234669"
    ).then(supported => {
      if (supported) {
        return Linking.openURL(
          "dgis://2gis.ru/routeSearch/rsType/car/to/76.923917,43.234669"
        );
      } else {
        alert("Приложение 2Gis не установлено");
      }
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            borderRadius: 10,
            overflow: "hidden"
          }}
        >
          <Image
            source={require("./images/map.png")}
            style={styles.map}
          ></Image>
        </View>
        <View style={{ flex: 0 }}>
          <View style={styles.textBlock}>
            <Text style={styles.title}>Наш адрес</Text>
            <Text style={styles.text}>
              ул. Бухар Жырау 27/5Б, блок -3 (вход с ул. Шагабутдинова, ниже ул.
              Бухар-Жырау)
            </Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.textBlock}>
            <Text style={styles.title}>Время работы</Text>
            <Text style={styles.text}>9:00 - 21:00 понедельник - суббота</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.textBlock}>
            <Text style={styles.title}>Контакты</Text>
            <Text style={styles.text}>+7 727 337-56-33</Text>
            <Text style={styles.text}>+7 727 337-58-69</Text>
            <Text style={styles.text}>info@balisard.kz</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <TouchableOpacity onPress={openFacebook}>
            <Image
              source={require("./images/facebook.png")}
              style={styles.icon}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={openWeb}>
            <Image
              source={require("./images/www.png")}
              style={styles.icon}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={openInstagram}>
            <Image
              source={require("./images/instagram.png")}
              style={styles.icon}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.open2gis}>
            <Image
              source={require("./images/2gis.png")}
              style={styles.icon2gis}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Header.HEIGHT +
      (Platform.OS == "ios" && getStatusBarHeight() == 44 ? 40 : 0),
    marginHorizontal: 5,
    marginBottom: 5
  },
  map: {
    alignSelf: "center",
    resizeMode: "contain",
    margin: 5
  },
  title: {
    fontSize: 21,
    fontWeight: "bold"
  },
  text: {
    marginVertical: 5,
    fontSize: 16
  },
  textBlock: {
    paddingVertical: 5,
    marginLeft: 10
  },
  line: {
    flex: 0,
    borderColor: "#D7BF76",
    borderWidth: 1,
    height: 1
  },
  icon: {
    height: 45,
    width: 45
  },
  icon2gis: {
    height: 45,
    width: 100,
    resizeMode: "contain"
  }
});
export default Contacts;
