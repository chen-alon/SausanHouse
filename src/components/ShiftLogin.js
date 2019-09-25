import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Text,
  View
} from "native-base";
import Button2 from "./common/Button2";
import { WaveIndicator, SkypeIndicator } from "react-native-indicators";
import AnalogClock from "./AnalogClock";
import CustomHeader from "./manager/CustomHeader";
import { StyleSheet, Alert } from "react-native";
import firebase from "./../../components/Firebase";
import moment from "moment";
//This is an example code to get Geolocation//
//import react in our code.
import { Image, PermissionsAndroid, Platform } from "react-native";

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  //alert(d);
  return d;
};

const deg2rad = deg => {
  return deg * (Math.PI / 180);
};

export default class ShiftLogin extends Component {
  state = {
    currentLongitude: "unknown", //Initial Longitude
    currentLatitude: "unknown" //Initial Latitude
  };

  componentDidMount = () => {
    this.call(this);
  };

  call = that => {
    //   var that = this;
    //Checking for the permission just after component loaded
    that.setState({
      currentLongitude: null,
      currentLatitude: null
    });
    if (Platform.OS === "ios") {
      this.callLocation(that);
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Access Required",
              message: "This App needs to Access your location"
            }
          );
          //alert("goood");
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            that.callLocation(that);
          } else {
            alert("Permission Denied");
          }
        } catch (err) {
          alert("err", err);
          console.warn(err);
        }
      }
      requestLocationPermission();
    }
  };

  callLocation(that) {
    //alert("callLocation Called");
    navigator.geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        // alert("very good");
        //getting the Latitude from the location json
        that.setState({
          currentLongitude: currentLongitude,
          currentLatitude: currentLatitude
        });
      },
      error => alert(error.message)
      //  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    that.watchID = navigator.geolocation.watchPosition(position => {
      //Will give you the location on location change
      console.log(position);
      const currentLongitude = JSON.stringify(position.coords.longitude);
      //getting the Longitude from the location json
      const currentLatitude = JSON.stringify(position.coords.latitude);
      //getting the Latitude from the location json
      that.setState({
        currentLongitude: currentLongitude,
        currentLatitude: currentLatitude
      });
      //Setting state Longitude to re re-render the Longitude Text
    });
  }

  calldis1(lat, long, that) {
    // alert(lat);
    //alert(long);
    var x = getDistanceFromLatLonInKm(lat, long, 31.7872249, 35.1816977);
    if (x < 0.05) {
      this.saveBoard();
    } else {
      Alert.alert(
        "מיקומך שונה ממיקום הבית של סוזן",
        "",
        [
          {
            text: "OK",
            onPress: () => {
              that.setState({
                currentLongitude: null, //Initial Longitude
                currentLatitude: null
              });
              that.call(that);
            }
          }
        ],
        { cancelable: false }
      );
    }
  }

  calldis2(lat, long, that) {
    var x = getDistanceFromLatLonInKm(lat, long, 31.7872249, 35.1816977);
    if (x < 0.05) {
      this.save();
    } else {
      Alert.alert(
        "מיקומך שונה ממיקום הבית של סוזן",
        "",
        [
          {
            text: "OK",
            onPress: () => {
              that.setState({
                currentLongitude: null, //Initial Longitude
                currentLatitude: null
              });
              that.call(that);
            }
          }
        ],
        { cancelable: false }
      );
    }
  }

  componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.watchID);
  };

  constructor() {
    super();
    this.ref = firebase.firestore().collection("shifts");
    this.state = {
      Start: "",
      End: "",
      Uid: "",
      isLoading: false
    };
  }

  saveBoard() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    const today = moment().format("YYYY-MM-DD");

    const flag = true;
    this.setState({
      isLoading: true
    });
    this.ref
      .where("Uid", "==", firebase.auth().currentUser.uid)
      .where("date", "==", today)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          {
            Alert.alert("החתמת כניסה כבר בוצעה!");
            flag = false;
          }
        });
        if (flag === true) {
          // Alert.alert(
          //   "החתמת כניסה בוצעה בהצלחה!" +
          //     "\n" +
          //     date +
          //     "/" +
          //     month +
          //     "/" +
          //     year +
          //     "    " +
          //     hours +
          //     ":" +
          //     min +
          //     ":" +
          //     sec
          // );
          this.ref
            .add({
              Start: this.state.Start,
              End: this.state.End,
              Uid: firebase.auth().currentUser.uid,
              date: this.state.date,
              monthyear: this.state.monthyear
            })
            .then(docRef => {
              this.setState(
                {
                  Start: "",
                  End: "",
                  Uid: "",
                  date: "",
                  monthyear: "",
                  isLoading: false
                },
                () => {
                  Alert.alert(
                    "החתמת כניסה בוצעה בהצלחה!" +
                      "\n" +
                      date +
                      "/" +
                      month +
                      "/" +
                      year +
                      "    " +
                      hours +
                      ":" +
                      min +
                      ":" +
                      sec
                  );
                }
              );
            })
            .catch(error => {
              console.error("Error adding document: ", error);
              this.setState({
                isLoading: false
              });
            });
        }
      });
  }
  save() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    const today = moment().format("YYYY-MM-DD");
    this.setState({
      isLoading: true
    });
    const flag = true;
    this.ref
      .where("Uid", "==", firebase.auth().currentUser.uid)
      .where("date", "==", today)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          {
            if (`${doc.data().End}` === "") {
              this.ref
                .doc(`${doc.id}`)
                .update({
                  End: this.state.End
                })
                .then(docRef => {
                  this.setState(
                    {
                      Start: "",
                      End: "",
                      Uid: "",
                      date: "",
                      monthyear: "",
                      isLoading: false
                    },
                    () => {
                      Alert.alert(
                        "החתמת יציאה בוצעה בהצלחה!" +
                          "\n" +
                          date +
                          "/" +
                          month +
                          "/" +
                          year +
                          "    " +
                          hours +
                          ":" +
                          min +
                          ":" +
                          sec
                      );
                    }
                  );
                })
                .catch(error => {
                  console.error("Error adding document: ", error);
                  this.setState({
                    isLoading: false
                  });
                });
              flag = false;
            } else {
              Alert.alert("החתמת יציאה כבר בוצעה!");
              flag = false;
            }
          }
        });
        if (flag === true) {
          this.saveout();
        }
      });
  }
  saveout() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    const today = moment().format("YYYY-MM-DD");
    const flag = true;
    this.setState({
      isLoading: true
    });
    this.updatedate("date");
    this.updatedate3("monthyear");
    Alert.alert(
      "החתמת יציאה בוצעה בהצלחה!" +
        "\n" +
        date +
        "/" +
        month +
        "/" +
        year +
        "    " +
        hours +
        ":" +
        min +
        ":" +
        sec +
        "\n" +
        "שים לב כי לא בוצעה החתמת כניסה היום"
    );
    this.ref
      .add({
        Start: this.state.Start,
        End: this.state.End,
        Uid: firebase.auth().currentUser.uid,
        date: this.state.date,
        monthyear: this.state.monthyear
      })
      .then(docRef => {
        this.setState({
          Start: "",
          End: "",
          Uid: "",
          date: "",
          monthyear: "",
          isLoading: false
        });
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        this.setState({
          isLoading: false
        });
      });
  }

  updateTextInput = field => {
    var timeStamp = Date.now();
    const state = this.state;
    state[field] = timeStamp;
    this.setState(state);
  };

  updatedate = field => {
    const today2 = moment().format("YYYY-MM-DD");

    const state = this.state;
    state[field] = today2;
    this.setState(state);
  };
  updatedate3 = field => {
    const today3 = moment().format("YYYY-MM");

    const state = this.state;
    state[field] = today3;
    this.setState(state);
  };

  render() {
    return (
      <Container>
        <CustomHeader
          title="שעון נוכחות"
          drawerOpen={() => this.props.navigation.openDrawer()}
        />

        {this.state.currentLatitude != null &&
        this.state.currentLongitude != null ? (
          <Content>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40
              }}
            >
              <AnalogClock minuteHandLength={110} />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40
              }}
            >
              <Button2
                onPress={() => {
                  this.updateTextInput("Start");
                  this.updatedate("date");
                  this.updatedate3("monthyear");
                  this.calldis1(
                    this.state.currentLatitude,
                    this.state.currentLongitude,
                    this
                  );
                }}
              >
                החתמת כניסה
              </Button2>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40
              }}
            >
              <Button2
                onPress={() => {
                  this.updateTextInput("End");
                  this.updatedate("date");
                  this.updatedate3("monthyear");
                  this.calldis2(
                    this.state.currentLatitude,
                    this.state.currentLongitude,
                    this
                  );
                }}
              >
                החתמת יציאה
              </Button2>
            </View>
          </Content>
        ) : (
          <Content>
            <View style={styles.view}>
              <View>
                <Text style={styles.text}>
                  אנא המתן, המערכת אוספת נתוני GPS..
                </Text>
              </View>
              <View style={styles.view}>
                <SkypeIndicator color="#004577" size={75} />
              </View>
            </View>
          </Content>
        )}
      </Container>
    );
  }
}

const styles = {
  textStyle: {
    fontFamily: "AmaticSC-Bold",
    // alignSelf: "center",
    color: "#94C9E8",
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    alignSelf: "center",
    fontFamily: "AmaticSC-Bold",
    // flex: 1,
    alingSelf: "stretch",
    backgroundColor: "#005D93",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E2DCDE",
    // marginLeft: 5,
    // marginRight: 5,
    width: "90%"
  },
  text: {
    fontSize: 30,
    color: "#004577",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "AmaticSC-Bold",
    paddingTop: 150
  },
  view: {
    paddingTop: 100
  }
};
