import React from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text
} from "react-native";
import Modal from "react-native-modal";

export default PhoneNumberModal = props => {
  let phoneNumber = null;
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
            Пожалуйста, введите свой номер телефона для создания записей
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.modalTextInput}
              keyboardType={"phone-pad"}
              maxLength={12}
              onChangeText={text => {
                phoneNumber = text;
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              props.submitPhoneNumber(phoneNumber);
            }}
          >
            <Text style={styles.modalBody}>Войти</Text>
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
    fontSize: 15
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
