import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Keyboard,
  Animated
} from "react-native";
import { connect } from "react-redux";
import Images from "../LoginScreen/images";
import IntlPhoneInput from "react-native-intl-phone-input";

import { postRequest } from "../../network/";
import { Icon } from "native-base";
import { navigate } from "../../navigation/NavigationService";
import { RouteNames } from "../../navigation/index";
import { userCreateSuccess } from "../../store/user/actions";

import LoadingOverlay from "../../components/LoadingOverlay";
import { Header } from "react-navigation";
import { getStatusBarHeight } from "react-native-status-bar-height";
class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordPlaceholder: "Пароль",
      passwordText: "",
      repeatPasswordText: "",
      repeatPasswordPlaceholder: "Повторите пароль",
      phonePlaceholder: "Телефон",
      phoneText: "",
      firstNamePlaceholder: "Имя",
      firstNameText: "",
      lastNamePlaceholder: "Фамилия",
      lastNameText: "",
      isLoading: false,
      logoWidth: new Animated.Value(200),
      logoHeight: new Animated.Value(150)
    };
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  _keyboardDidShow = () => {
    Animated.parallel([
      Animated.timing(this.state.logoHeight, {
        toValue: 40,
        duration: 200
      }),
      Animated.timing(this.state.logoWidth, {
        toValue: 30,
        duration: 200
      })
    ]).start();
  };

  _keyboardDidHide = () => {
    Animated.parallel([
      Animated.timing(this.state.logoHeight, {
        toValue: 150,
        duration: 200
      }),
      Animated.timing(this.state.logoWidth, {
        toValue: 200,
        duration: 200
      })
    ]).start();
  };

  createUser = () => {
    this.setState({ isLoading: true });
    if (
      this.state.firstNameText == "" ||
      this.state.lastNameText == "" ||
      this.state.phoneText == "" ||
      this.state.passwordText == ""
    ) {
      this.setState({ isLoading: false });
      alert("Не все поля заполнены");
      return;
    }
    if (this.state.passwordText != this.state.repeatPasswordText) {
      alert("Пароли не совпадают");
      this.setState({ passwordText: "", repeatPasswordText: "" });
      this.setState({ isLoading: false });
      return;
    }
    const body = {
      firstName: this.state.firstNameText,
      lastName: this.state.lastNameText,
      phoneNumber: this.state.phoneText,
      password: this.state.passwordText
    };
    postRequest("users/signup", body, data => {
      this.props.storeUser({
        // Need to handle error cases from server with code 4xx
        firstName: this.state.firstNameText,
        lastName: this.state.lastNameText,
        phoneNumber: this.state.phoneText,
        id: data[0].id
      });
      this.setState({ isLoading: false });
      navigate(RouteNames.Home);
    });
  };

  render() {
    return (
      <ImageBackground
        style={styles.container}
        imageStyle={styles.background}
        source={Images.background}
      >
        <Animated.Image
          style={[
            {
              width: this.state.logoWidth,
              height: this.state.logoHeight
            },
            styles.logo
          ]}
          source={Images.logo}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 10,
            top: Platform.OS == "ios" ? 50 : 15
          }}
          onPress={() => {
            this.props.navigation.navigate("Login");
          }}
        >
          <Icon type="AntDesign" name="left" />
        </TouchableOpacity>
        <Text>Регистрация</Text>
        <View style={styles.form}>
          <View style={[styles.inputView, styles.shadowView]}>
            {/* <IntlPhoneInput
              containerStyle={styles.input}
              onChangeText={text => this.setState({ phoneText: text })}
              defaultCountry="KZ"
              disableCountryChange="false"
              closeText="Закрыть"
              filterText="Поиск"
            /> */}

            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ phoneText: text })}
              value={this.state.phoneText}
              placeholder={this.state.phonePlaceholder}
              keyboardType={"numeric"}
            />
          </View>
          <View style={[styles.inputView, styles.shadowView]}>
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ firstNameText: text })}
              value={this.state.firstNameText}
              placeholder={this.state.firstNamePlaceholder}
            />
          </View>
          <View style={[styles.inputView, styles.shadowView]}>
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ lastNameText: text })}
              value={this.state.lastNameText}
              placeholder={this.state.lastNamePlaceholder}
            />
          </View>
          <View style={[styles.inputView, styles.shadowView]}>
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ passwordText: text })}
              value={this.state.passwordText}
              placeholder={this.state.passwordPlaceholder}
              secureTextEntry={true}
            />
          </View>
          <View style={[styles.inputView, styles.shadowView]}>
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ repeatPasswordText: text })}
              value={this.state.repeatPasswordText}
              placeholder={this.state.repeatPasswordPlaceholder}
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <View style={styles.line}></View>
        </View>
        <View style={{ width: "100%" }}>
          <TouchableOpacity
            onPress={() => {
              this.createUser();
            }}
          >
            <View
              style={[
                styles.inputView,
                styles.shadowView,
                { marginBottom: 30 }
              ]}
            >
              <Text style={styles.buttonText}>Создать аккаунт</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.state.isLoading && <LoadingOverlay />}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  background: {
    width: "100%",
    height: "100%"
  },
  logo: {
    marginTop: Platform.OS == "ios" && getStatusBarHeight() == 44 ? 30 : 20,
    resizeMode: "contain"
  },
  inputView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    height: 55
  },
  form: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start"
  },
  registerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  input: { flex: 1, marginLeft: 5, height: "100%" },
  line: {
    flex: 1,
    borderColor: "#D7BF76",
    borderWidth: 1,
    height: 1
  },
  buttonText: {
    fontWeight: "bold",
    color: "#D7BF76"
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
  additionalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  shadowView: {
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: {
          width: 0,
          height: 2
        }
      },
      android: {
        elevation: 5
      }
    }),
    borderColor: "#d2d1d150",
    borderWidth: 1,
    backgroundColor: "#FFFFFF"
  }
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    storeUser: userObj => {
      dispatch(userCreateSuccess(userObj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);
