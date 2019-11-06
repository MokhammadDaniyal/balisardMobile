import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "native-base";
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
import { Header } from "react-navigation";

import images from "../LoginScreen/images";

class ServiceScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text style={{ fontSize: 25 }}>{navigation.state.params.title}</Text>
    )
  });

  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.genderType = this.params.genderType;
    this.serviceType = this.params.type;

    this.state = {
      isCalendarCollapsed: true,
      employees: [],
      selectedMaster: null,
      selectedService: null,
      selectedTimeblock: null,
      selectedDate: moment().format("YYYY-MM-DD"),
      isSubmitting: false,
      showConnfirmation: false
    };
  }

  componentDidMount() {
    postRequest(
      "services/retrieveservices",
      {
        type: this.serviceType,
        genderType: this.genderType
      },
      services => {
        this.props.storeServices(services);
      }
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
          master.gendertype.includes(this.genderType) &&
          master.type.includes(this.serviceType)
        );
      })
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
            image={"data:image/jpg;base64," + master.image}
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
            info={service.info}
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
      userId: this.props.user.id,
      igUsername: this.props.igData ? this.props.igData.data.username : null
    };
    postRequest("reservations/createReservation", body, () => {
      this.setState({
        isSubmitting: false,
        showConnfirmation: true,
        selectedTimeblock: null
      });
    });
  };

  saveTimeblockIndex = timeblock => {
    this.setState({ selectedTimeblock: timeblock });
  };

  render() {
    return (
      <ImageBackground style={styles.container} source={images.background}>
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
                  saveTimeblockIndex={this.saveTimeblockIndex}
                  selectedService={this.state.selectedService}
                />
              )}
          </View>
          <View style={{ height: 85 }} />
        </ScrollView>
        {this.state.selectedTimeblock != null && (
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
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  serviceScrollStyle: {
    flex: 1,
    height: "15%",
    width: "100%",
    marginTop: Header.HEIGHT
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
    user: state.user,
    reservedTimeBlocks: timeBlocks,
    reservations: state.reservations.reservations,
    masters: state.reservations.masters,
    services: state.services.services,
    isLoading: state.services.isLoading,
    igData: state.user.igData
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
