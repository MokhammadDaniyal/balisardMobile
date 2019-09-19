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
  ScrollView
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
        console.log(JSON.stringify(data));
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
      return this.props.records.pastRecords.map(record => {
        return <FloatingBar isGrey={true} data={record} />;
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
              this.props.IgLogout();
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
        <View style={styles.infoContainer}>
          <Image
            source={require("../../components/images/dushanova.jpg")}
            style={styles.profileImage}
          />
          <View style={styles.infoBlock}>
            <View style={styles.linkButton}>
              <Image
                source={require("./images/phoneImg.png")}
                style={styles.icon}
              />
              <Text>{this.props.user.phoneNumber}</Text>
            </View>
            {this.renderLinkButton()}
          </View>
        </View>
        <ScrollView>
          <View style={styles.currentRecord}>
            <Text>Текущая запись</Text>
            {this.rednerFutureRecords()}
          </View>
          <View style={styles.pastRecord}>
            <Text>История</Text>
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
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  infoContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
