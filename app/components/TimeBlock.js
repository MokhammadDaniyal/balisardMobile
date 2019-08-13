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
      .set({ hour: "9", minute: "00" });
    var endTime = moment()
      .utc()
      .set({ hour: "21", minute: "59" });
    while (startTime <= endTime) {
      this.timeSlots.push(new moment(startTime).format("HH:mm"));
      startTime.add(30, "minutes");
    }
  };

  renderTimeSlots = (startIndex, endIndex) => {
    let disabledTimeBlocks = new Set();
    const selectedServiceLength =
      2 * this.props.selectedService.duration_h +
      this.props.selectedService.duration_m / 30;
    this.props.reservedTimeBlocks.sort();
    let length = this.props.reservedTimeBlocks.length;
    for (let j = 0; j < length; j++) {
      disabledTimeBlocks.add(this.props.reservedTimeBlocks[j]);
      for (let i = 1; i < selectedServiceLength; i++) {
        disabledTimeBlocks.add(this.props.reservedTimeBlocks[j] - i);
      }
    }
    return this.timeSlots
      .filter((_, index) => {
        return index >= startIndex && index < endIndex;
      })
      .map((time, index) => {
        const isDisabled = disabledTimeBlocks.has(index + startIndex);
        const selectedStyle =
          index + startIndex == this.state.selectedTimeSlot
            ? { backgroundColor: "#D7BF76" }
            : isDisabled
            ? { backgroundColor: "#C0C0C0", opacity: 0.2 }
            : { backgroundColor: "#FFFFFF" };
        const selectedTextStyle =
          index + startIndex == this.state.selectedTimeSlot
            ? { color: "#FFFFFF" }
            : { color: "#000000" };
        return (
          <TouchableOpacity
            disabled={isDisabled}
            key={index}
            style={[styles.button, selectedStyle]}
            onPress={() => {
              this.setState({ selectedTimeSlot: index + startIndex });
              this.props.onPress(index + startIndex);
            }}
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
