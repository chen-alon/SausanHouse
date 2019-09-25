import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TextInput,
  Alert,
  YellowBox
} from "react-native";
//import { Button } from "react-native-elements";
import firebase from "./Firebase";
import { PacmanIndicator } from "react-native-indicators";
import { Container, Content, Text } from "native-base";
import CustomHeader from "./../src/components/manager/CustomHeader";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import { Icon } from "react-native-elements";
import Shift from "./../src/components/Shift";
import DateTimePicker from "react-native-modal-datetime-picker";
import Button4 from "../src/components/common/Button4";
import Button from "../src/components/common/Button";
const ignoreFirebaseLoadingWarnings = () => {
  YellowBox.ignoreWarnings(["Setting a timer"]);
  const newconsole = { ...console };
  console.warn = message => {
    if (message.indexOf("Setting a timer") <= -1) {
      newconsole.warn(message);
    }
  };
};

const padWithZero = num => (num <= 9 ? `0${num}` : num);
const prettyDate2 = time => {
  if (!time) return "-";
  var date = new Date(time);
  return date.toLocaleTimeString();
};

export default class ShiftsTable extends Component {
  static navigationOptions = {
    title: "עריכת משמרות",
    headerStyle: {
      backgroundColor: "#3F51B5"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontSize: 24,
      color: "#fff",
      fontFamily: "AmaticSC-Bold",
      //fontFamily: "AmaticSC-Bold",
      fontWeight: "normal"
    }
  };
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("shifts");
    this.state = {
      key: "",
      month: "",
      Start: "",
      startDis: "",
      End: "",
      isLoading: false,
      Uid: "",
      EndDis: "",
      stam: 1,
      isDateTimePickerVisible1: false,
      isDateTimePickerVisible2: false,
      isDateTimePickerVisible3: false,
      monthyear: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    ignoreFirebaseLoadingWarnings();
    const ref = firebase
      .firestore()
      .collection("users")
      .doc(JSON.parse(navigation.getParam("boardkey")));
    ref.get().then(doc => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: board.uid,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  showDateTimePicker1 = () => {
    this.setState({ isDateTimePickerVisible1: true });
  };

  hideDateTimePicker1 = () => {
    this.setState({ isDateTimePickerVisible1: false });
  };

  handleDatePicked1 = date => {
    this.setState({
      month: `${date.getFullYear()}-${padWithZero(
        date.getMonth() + 1
      )}-${padWithZero(date.getDate())}`,
      monthyear: `${date.getFullYear()}-${padWithZero(date.getMonth() + 1)}`
    });

    this.cahengState(this.state.month);
    this.hideDateTimePicker1();
  };

  showDateTimePicker2 = () => {
    this.setState({ isDateTimePickerVisible2: true });
  };

  hideDateTimePicker2 = () => {
    this.setState({ isDateTimePickerVisible2: false });
  };

  handleDatePicked2 = date => {
    this.setState({
      Start: Date.parse(date),
      startDis: date
        ? `${padWithZero(date.getHours())}:${padWithZero(date.getMinutes())}`
        : "--:--"
    });

    this.hideDateTimePicker2();
  };

  showDateTimePicker3 = () => {
    this.setState({ isDateTimePickerVisible3: true });
  };

  hideDateTimePicker3 = () => {
    this.setState({ isDateTimePickerVisible3: false });
  };

  handleDatePicked3 = date => {
    this.setState({
      End: Date.parse(date),
      EndDis: date
        ? `${padWithZero(date.getHours())}:${padWithZero(date.getMinutes())}`
        : "--:--"
    });

    this.hideDateTimePicker3();
  };

  cahengState(day) {
    this.setState({
      isLoading: true
    });

    this.ref
      .where("Uid", "==", this.state.key)
      .where("date", "==", day)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          {
            const board = doc.data();
            this.setState({
              End: board.End,
              EndDis: prettyDate2(board.End),
              Start: board.Start,
              startDis: prettyDate2(board.Start)
            });
          }
        });
      });
  }

  saveShifts(day) {
    this.setState({
      isLoading: true
    });

    const flag = true;
    this.ref
      .where("Uid", "==", this.state.key)
      .where("date", "==", day)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          {
            this.ref
              .doc(`${doc.id}`)
              .update({
                End: this.state.End,
                Start: this.state.Start
              })
              .then(docRef => {
                this.setState(
                  {
                    Start: "",
                    End: "",
                    startDis: "",
                    EndDis: "",
                    month: "",
                    date: "",
                    monthyear: "",
                    isLoading: false
                  },
                  () => {
                    Alert.alert("המשמרת עודכנה בהצלחה!");
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
            //     }
          }
        });
        if (flag === true) {
          // if (this.state.EndDis === "") {
          //   this.setState({
          //     EndDis: ""
          //   });
          // }

          this.ref
            .add({
              Start: this.state.Start,
              End: this.state.End,
              Uid: this.state.key,
              date: this.state.month,
              monthyear: this.state.monthyear
            })
            .then(docRef => {
              this.setState(
                {
                  Start: "",
                  month: "",
                  End: "",
                  startDis: "",
                  EndDis: "",
                  Uid: "",
                  date: "",
                  monthyear: "",
                  isLoading: false
                },
                () => {
                  Alert.alert("המשמרת הוספה בהצלחה!");
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

  deleteBoard(day) {
    this.setState({
      isLoading: true
    });

    this.ref
      .where("Uid", "==", this.state.key)
      .where("date", "==", day)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          {
            if (doc.exists) {
              this.ref
                .doc(`${doc.id}`)
                .delete()
                .then(docRef => {
                  this.setState(
                    {
                      Start: "",
                      month: "",
                      End: "",
                      startDis: "",
                      EndDis: "",
                      Uid: "",
                      date: "",
                      monthyear: "",
                      isLoading: false
                    },
                    () => {
                      Alert.alert("המשמרת נמחקה בהצלחה!");
                    }
                  );
                });
            }
          }
        });
      });
  }

  render() {
    const state = this.state;
    return (
      <ScrollView>
        <View key={this.state.stam}>
          <Shift navigation={this.props.navigation} />
        </View>
        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: 16
          }}
        >
          <Text style={styles.dateChose}>
            תאריך: {this.state.month.toString()}
          </Text>

          <Icon
            raised
            name="calendar"
            type="simple-line-icon"
            color="#004577"
            onPress={this.showDateTimePicker1}
          />

          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible1}
            onConfirm={this.handleDatePicked1}
            onCancel={this.hideDateTimePicker1}
          />
        </View>

        <Content>
          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: 16
            }}
          >
            <Text style={styles.dateChose}>
              שעת כניסה: {this.state.startDis}
            </Text>
            <Icon
              raised
              name="clock"
              type="simple-line-icon"
              color="#004577"
              onPress={this.showDateTimePicker2}
            />

            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible2}
              onConfirm={this.handleDatePicked2}
              onCancel={this.hideDateTimePicker2}
              mode={"time"}
            />
          </View>
        </Content>

        <Content>
          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: 16
            }}
          >
            <Text style={styles.dateChose}>שעת יציאה: {this.state.EndDis}</Text>
            <Icon
              raised
              name="clock"
              type="simple-line-icon"
              color="#004577"
              onPress={this.showDateTimePicker3}
            />

            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible3}
              onConfirm={this.handleDatePicked3}
              onCancel={this.hideDateTimePicker3}
              mode={"time"}
            />
          </View>
        </Content>

        <Content>
          <View style={styles.detailButton}>
            <Button
              onPress={() => {
                this.saveShifts(this.state.month);
                this.setState({ stam: this.state.stam + 1 });
              }}
            >
              שמור משמרת
            </Button>
          </View>

          <View style={styles.detailButton}>
            <Button
              onPress={() => {
                Alert.alert(
                  "מחיקת משמרת",
                  "האם את/ה בטוח/ה שברצונך למחוק את המשמרת?",
                  [
                    {
                      text: "ביטול",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    {
                      text: "מחק משמרת",
                      onPress: () => {
                        this.deleteBoard(this.state.month);
                        this.setState({ stam: this.state.stam + 1 });
                      }
                    }
                  ],
                  { cancelable: false }
                );
              }}
            >
              מחיקת משמרת
            </Button>
          </View>
        </Content>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 5,
    padding: 16
  },
  header: { height: 50, backgroundColor: "#537791" },
  text: { textAlign: "center", fontWeight: "100" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
  detailButton: {
    marginTop: 10
  },
  dateChose: {
    textAlign: "center",
    color: "#5FA9DD",
    fontFamily: "AmaticSC-Bold",
    fontSize: 26
  }
});
