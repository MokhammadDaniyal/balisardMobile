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
  Keyboard,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "native-base";
import { postRequestResponse } from "../../network/";
import Images from "./images";
import { RouteNames } from "../../navigation/index";
import { navigate } from "../../navigation/NavigationService";
import LoadingOverlay from "../../components/LoadingOverlay";
import {
  userCreateSuccess,
  storeIgToken,
  storeIgData
} from "../../store/user/actions";
import IgLogin, { igLogout } from "../../components/IgLogin";
import SplashScreen from "../SplashScreen";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.state = {
      loginPlaceholder: "Номер Телефона",
      phoneText: "",
      passwordPlaceholder: "Пароль",
      passwordText: "",
      igToken: "",
      isLoading: false
    };
  }

  loginUser = () => {
    if (this.state.phoneText == "" || this.state.passwordText == "") {
      alert("Не все поля заполнены для входаю");
      return;
    }
    this.setState({ isLoading: true });
    postRequestResponse(
      "users/login",
      {
        phone: this.state.phoneText,
        password: this.state.passwordText
      },
      response => {
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
      }
    );
  };

  componentWillReceiveProps(props) {}
  geIgData = token => {
    this.setState({ isLoading: true });
    fetch("https://api.instagram.com/v1/users/self/?access_token=" + token, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        this.props.IgDataSuccess(responseJson);
        this.setState({ isLoading: false });
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.background} source={Images.background} />
        <Image source={Images.logo} style={styles.logo} />
        <View style={styles.separator}>
          <Text>Войти в профиль</Text>
        </View>
        <View style={[styles.form]}>
          <View style={[styles.inputView, styles.shadowView]}>
            <TextInput
              style={{ flex: 1, marginLeft: 5, height: "100%" }}
              onChangeText={text => this.setState({ phoneText: text })}
              value={this.state.phoneText}
              placeholder={this.state.loginPlaceholder}
            />
            <Icon
              type="AntDesign"
              name="user"
              style={{
                margin: 10,
                fontSize: 25,
                color: "#D7BF76",
                fontWeight: "bold"
              }}
            />
          </View>
          <View style={[styles.inputView, styles.shadowView]}>
            <TextInput
              style={{ flex: 1, marginLeft: 5, height: "100%" }}
              onChangeText={text => this.setState({ passwordText: text })}
              value={this.state.passwordText}
              placeholder={this.state.passwordPlaceholder}
              secureTextEntry={true}
            />
            <Icon
              type="FontAwesome"
              name="lock"
              style={{
                margin: 10,
                fontSize: 25,
                color: "#D7BF76",
                fontWeight: "bold"
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              this.loginUser();
            }}
          >
            <View style={[styles.inputView, styles.shadowView]}>
              <Text style={styles.buttonText}>Вход</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0,
              flexDirection: "row-reverse",
              margin: 15
            }}
          >
            <Text>Забыли пароль?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator}>
          <View style={styles.line}></View>
          <Text>Войти с помошью</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.separator}>
          <IgLogin
            igTokenSuccess={this.geIgData}
            child={
              <View style={[styles.inputView, styles.shadowView]}>
                <Image source={Images.igLogin} style={styles.imageLogin} />
              </View>
            }
          ></IgLogin>
          <TouchableOpacity onPress={() => igLogout()}>
            <View style={[styles.inputView, styles.shadowView]}>
              <Image source={Images.igLogin} style={styles.imageLogin} />
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <View style={[styles.inputView, styles.shadowView]}>
              <Image source={Images.fbLogin} style={styles.imageLogin} />
            </View>
          </TouchableOpacity> */}
        </View>
        <View style={styles.separator}>
          <View style={styles.line}></View>
        </View>
        <View style={[styles.separator, { marginBottom: 30 }]}>
          <Text>Еще нет аккаунта? </Text>
          <TouchableOpacity
            onPress={() => {
              navigate(RouteNames.Registration);
            }}
          >
            <Text style={{ color: "#D7BF76", fontWeight: "bold" }}>
              Зарегестрируйтесь
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.isLoading && <LoadingOverlay />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  form: {
    flex: 0,
    width: "100%"
  },
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
    left: 0,
    top: 0
  },
  loginContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1
  },
  inputView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    height: 55
  },
  separator: {
    flexDirection: "row",
    flex: 0,
    alignItems: "center",
    margin: 10
  },
  line: {
    flex: 1,
    borderColor: "#D7BF76",
    borderWidth: 1,
    height: 1
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#e0e0eb10",
    justifyContent: "center",
    height: 50,
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 15,
    borderColor: "green",
    borderWidth: 1
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#e0e0eb10",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 15,
    borderColor: "green",
    borderWidth: 1
  },
  buttonText: {
    fontWeight: "bold",
    color: "#D7BF76"
  },
  logo: {
    width: 200,
    height: 150,
    marginTop: 50,
    resizeMode: "contain"
  },
  imageLogin: {
    marginHorizontal: 10,
    marginVertical: 30,
    resizeMode: "contain"
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
  return {
    isRehydrated: state.user.rehydrated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeUser: userObj => {
      dispatch(userCreateSuccess(userObj));
    },
    igTokenSuccess: token => {
      return dispatch(storeIgToken({ igToken: token }));
    },
    IgDataSuccess: data => {
      return dispatch(storeIgData(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
