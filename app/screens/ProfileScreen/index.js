import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "native-base";

import { postRequest, postRequestResponse } from "../../network/index";
import { RouteNames } from "../../navigation/index";
import { storeIgData, clearIgData } from "../../store/user/actions";
import { getRecordHistorySuccess } from "../../store/user/actions";
import LoadingOverlay from "../../components/LoadingOverlay";
import FloatingBar from "../../components/FloatingBar";
import IgLogin, { igLogout } from "../../components/IgLogin";
import PasswordModal from "../../components/PasswordModal";
import { Header } from "react-navigation";

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: (
        <Text style={{ fontSize: 15 }}>{params ? params.title : ""}</Text>
      ),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrowleft"
            type="AntDesign"
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      showPasswordModal: false
    };
    let title = this.props.igData
      ? this.props.igData.full_name
      : props.user.firstName + " " + props.user.lastName;
    props.navigation.setParams({
      title: title
    });
  }

  componentDidMount() {
    postRequest(
      "reservations/getrecordhistory",
      { userId: this.props.user.id },
      data => {
        this.props.storeRecordHistory(data);
      }
    );
  }

  rednerFutureRecords = () => {
    if (
      this.props.records.futureRecords &&
      this.props.records.futureRecords.length > 0
    ) {
      return this.props.records.futureRecords.map(record => {
        return <FloatingBar isGrey={false} data={record} />;
      });
    } else {
      return (
        <View style={styles.noRecord}>
          <Image
            style={styles.noRecordImg}
            source={require("./images/noRecords.png")}
          />
          <Text style={styles.noRecordText}>У вас нет текущих записей</Text>
        </View>
      );
    }
  };

  rednerPastRecords = () => {
    if (
      this.props.records.pastRecords &&
      this.props.records.pastRecords.length > 0
    ) {
      return this.props.records.pastRecords.reverse().map((record, index) => {
        if (index < 15) {
          return <FloatingBar isGrey={true} data={record} />;
        } else {
          return;
        }
      });
    } else {
      return (
        <View style={styles.noRecord}>
          <Image
            style={styles.noRecordImg}
            source={require("./images/noRecords.png")}
          />
          <Text style={styles.noRecordText}>История записей отсутствует</Text>
        </View>
      );
    }
  };

  geIgData = token => {
    this.setState({ isLoading: true });
    fetch("https://api.instagram.com/v1/users/self/?access_token=" + token, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        postRequestResponse(
          "users/linkinstagram",
          {
            phoneNumber: this.props.user.phoneNumber,
            username: responseJson.data.username
          },
          linkResponse => {
            if (linkResponse.status == 200) {
              this.props.IgDataSuccess(responseJson);
            } else {
              if (linkResponse.status == 409) {
                linkResponse.json().then(linkResponseJson => {
                  alert(linkResponseJson.message);
                });
              }
            }
            this.setState({ isLoading: false });
          }
        );
      });
  };

  unlinkIg = () => {
    this.setState({ isLoading: true });
    postRequestResponse(
      "users/checkpassword",
      { phoneNumber: this.props.user.phoneNumber },
      response => {
        if (response.status == 200) {
          postRequestResponse(
            "users/unlinkinstagram",
            {
              username: this.props.igData.username
            },
            unlinkResponse => {
              if (unlinkResponse.status == 200) {
                this.props.IgLogout();
                this.setState({ isLoading: false });
              } else {
                if (unlinkResponse.status == 400) {
                  unlinkResponse.json().then(unlinkResponseJson => {
                    alert(unlinkResponseJson.message);
                  });
                }
              }
            }
          );
        } else {
          if (response.status == 401) {
            this.setState({ showPasswordModal: true, isLoading: false });
          }
        }
      }
    );
  };

  submitPassword = password => {
    this.setState({ isLoading: true, showPasswordModal: false });
    postRequestResponse(
      "users/setpassword",
      {
        phoneNumber: this.props.user.phoneNumber,
        password: password
      },
      response => {
        if (response.status == 200) {
          this.unlinkIg();
        }
      }
    );
  };

  renderLinkButton = () => {
    if (this.props.igData) {
      return (
        <View style={styles.linkButton}>
          <Image
            source={require("./images/instagramIcon.png")}
            style={styles.icon}
          />
          <Text>{this.props.igData.username}</Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({ isLoading: true });
              this.unlinkIg(() => {
                this.setState({ isLoading: false });
              });
            }}
          >
            <Image
              style={[styles.icon, { marginLeft: 10 }]}
              source={require("./images/unlink.png")}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <IgLogin
          igTokenSuccess={this.geIgData}
          child={
            <View style={styles.linkButton}>
              <Image
                source={require("./images/instagramIcon.png")}
                style={styles.icon}
              />
              <Text>Добавить!</Text>
            </View>
          }
        ></IgLogin>
      );
    }
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading && <LoadingOverlay />}
        <View style={styles.infoContainer}>
          {/* <Image
            source={require("../../components/images/dushanova.jpg")}
            style={styles.profileImage}
          /> */}
          <View style={styles.infoBlock}>
            <View style={styles.linkButton}>
              <Image
                source={require("./images/phoneImg.png")}
                style={styles.icon}
              />
              <Text>{this.props.user.phoneNumber}</Text>
            </View>
            {this.renderLinkButton()}
            <PasswordModal
              isVisible={this.state.showPasswordModal}
              closeModal={() => this.setState({ showPasswordModal: false })}
              submitPassword={this.submitPassword}
            />
          </View>
        </View>
        <ScrollView>
          <View style={styles.currentRecord}>
            <Text>Текущая запись</Text>
            {this.rednerFutureRecords()}
          </View>
          <View style={styles.pastRecord}>
            <Text>История (Последние 15 записей)</Text>
            {this.rednerPastRecords()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Header.HEIGHT + (Platform.OS == "ios" ? 35 : 0),
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  infoContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 15
  },
  profileImage: {
    resizeMode: "contain",
    borderRadius: 100,
    width: 100,
    height: 100,
    marginHorizontal: 15
  },
  infoBlock: {
    flex: 0,
    flexDirection: "column",
    justifyContent: "space-between",
    height: 70
  },
  linkButton: { flexDirection: "row", alignItems: "center" },
  icon: {
    width: 25,
    height: 25,
    marginRight: 5
  },
  currentRecord: {
    marginHorizontal: 15,
    flex: 0
  },
  pastRecord: {
    flex: 1,
    marginHorizontal: 15
  },
  noRecord: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    marginVertical: 15
  },
  noRecordImg: {
    width: 75,
    height: 75
  },
  noRecordText: {
    marginTop: 10,
    fontSize: 12,
    color: "#9B9B9B"
  }
});

const mapStateToProps = state => {
  igData = state.user.igData ? state.user.igData.data : null;
  return {
    user: state.user,
    records: state.user.recordHistory,
    igData: igData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    storeRecordHistory: records => {
      dispatch(getRecordHistorySuccess({ recordHistory: records }));
    },
    IgDataSuccess: data => {
      return dispatch(storeIgData(data));
    },
    IgLogout: () => {
      return dispatch(clearIgData());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
