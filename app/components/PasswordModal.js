import React from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text
} from "react-native";
import Modal from "react-native-modal";

export default PasswordModal = props => {
  let password = "";
  let confirmPassword = "";
  let confirmPasswordRef = "";

  return (
    <View>
      <Modal
        isVisible={props.isVisible}
        onBackButtonPress={props.closeModal}
        onBackdropPress={props.closeModal}
        backdropTransitionOutTiming={0}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalBody}>
            Пожалуйста создайте пароль для этого аккаунта перед тем как
            отключить авторизацию через инстаграм.
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.modalTextInput}
              placeholder="Пароль"
              onChangeText={text => {
                password = text;
              }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              ref={input => {
                confirmPasswordRef = input;
              }}
              style={styles.modalTextInput}
              placeholder="Подтвердите Пароль"
              onChangeText={text => {
                confirmPassword = text;
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              password.trim();
              confirmPassword.trim();
              if (password === confirmPassword) {
                if (password === "" || confirmPassword === "") {
                  alert("Не все поля заполнены");
                } else {
                  props.submitPassword(password);
                }
              } else {
                alert("Пароли не совпадают");
                confirmPasswordRef.clear();
              }
            }}
          >
            <Text style={styles.modalBody}>Создать</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 0,
    borderRadius: 15,
    backgroundColor: "white",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "column"
  },
  modalBody: {
    margin: 10,
    fontSize: 15,
    textAlign: "center"
  },
  modalTextInput: {
    height: 40,
    width: "90%",
    marginBottom: 10,
    borderColor: "#D7BF76",
    borderWidth: 1,
    borderRadius: 10
  }
});
