import { StyleSheet, Platform } from "react-native";
export default defaultStyles = StyleSheet.create({
  shadowView: {
    borderRadius: 10,
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
  }
});
