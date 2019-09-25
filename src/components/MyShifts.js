import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { Table, TableWrapper, Row } from "react-native-table-component";
import { Container, Content, Text } from "native-base";
import CustomHeader from "./manager/CustomHeader";
import firebase from "../../components/Firebase";
import MonthSelectorCalendar from "react-native-month-selector";
import Button3 from "./common/Button3";
import moment from "moment";
import { DotIndicator } from "react-native-indicators";

const prettyDate2 = time => {
  if (!time) return "-";
  var date = new Date(time);
  return date.toLocaleTimeString();
};

const compare = ([dateA], [dateB]) => {
  if (moment(dateA) > moment(dateB)) return 1;
  else if (moment(dateA) < moment(dateB)) return -1;

  return 0;
};
export default class MyShifts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["תאריך", "שעת כניסה", "שעת יציאה", "סה״כ"],
      tableData: [],
      widthArr: [85, 85, 85, 85],
      isLoading: true,
      board: {},
      key: "",
      btnPressed: false,
      counter: 0,
      month: moment(),
      today: moment().format("YYYY-MM")
    };
  }

  componentDidMount() {
    const today2 = moment().format("YYYY-MM");
    this.tehila(today2);
  }

  tehila(today1) {
    firebase
      .firestore()
      .collection("shifts")
      .where("Uid", "==", firebase.auth().currentUser.uid)
      .where("monthyear", "==", today1)
      .get()
      .then(querySnapshot => {
        const tableData = querySnapshot.docs.map(doc => {
          const { date, Start, End } = doc.data();
          var res = Math.abs(End - Start) / 1000;
          var hours = Math.floor(res / 3600) % 24; // get hours
          var minutes = Math.floor(res / 60) % 60; // get minutes

          return [
            date,
            prettyDate2(Start),
            prettyDate2(End),
            End && Start ? hours + ":" + minutes : "-"
          ];
        });
        this.setState({ tableData: tableData.sort(compare) });
      });
  }

  render() {
    // this.tehila();
    const state = this.state;
    return (
      <Container>
        <CustomHeader
          title="המשמרות שלי"
          drawerOpen={() => this.props.navigation.openDrawer()}
        />
        <View style={{ paddingTop: 20 }}>
          <Button3
            onPress={() =>
              this.setState({ btnPressed: !this.state.btnPressed })
            }
          >
            בחירת תאריך
          </Button3>
        </View>
        {this.state.btnPressed === true ? (
          <Content>
            <View style={styles.container}>
              <Text style={styles.dateChose}>
                מציג משמרות עבור התאריך :{" "}
                {this.state.month && this.state.month.format("MMM YYYY")}
              </Text>

              <MonthSelectorCalendar
                seperatorColor="#537791"
                currentMonthTextStyle={(color = "#5FA9DD")}
                selectedBackgroundColor="#5FA9DD"
                minDate={moment("01/2019", "MM/YYYY", true)}
                selectedDate={this.state.month}
                onMonthTapped={date => {
                  const today1 = date.format("YYYY-MM");
                  this.setState({ month: date });
                  this.setState({ today: date.format("YYYY-MM") });
                  this.tehila(today1);
                }}
              />
            </View>
          </Content>
        ) : (
          <View />
        )}

        <View style={styles.container}>
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
                          // index % 2 && { backgroundColor: "#f3f7f0" }
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
  dateChose: {
    textAlign: "center",
    color: "#5FA9DD",
    fontFamily: "AmaticSC-Bold",
    fontSize: 26
  },
  textLink: {
    textDecorationLine: "underline",
    textAlign: "center",
    color: "#005D93",
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "AmaticSC-Bold",
    paddingTop: 10
  }
});
