import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { Icon } from "native-base";

import { RouteNames } from "../../navigation/index";
import { navigate } from "../../navigation/NavigationService";

import MasterTypeSmallButton from "../../components/MasterTypeSmallButton";
import { ScrollView } from "react-native-gesture-handler";
import ServiceButton from "../../components/ServiceButton";
import MasterButton from "../../components/MasterButton";

const { width } = Dimensions.get("window");

class ServiceScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          type="AntDesign"
          name="left"
          style={{ margin: 10, fontSize: 25, color: "black" }}
        />
      </TouchableOpacity>
    ),
    headerTitle: <Text style={{ fontSize: 25 }}>Услуги для женщин</Text>
  });

  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.state = {
      loginPlaceholder: "Username",
      usernameText: "",
      passwordPlaceholder: "Password",
      passwordText: ""
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.scrollView.scrollTo({ x: -30 });
    }, 1); // scroll view position fix
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column"
        }}
      >
        <View style={styles.serviceScrollStyle}>
          <ScrollView
            ref={scrollView => {
              this.scrollView = scrollView;
            }}
            horizontal={true}
          >
            <MasterTypeSmallButton
              // style={{ borderColor: "black", borderWidth: 2 }}
              text={"Парикхмахер - стилист"}
              onPress={() => {
                navigate(RouteNames.Service);
              }}
            />
          </ScrollView>
        </View>
        <ScrollView style={styles.serviceScrollStyle}>
          <View style={styles.serviceSelectStyle}>
            <ServiceButton />
          </View>
          <View style={styles.serviceSelectStyle}>
            <MasterButton />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  serviceScrollStyle: {
    height: "20%",
    width: "100%",
    borderColor: "red",
    borderWidth: 1
  },
  masterScrollViewStyle: {},
  mainScrollStyle: {
    flex: 1
    // borderColor: "yellow",
    // borderWidth: 1
  },
  serviceSelectStyle: {
    flex: 1
    // borderColor: "black",
    // borderWidth: 1
  },
  masterSelectStyle: {
    flex: 1,
    borderColor: "green",
    borderWidth: 2
  }
});

const mapStateToProps = state => {
  return {};
};

// const mapDispatchToProps = { increment, decrement, reset };

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(ServiceScreen);
