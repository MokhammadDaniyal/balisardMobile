import React, { Component } from "react";

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Platform
} from "react-native";

import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

import { timeSlots } from "./defaultData/";

const FloatingBar = props => {
  const { date, time_block, name, title, duration_m, duration_h } = props.data;
  const dateString = moment(date).format("dddd,  DD MMMM, YYYY") + " в ";
  return (
    <View style={styles.buttonView}>
      <View style={props.isGrey ? styles.leftViewGrey : styles.leftView} />
      <View style={styles.mainView}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>{dateString}</Text>
          <Text style={[styles.title, { fontWeight: "bold" }]}>
            {timeSlots[time_block]}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <View
            style={{
              flexDirection: "column"
            }}
          >
            <Text>{title}</Text>
            <Text>
              {duration_h} час {duration_m} минут
            </Text>
          </View>
          <Image
            source={require("./images/dushanova.jpg")}
            style={styles.masterImage}
          />
          <Text style={styles.masterText}>{name}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonView: {
    flex: 0,
    justifyContent: "flex-start",
    flexDirection: "row",
    // height: 55,
    // marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
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
  },
  leftView: {
    position: "absolute",
    left: -1,
    width: 10,
    height: "101%",
    backgroundColor: "#D7BF76",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  leftViewGrey: {
    position: "absolute",
    left: 0,
    width: 10,
    height: "100%",
    backgroundColor: "#808080",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  mainView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginLeft: 20,
    paddingRight: 5
  },
  title: {
    marginBottom: 5
  },
  masterImage: {
    resizeMode: "cover",
    borderRadius: 44,
    width: 44,
    height: 44,
    marginLeft: 10,
    marginBottom: 5
  },
  masterText: {
    flexShrink: 1,
    marginLeft: 5
  }
});
export default FloatingBar;
