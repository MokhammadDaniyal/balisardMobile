import React, { Component } from "react";

import { createDrawerNavigator, createStackNavigator } from "react-navigation";

import Routes from "../navigation/routes";
import { View, Text } from "react-native";

import { Icon } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
export default (setStackNavigator = mainRoute => {
  return createStackNavigator(
    { ...mainRoute, ...Routes },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        headerLeft: (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Icon
              type="AntDesign"
              name="menuunfold"
              style={{ margin: 10, fontSize: 25, color: "black" }}
            />
          </TouchableOpacity>
        ),
        headerTitle: (
          <Text
            style={{
              fontSize: 35,
              letterSpacing: -4,
              textAlign: "center",
              flex: 1
            }}
          >
            Balisard
          </Text>
        ),
        headerRight: (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon
              type="AntDesign"
              name="user"
              style={{ margin: 10, fontSize: 25, color: "black" }}
            />
          </TouchableOpacity>
        )
      }),
      transitionConfig: () => ({
        screenInterpolator: sceneProps => {
          const { layout, position, scene } = sceneProps;
          const { index } = scene;

          const translateX = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [layout.initWidth, 0, 0]
          });

          const opacity = position.interpolate({
            inputRange: [
              index - 1,
              index - 0.99,
              index,
              index + 0.99,
              index + 1
            ],
            outputRange: [0, 1, 1, 0.3, 0]
          });

          return { opacity, transform: [{ translateX }] };
        }
      })
    }
  );
});
