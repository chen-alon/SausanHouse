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
import { Button } from "react-native-elements";
import firebase from "../../components/Firebase";
import { PacmanIndicator } from "react-native-indicators";
import { Container, Content, Text, Spinner } from "native-base";
import { Table, TableWrapper, Row } from "react-native-table-component";
import CustomHeader from "./manager/CustomHeader";
import Button3 from "./common/Button3";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import { DotIndicator } from "react-native-indicators";

import DateTimePicker from "react-native-modal-datetime-picker";
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

export default class FollowPage extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("shifts");
    this.state = {
      tableHead: ["שם פרטי", "שם משפחה", "שעת כניסה", "שעת יציאה"],
      tableData: [],
      widthArr: [85, 85, 85, 85],
      // isLoading: true,
      board: {},
      key: "",
      btnPressed: false,
      //  counter: 0,
      //  month: moment(),
      //  today: moment().format("YYYY-MM"),

      key: "",
      month: "",
      isLoading: false,
      Uid: "",
      isDateTimePickerVisible1: false,
      monthyear: ""
    };
  }

  componentDidMount() {
    ignoreFirebaseLoadingWarnings();
    const today = moment().format("YYYY-MM-DD");
    this.cahengState(today);
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

  cahengState(day) {
    this.setState({
      isLoading: true,
      tableData: []
    });

    firebase
      .firestore()
      .collection("shifts")
      .where("date", "==", day)
      .get()
      .then(querySnapshot => {
        //Alert.alert(JSON.stringify(querySnapshot.docs.length));
        //debugger;
        querySnapshot.docs.forEach(doc => {
          const { Uid, Start, End } = doc.data();

          firebase
            .firestore()
            .collection("users")
            .where("uid", "==", Uid)
            .get()
            .then(querySnapshot => {
              //Alert.alert(JSON.stringify(querySnapshot.docs.length));
              //debugger;
              const tableData = querySnapshot.docs.map(doc => {
                const { FirstName, LastName } = doc.data();
                return [
                  FirstName,
                  LastName,
                  prettyDate2(Start),
                  prettyDate2(End)
                ];
              });
              this.setState(prevState => ({
                tableData: [...prevState.tableData, tableData[0]]
              }));
            });
        });
      });
  }

  render() {
    const state = this.state;
    return (
      <Container>
        <CustomHeader
          title="דף מעקב"
          drawerOpen={() => this.props.navigation.openDrawer()}
        />

        <View style={styles.container}>
          <Button3 onPress={this.showDateTimePicker1}>בחירת תאריך</Button3>
          <Text style={styles.dateChose}>
            מציג משמרות עבור התאריך : {this.state.month.toString()}
          </Text>

          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible1}
            onConfirm={this.handleDatePicked1}
            onCancel={this.hideDateTimePicker1}
          />

          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{ borderColor: "#f3f7f0" }}>
                <Row
                  data={state.tableHead}
                  widthArr={state.widthArr}
                  style={styles.header}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                {this.state.tableData.length === 0 ? (
                  <DotIndicator color="#004577" />
                ) : (
                  <Table borderStyle={{ borderColor: "#f3f7f0" }}>
                    {this.state.tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={state.widthArr}
                        style={[
                          styles.row
                          //  index % 2 && { backgroundColor: "#F7F6E7" }
                        ]}
                        textStyle={styles.text}
                      />
                    ))}
                  </Table>
                )}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff"
  },
  header: {
    height: 50,
    backgroundColor: "#5FA9DD"
  },
  text: {
    textAlign: "center",
    fontWeight: "100",
    color: "#005D93"
  },
  dataWrapper: {
    marginTop: -1
  },
  row: {
    height: 40,
    backgroundColor: "#E7E6E1"
  },
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
