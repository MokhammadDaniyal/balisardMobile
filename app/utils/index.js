import React from "react";
import { Linking, Platform } from "react-native";

export const openInstagram = () => {
  const url = (Platform.OS = "ios"
    ? "instagram://user?username=balisard"
    : "intent://instagram.com/_u/balisard/#Intent;package=com.instagram.android;scheme=https;end");
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        alert("Приложение инстаграм не установлено");
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => alert(err + "Произошла ошибка"));
};

export const openWeb = () => {
  Linking.openURL("http://balisard.kz");
};
export const openFacebook = () => {
  Linking.canOpenURL("fb://profile/balisard").then(supported => {
    if (supported) {
      return Linking.openURL("fb://profile/balisard");
    } else {
      return Linking.openURL("https://www.facebook.com/balisard");
    }
  });
};
