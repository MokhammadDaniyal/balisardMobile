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

import {
  fetchMasterSuccess,
  fetchReservationsSuccess
} from "../../store/reservation/actions";
import { fetchServicesSuccess } from "../../store/services/actions";

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
    const serviceType = this.props.navigation.getParam("type");
    fetch("http://localhost:3000/services/retrieveservices", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: serviceType
      })
    })
      .then(response =>
        response.json().then(responseJson => {
          this.props.storeServices(responseJson.rows);
        })
      )
      .catch(err => alert(err));
    fetch("http://localhost:3000/services/retrievemasters", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: serviceType
      })
    })
      .then(response =>
        response.json().then(responseJson => {
          this.props.storeMasters(responseJson.rows);
        })
      )
      .catch(err => alert(err));
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

  renderServices = () =>
    this.props.services.map(service => {
      return <ServiceButton key={service.id} name={service.name} />;
    });

  selectCalendarDate = day => {
    fetch("http://localhost:3000/reservations/getreservedtimeblocks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: day
      })
    })
      .then(response =>
        response.json().then(responseJson => {
          this.props.storeReservations(responseJson.rows);
        })
      )
      .catch(err => alert(err));
  };

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
            {this.renderServices()}
            {this.renderMasters()}
            <CustomCalendar
              onSelectDay={this.selectCalendarDate}
              isCollapsed={this.state.isCalendarCollapsed}
              toggleCalendar={this.toggleCalendar}
              callBack={() => this.scrollView.scrollToEnd({ animated: true })}
            />
            <TimeBlock reservedTimeBlocks={this.props.reservedTimeBlocks} />
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
  let timeBlocks = state.reservations.reservations.map(
    ({ time_block }) => time_block
  );
  return {
    reservedTimeBlocks: timeBlocks,
    reservations: state.reservations.reservations,
    masters: state.reservations.masters,
    services: state.services.services,
    isLoading: state.services.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeMasters: masters => {
      dispatch(fetchMasterSuccess(masters));
    },
    storeServices: services => {
      dispatch(fetchServicesSuccess(services));
    },
    storeReservations: reservations => {
      dispatch(fetchReservationsSuccess(reservations));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceScreen);
