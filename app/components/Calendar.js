import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text
} from "react-native";

import { Icon } from "native-base";
import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";
import Collapsible from "react-native-collapsible";
import moment from "moment";

const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Мая",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];
const monthNamesShort = [
  "Янв.",
  "Февр.",
  "Март",
  "Апр.",
  "Май",
  "Июнь",
  "Июль",
  "Авг.",
  "Сент.",
  "Окт.",
  "Нояб.",
  "Дек."
];
const dayNames = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота"
];
const dayNamesShort = ["Вс.", "Пн.", "Вт.", "Ср.", "Чт.", "Пн.", "Сб."];

LocaleConfig.locales["ru"] = {
  monthNames: monthNames,
  monthNamesShort: monthNamesShort,
  dayNames: dayNames,
  dayNamesShort: dayNamesShort,
  today: "Сегодня"
};
LocaleConfig.defaultLocale = "ru";

const selectedDateStyle = {
  customStyles: {
    container: {
      backgroundColor: "#D7BF76"
    },
    text: {
      color: "#FFFF",
      fontWeight: "bold"
    }
  }
};

class CustomCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.today = new Date();

    this.state = {
      selectedDate: moment().format("YYYY-MM-DD"),
      titleDay: dayNames[this.today.getDay()],
      titleMonth: monthNames[this.today.getMonth()],
      titleDate: this.today.getDate()
    };
  }

  findDayName = index => {
    return dayNames[(index - 1) % dayNames.length];
  };

  render() {
    return (
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={this.props.toggleCalendar}
        >
          <Text style={{ fontSize: 15 }}>
            {this.state.titleDate +
              " " +
              this.state.titleMonth +
              ", " +
              this.state.titleDay}
          </Text>
          <Icon style={styles.downArrow} name="down" type="AntDesign" />
        </TouchableOpacity>
        <Collapsible
          collapsed={this.props.isCollapsed}
          style={{ flex: 1 }}
          onAnimationEnd={this.props.callBack}
        >
          <Calendar
            onDayPress={day => {
              this.setState({
                selectedDate: { [day.dateString]: selectedDateStyle },
                titleMonth: monthNames[day.month - 1],
                titleDate: day.day,
                titleDay: dayNames[moment(day.dateString).format("d")]
              });
              this.props.onSelectDay(day.dateString);
            }}
            monthFormat={"MMMM yyyy"}
            minDate={Date()}
            hideExtraDays={true}
            firstDay={1}
            style={{ margin: 1 }}
            markingType={"custom"}
            markedDates={{
              ...this.state.selectedDate,
              selected: true,
              marked: true
            }}
            theme={{
              arrowColor: "#D7BF76",
              //   "stylesheet.calendar.header": {
              //     header: {
              //         height: 0,
              //         opacity: 0
              //     }
              //   }
              todayTextColor: "#D7BF76"
            }}
          />
        </Collapsible>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 10,
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
  },
  downArrow: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D7BF76",
    marginLeft: 5
  },
  toggleButton: {
    margin: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
export default CustomCalendar;
