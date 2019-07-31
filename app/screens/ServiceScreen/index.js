import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "native-base";

import { fetchMasterSuccess } from "../../store/reservation/actions";

import { RouteNames } from "../../navigation/index";
import { navigate } from "../../navigation/NavigationService";

import LoadingOverlay from "../../components/LoadingOverlay";
import { ScrollView } from "react-native-gesture-handler";
import ServiceButton from "../../components/ServiceButton";
import MasterButton from "../../components/MasterButton";

import CustomCalendar from "../../components/Calendar";
import TimeBlock from "../../components/TimeBlock";

const { width } = Dimensions.get("window");

class ServiceScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          type="AntDesign"
          name="left"
          style={{ margin: 10, fontSize: 25, color: "black" }}
        />
      </TouchableOpacity>
    ),
    headerTitle: <Text style={{ fontSize: 25 }}>Услуги для женщин</Text>
  });

  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.state = {
      isCalendarCollapsed: true,
      employees: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/employees/retrieve", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.props.storeMasters(responseJson.rows);
      });
    // setTimeout(() => {
    //   this.scrollView.scrollTo({ x: -30 });
    // }, 1); // scroll view position fix
  }

  toggleCalendar = () => {
    this.setState({
      isCalendarCollapsed: !this.state.isCalendarCollapsed
    });
  };

  renderMasters = () =>
    this.props.masters.map(master => {
      return <MasterButton key={master.id} name={master.name} />;
    });

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column"
        }}
      >
        <ScrollView
          ref={ref => (this.scrollView = ref)}
          style={styles.serviceScrollStyle}
        >
          <View style={styles.serviceSelectStyle}>
            <ServiceButton />
            {this.renderMasters()}
            <CustomCalendar
              isCollapsed={this.state.isCalendarCollapsed}
              toggleCalendar={this.toggleCalendar}
              callBack={() => this.scrollView.scrollToEnd({ animated: true })}
            />
            <TimeBlock />
          </View>
        </ScrollView>
        {this.props.isLoading && <LoadingOverlay />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  serviceScrollStyle: {
    flex: 1,
    height: "15%",
    width: "100%",
    marginBottom: 15
  },
  masterScrollViewStyle: {},
  mainScrollStyle: {
    flex: 1
  },
  serviceSelectStyle: {
    flex: 1
  },
  masterSelectStyle: {
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    masters: state.reservation.masters,
    isLoading: state.reservation.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeMasters: masters => {
      dispatch(fetchMasterSuccess(masters));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceScreen);
