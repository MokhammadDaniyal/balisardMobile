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
import moment from "moment";

import { postRequest } from "../../network/index";
import { RouteNames } from "../../navigation/index";

import { getRecordHistorySuccess } from "../../store/user/actions";
import { navigate } from "../../navigation/NavigationService";
import LoadingOverlay from "../../components/LoadingOverlay";
import FloatingBar from "../../components/FloatingBar";

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: (
        <Text style={{ fontSize: 25 }}>{params ? params.title : ""}</Text>
      )
    };
  };
  constructor(props) {
    super(props);
    props.navigation.setParams({
      title: props.user.firstName + " " + props.user.lastName
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
            <TouchableOpacity style={styles.linkButton}>
              <Image
                source={require("./images/instagramIcon.png")}
                style={styles.icon}
              />
              <Text>Добавить!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton}>
              <Image
                source={require("./images/facebookIcon.png")}
                style={styles.icon}
              />
              <Text>Добавить!</Text>
            </TouchableOpacity>
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
  return {
    user: state.user.userData,
    records: state.user.userData.recordHistory
  };
};
const mapDispatchToProps = dispatch => {
  return {
    storeRecordHistory: records => {
      dispatch(getRecordHistorySuccess({ recordHistory: records }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
