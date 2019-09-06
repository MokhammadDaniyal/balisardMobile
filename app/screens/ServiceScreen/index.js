import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "native-base";
import Modal from "react-native-modal";
import {
  fetchMasterSuccess,
  fetchReservationsSuccess
} from "../../store/reservation/actions";
import { postRequest } from "../../network/";
import { fetchServicesSuccess } from "../../store/services/actions";

import moment from "moment";

import LoadingOverlay from "../../components/LoadingOverlay";
import { ScrollView } from "react-native-gesture-handler";
import ServiceButton from "../../components/ServiceButton";
import MasterButton from "../../components/MasterButton";
import { navigate } from "../../navigation/NavigationService";
import { RouteNames } from "../../navigation/index";

import CustomCalendar from "../../components/Calendar";
import TimeBlock from "../../components/TimeBlock";
import ConfirmationOverlay from "../../components/ConfirmationOverlay";

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
      employees: [],
      selectedMaster: null,
      selectedService: null,
      selectedTimeblock: null,
      selectedDate: moment().format("YYYY-MM-DD"),
      isSubmitting: false,
      showConnfirmation: false,
      modalVisible: false
    };
  }

  componentDidMount() {
    const serviceType = this.props.navigation.getParam("type");
    postRequest(
      "services/retrieveservices",
      {
        type: serviceType
      },
      this.props.storeServices
    );

    postRequest(
      "services/retrievemasters",
      {
        type: serviceType
      },
      this.props.storeMasters
    );
    this.requestReservedTimeBlocks();
    // this.toggleCalendar();
  }

  toggleCalendar = () => {
    this.setState({
      isCalendarCollapsed: !this.state.isCalendarCollapsed
    });
  };

  renderMasters = () =>
    this.props.masters
      .filter(master => {
        return (
          this.state.selectedMaster == null ||
          master.id == this.state.selectedMaster
        );
      })
      .map(master => {
        return (
          <MasterButton
            ref={ref => {
              this.masterPlus = ref;
            }}
            key={master.id}
            name={master.name}
            onPress={() => {
              this.setState({ selectedMaster: master.id }, () => {
                this.requestReservedTimeBlocks();
              });
            }}
            showPlus={!this.state.selectedMaster}
          />
        );
      });

  renderServices = () =>
    this.props.services
      .filter(service => {
        return (
          this.state.selectedService == null ||
          service.id == this.state.selectedService.id
        );
      })
      .map(service => {
        return (
          <ServiceButton
            ref={ref => {
              this.servicePlus = ref;
            }}
            key={service.id}
            name={service.title}
            duration_h={service.duration_h}
            duration_m={service.duration_m}
            onPress={() =>
              this.setState({ selectedService: service }, () => {
                this.requestReservedTimeBlocks();
              })
            }
            onInfo={this.showModal}
            showPlus={!this.state.selectedService}
          />
        );
      });

  selectCalendarDate = date => {
    this.setState({ selectedDate: date }, () => {
      this.requestReservedTimeBlocks();
    });
  };

  requestReservedTimeBlocks = () => {
    if (
      this.state.selectedMaster == null ||
      this.state.selectedService == null ||
      this.state.selectedDate == null
    ) {
      return;
    }
    postRequest(
      "reservations/getreservedtimeblocks",
      {
        date: this.state.selectedDate,
        master: this.state.selectedMaster
      },
      this.props.storeReservations
    );
  };
  createReservation = () => {
    this.setState({ isSubmitting: true });
    const body = {
      master: this.state.selectedMaster,
      service: this.state.selectedService.id,
      date: this.state.selectedDate,
      timeblock: this.state.selectedTimeblock,
      userId: this.props.user.id
    };
    postRequest("reservations/createReservation", body, () => {
      this.setState({
        isSubmitting: false,
        showConnfirmation: true,
        selectedTimeblock: null
      });
    });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };
  showModal = () => {
    this.setState({ modalVisible: true });
  };
  renderInfoModal = () => {
    return (
      <View>
        <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={this.closeModal}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>I am the modal content!</Text>
            <Text style={styles.modalBody}>I am the modal content!</Text>
          </View>
        </Modal>
      </View>
    );
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
        {this.renderInfoModal()}
        <ScrollView
          ref={ref => (this.scrollView = ref)}
          style={styles.serviceScrollStyle}
          // contentContainerStyle={{ marginBottom: 85 }}
        >
          <View style={styles.serviceSelectStyle}>
            <Text
              style={{
                marginLeft: 15,
                marginTop: 10,
                fontWeight: "bold",
                fontSize: 15
              }}
            >
              Услуги
            </Text>
            {this.renderServices()}
            {this.state.selectedService && (
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row-reverse",
                  marginHorizontal: 15
                }}
                onPress={() => {
                  this.servicePlus.resetPlus();
                  this.setState({
                    selectedService: null,
                    selectedTimeblock: null
                  });
                }}
              >
                <Text style={{ color: "#D7BF76", fontWeight: "bold" }}>
                  Выбрать другогую услугу
                </Text>
              </TouchableOpacity>
            )}
            <Text style={{ marginLeft: 15, marginTop: 10, fontWeight: "bold" }}>
              Мастера
            </Text>
            {this.renderMasters()}
            {this.state.selectedMaster != null && (
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row-reverse",
                  marginHorizontal: 15
                }}
                onPress={() => {
                  this.masterPlus.resetPlus();
                  this.setState({
                    selectedMaster: null,
                    selectedTimeblock: null
                  });
                }}
              >
                <Text
                  style={{ color: "#D7BF76", fontWeight: "bold", fontSize: 15 }}
                >
                  Выбрать другого мастера
                </Text>
              </TouchableOpacity>
            )}
            <CustomCalendar
              onSelectDay={this.selectCalendarDate}
              isCollapsed={this.state.isCalendarCollapsed}
              toggleCalendar={this.toggleCalendar}
              callBack={() => this.scrollView.scrollToEnd({ animation: true })}
            />
            {this.state.selectedMaster &&
              this.state.selectedService &&
              this.props.reservedTimeBlocks != null && (
                <TimeBlock
                  reservedTimeBlocks={this.props.reservedTimeBlocks}
                  onPress={timeblock => {
                    this.setState(
                      { selectedTimeblock: timeblock },
                      this.requestReservedTimeBlocks
                    );
                  }}
                  selectedService={this.state.selectedService}
                />
              )}
          </View>
          <View style={{ height: 85 }} />
        </ScrollView>
        {this.state.selectedTimeblock && (
          <TouchableOpacity
            onPress={this.createReservation}
            style={styles.registerButton}
          >
            <Text>Создать резервацию</Text>
          </TouchableOpacity>
        )}
        {this.props.isLoading ||
          (this.state.isSubmitting && <LoadingOverlay />)}
        {this.state.showConnfirmation && (
          <ConfirmationOverlay
            closeDialog={() => {
              this.setState(
                { showConnfirmation: false },
                navigate(RouteNames.Home)
              );
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  serviceScrollStyle: {
    flex: 1,
    height: "15%",
    width: "100%"
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
  },
  registerButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    height: 50,
    width: "90%",
    height: 55,
    marginHorizontal: 15,
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
    backgroundColor: "#D7BF76",
    zIndex: 0
  },
  modalView: {
    flex: 0,
    borderRadius: 15,
    backgroundColor: "white",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "column"
  },
  modalTitle: {
    margin: 5,
    color: "#D7BF76",
    fontSize: 25
  },
  modalBody: {
    margin: 10,
    fontSize: 15
  }
});

const mapStateToProps = state => {
  let timeBlocks = state.reservations.reservations.map(
    ({ time_block }) => time_block
  );
  return {
    user: state.user.userData,
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
