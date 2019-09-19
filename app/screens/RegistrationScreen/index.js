import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { postRequest } from "../../network/";
import LinearGradient from "react-native-linear-gradient";
import { navigate } from "../../navigation/NavigationService";
import { RouteNames } from "../../navigation/index";
import { userCreateSuccess } from "../../store/user/actions";

import LoadingOverlay from "../../components/LoadingOverlay";
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
      isLoading: false
    };
  }

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
      <LinearGradient
        colors={["#000000", "#808080"]}
        style={styles.container}
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 0.8, y: 0.8 }}
      >
        <KeyboardAvoidingView behavior="position" enabled>
          <View style={styles.registerContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ phoneText: text })}
                value={this.state.phoneText}
                placeholder={this.state.phonePlaceholder}
                placeholderTextColor="#ffffff"
                keyboardType={"numeric"}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ firstNameText: text })}
                value={this.state.firstNameText}
                placeholder={this.state.firstNamePlaceholder}
                placeholderTextColor="#ffffff"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ lastNameText: text })}
                value={this.state.lastNameText}
                placeholder={this.state.lastNamePlaceholder}
                placeholderTextColor="#ffffff"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.passwordInput}
                onChangeText={text => this.setState({ passwordText: text })}
                value={this.state.passwordText}
                placeholder={this.state.passwordPlaceholder}
                placeholderTextColor="#ffffff"
                secureTextEntry={true}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.passwordInput}
                onChangeText={text =>
                  this.setState({ repeatPasswordText: text })
                }
                value={this.state.repeatPasswordText}
                placeholder={this.state.repeatPasswordPlaceholder}
                placeholderTextColor="#ffffff"
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.createUser();
              }}
            >
              <View style={styles.buttonContainer}>
                <Text>Создать аккаунт</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        {this.state.isLoading && <LoadingOverlay />}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  registerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
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

const mapDispatchToProps = dispatch => {
  return {
    storeUser: userObj => {
      dispatch(userCreateSuccess(userObj));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationScreen);
