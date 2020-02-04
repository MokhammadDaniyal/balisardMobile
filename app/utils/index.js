import React from "react";
import { Linking, Platform } from "react-native";
import RNFS, { DocumentDirectoryPath } from "react-native-fs";

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

/* Taken from react-native-cachable-image library*/
export const donwloadAndCacheImage = (imageUri, cachePath, cacheKey) => {
  const dirPath = DocumentDirectoryPath + "/" + cachePath;
  const filePath = dirPath + "/" + cacheKey;
  console.log(filePath);
  RNFS.mkdir(dirPath, { NSURLIsExcludedFromBackupKey: true })
    .then(() => {
      // before we change the cachedImagePath.. if the previous cachedImagePath was set.. remove it
      // let delImagePath = filePath;
      // RNFS.exists(delImagePath).then(res => {
      //   if (res) {
      //     console.log(res);
      //     RNFS.unlink(delImagePath).catch(err => {});
      //   }
      // });

      let downloadOptions = {
        fromUrl: imageUri,
        toFile: filePath,
        background: Platform.OS === "ios" ? false : true
      };

      // directory exists.. begin download
      let download = RNFS.downloadFile(downloadOptions);
      download.promise
        .then(res => {
          console.log(res.jobId + "_____" + res.statusCode);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};
