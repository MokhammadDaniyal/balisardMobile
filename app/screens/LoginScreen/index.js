import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import Images from "./images";
import { RouteNames } from "../../navigation/index";
import { navigate } from "../../navigation/NavigationService";
import LoadingOverlay from "../../components/LoadingOverlay";
import { userCreateSuccess } from "../../store/user/actions";
import FloatingBar from "../../components/FloatingBar";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.state = {
      loginPlaceholder: "Телефон",
      phoneText: "",
      passwordPlaceholder: "Пароль",
      passwordText: "",
      isLoading: false
    };
  }

  loginUser = () => {
    if (this.state.phoneText == "" || this.state.passwordText == "") {
      alert("Не все поля заполнены для входаю");
      return;
    }
    this.setState({ isLoading: true });
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone: this.state.phoneText,
        password: this.state.passwordText
      })
    })
      .then(response => {
        if (response.status == 401) {
          this.setState({ isLoading: false, passwordText: "" });
          alert("Не правильный пароль");
        } else {
          response.json().then(responseJson => {
            this.props.storeUser({
              firstName: responseJson.rows[0].firstname,
              lastName: responseJson.rows[0].lastname,
              phoneNumber: responseJson.rows[0].phonenumber,
              id: responseJson.rows[0].id
            });
            navigate(RouteNames.Home);
          });
        }
      })
      .catch(err => alert(err));
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
          <View style={styles.loginContainer}>
            <Image source={Images.logo} style={styles.logo} />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.loginInput}
                onChangeText={text => this.setState({ phoneText: text })}
                value={this.state.phoneText}
                placeholder={this.state.loginPlaceholder}
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
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                this.loginUser();
              }}
            >
              <View style={styles.buttonContainer}>
                <Text>Войти</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.additionalButtons}>
              <TouchableOpacity
                onPress={() => {
                  navigate(RouteNames.Registration);
                }}
              >
                <Text>Создать Аккаунт </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text> Забыли пароль</Text>
              </TouchableOpacity>
            </View>
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
)(LoginScreen);
