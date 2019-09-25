import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Spinner,
  Button,
  Text
} from "native-base";
import { secondFirebaseInstance } from "../../components/Firebase";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { StyleSheet, Alert, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomHeader from "./manager/CustomHeader";
import firebase from "../../components/Firebase";
import moment from "moment";

export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      tableData: [],
      board: {},
      key: "",
      counter: 10,
      bonus: 8,
      month: moment(),
      today: moment().format("YYYY-MM"),

      tableData1: []
    };
    const ref = firebase
      .firestore()
      .collection("bonus")
      .doc("lyMzax2eQXTHAzPiuDsP");
    // alert(this.state.bonus);

    ref.get().then(querySnapshot => {
      if (querySnapshot.exists) {
        const board = querySnapshot.data();
        this.setState({
          bonus: board.bonusNum
        });
      }
    });
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            board: doc.data(),
            key: doc.id,
            isLoading: false
          });
        });
      });

    firebase
      .firestore()
      .collection("shifts")
      .where("Uid", "==", firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const tableData = querySnapshot.docs.map(doc => {
            const { date } = doc.data();
            return [date];
          });
          this.setState({ tableData: tableData });
        });
      });

    firebase
      .firestore()
      .collection("shifts")
      .where("Uid", "==", firebase.auth().currentUser.uid)
      .where("monthyear", "==", this.state.today)
      .get()
      .then(querySnapshot => {
        const tableData1 = querySnapshot.docs.map(doc => {
          const { date } = doc.data();
          return [date];
        });
        this.setState({ tableData1: tableData1 });
      });
  }

  render() {
    const state = this.state;
    let newDaysObject = {};
    const mark = this.state.tableData.forEach(day => {
      // Alert.alert(JSON.stringify(day));
      newDaysObject = {
        ...newDaysObject,
        [day]: {
          selected: true,
          // marked: true,
          selectedColor: "#f9ca24"
        }
      };
    });

    return (
      <Container>
        <CustomHeader
          title="דף הבית"
          drawerOpen={() => this.props.navigation.openDrawer()}
        />
        <ScrollView>
          <Calendar
            // Specify style for calendar container element. Default = {}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              height: 350
            }}
            // Specify theme properties to override specific styles for calendar parts. Default = {}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#b6c1cd",
              selectedDayBackgroundColor: "#00adf5",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#00adf5",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              dotColor: "#00adf5",
              selectedDotColor: "#ffffff",
              arrowColor: "#00adf5",
              monthTextColor: "#000",
              textMonthFontWeight: "bold",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
              // textDayFontFamily: "AmaticSC-Bold",
              // textMonthFontFamily: "AmaticSC-Bold",
              // textDayHeaderFontFamily: "AmaticSC-Bold",
              // textDayFontWeight: "9000"
            }}
            markedDates={newDaysObject}
          />

          <Content>
            <Text style={styles.HelloText}>
              {"שלום " + this.getName() + ","}
            </Text>
            {this.state.tableData.length >= this.state.bonus ? (
              <Text style={styles.HelloText}>
                כל הכבוד! הינך זכאי/ת לבונוס 🎉🎉
              </Text>
            ) : (
              <Text style={styles.HelloText}>
                נותרו {this.state.bonus - this.state.tableData1.length} משמרות
                לבונוס
              </Text>
            )}
          </Content>
        </ScrollView>
      </Container>
    );
  }

  getName() {
    const name = this.state.board.FirstName;
    if (name == null || name.length <= 0) return "אורח";
    return name;
  }
}

const styles = {
  HelloText: {
    fontSize: 50,
    color: "#005D93",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "AmaticSC-Bold"
  },

  HeaderText: {
    fontSize: 25,
    color: "#000",
    justifyContent: "center",
    textAlign: "center"
  },

  BarText: {
    fontSize: 15,
    color: "#000",
    justifyContent: "center",
    textAlign: "center"
  },

  IconStyle: {
    //justifyContent: 'center',
    //alignItems: 'center',
    //marginLeft: 115,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9
  }
};
