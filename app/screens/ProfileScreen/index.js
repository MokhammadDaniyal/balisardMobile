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
  constructor(props) {
    super(props);
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

  rednerFutureRecords = () =>
    this.props.records.futureRecords.map(record => {
      return <FloatingBar isGrey={false} data={record} />;
    });

  rednerPastRecords = () =>
    this.props.records.pastRecords.map(record => {
      return <FloatingBar isGrey={true} data={record} />;
    });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Image
            source={require("../../components/images/dushanova.jpg")}
            style={styles.profileImage}
          />
          <View style={styles.infoBlock}>
            <Text>{this.props.userPhone}</Text>
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
            <Text>Текущиая запись</Text>
            {this.rednerFutureRecords()}
          </View>
          <View style={styles.historyRecord}>
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
    alignItems: "center"
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
  historyRecord: {
    flex: 1,
    marginHorizontal: 15
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
