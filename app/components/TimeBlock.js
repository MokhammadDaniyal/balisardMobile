import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text
} from "react-native";

import moment from "moment";

class TimeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.timeSlots = [];
    this.state = {
      selectedTimeSlot: -1
    };
    this.constructTimeSlots();
  }

  constructTimeSlots = () => {
    var startTime = moment()
      .utc()
      .set({ hour: "8", minute: "00" });
    var endTime = moment()
      .utc()
      .set({ hour: "20", minute: "59" });
    while (startTime <= endTime) {
      this.timeSlots.push(new moment(startTime).format("HH:mm"));
      startTime.add(30, "minutes");
    }
  };

  renderTimeSlots = (startIndex, endIndex) => {
    return this.timeSlots
      .filter((_, index) => {
        return index >= startIndex && index < endIndex;
      })
      .map((time, index) => {
        const selectedStyle =
          index + startIndex == this.state.selectedTimeSlot
            ? { backgroundColor: "#D7BF76" }
            : { backgroundColor: "#FFFFFF" };
        const selectedTextStyle =
          index + startIndex == this.state.selectedTimeSlot
            ? { color: "#FFFFFF" }
            : { color: "#000000" };
        return (
          <TouchableOpacity
            key={index}
            style={[styles.button, selectedStyle]}
            onPress={() =>
              this.setState({ selectedTimeSlot: index + startIndex })
            }
          >
            <Text style={selectedTextStyle}>{time}</Text>
          </TouchableOpacity>
        );
      });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>Утро</Text>
        <View style={styles.container}>
          <View style={styles.verticalContainer}>
            <View style={styles.horizontalContainer}>
              {this.renderTimeSlots(0, 4)}
            </View>
            <View style={styles.horizontalContainer}>
              {this.renderTimeSlots(4, 8)}
            </View>
          </View>
        </View>
        <Text>День</Text>

        <View style={styles.container}>
          <View style={styles.verticalContainer}>
            <View style={styles.horizontalContainer}>
              {this.renderTimeSlots(8, 12)}
            </View>
            <View style={styles.horizontalContainer}>
              {this.renderTimeSlots(12, 16)}
            </View>
          </View>
        </View>
        <Text>Вечер</Text>

        <View style={styles.container}>
          <View style={styles.verticalContainer}>
            <View style={styles.horizontalContainer}>
              {this.renderTimeSlots(16, 20)}
            </View>
            <View style={styles.horizontalContainer}>
              {this.renderTimeSlots(20, 24)}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 15
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
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
  verticalContainer: {
    flex: 1,
    flexDirection: "column"
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 74,
    height: 32,
    borderRadius: 5,
    backgroundColor: "#FFFFFF"
  }
});

export default TimeBlock;
