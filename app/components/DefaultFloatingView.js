import React, { Component } from "react";

import { View, Text, StyleSheet, Platform } from "react-native";

const DefaultFloatingBar = props => {
  return (
    <View style={styles.container}>
      <View style={styles.leftView} />
      <View style={styles.mainView}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: 20,
            color: "#282828"
          }}
        >
          {props.title}
        </Text>
        <Text style={{ marginLeft: 20, color: "#282828" }}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    height: 55,
    marginHorizontal: 15,
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
  mainView: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  }
});
export default DefaultFloatingBar;
