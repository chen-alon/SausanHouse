import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { Table, TableWrapper, Row } from "react-native-table-component";
import { Container, Content, Text } from "native-base";
import moment from "moment";
import CustomHeader from "./manager/CustomHeader";
import firebase from "../../components/Firebase";
import MonthSelectorCalendar from "react-native-month-selector";
import Button3 from "./common/Button3";
import { DotIndicator } from "react-native-indicators";
import email from "react-native-email";
import { Icon } from "react-native-elements";
import Button from "./common/Button";

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
export default class csvExport extends Component {
  ////////////////////////////////////////////////////////
  arrayToCSV(twoDiArray) {
    //  Modified from: http://stackoverflow.com/questions/17836273/
    //  export-javascript-data-to-csv-file-without-server-interaction
    var csvRows = [];
    for (var i = 0; i < twoDiArray.length; ++i) {
      for (var j = 0; j < twoDiArray[i].length; ++j) {
        twoDiArray[i][j] = '"' + twoDiArray[i][j] + '"'; // Handle elements that contain commas
      }
      csvRows.push(twoDiArray[i].join(","));
    }

    return csvRows.join("\r\n");
  }

  createCsv(headers, body) {
    let csvValue = headers.join(",");
    csvValue += "\n";
    body.forEach(item => {
      csvValue += item.join(",") + "\n";
    });
    return csvValue;
  }

  createBlob(data) {
    return new Blob([data], { type: "text/csv" });
  }

  uploadFile() {
    // alert(
    //   this.createCsv(
    //     ["head1", "head2", "head3"],
    //     [[1, 2, 3], [1, 2, 3], [1, 2, 3]]
    //   )
    // );

    const fileBlob = this.createBlob(
      this.createCsv(this.state.tableHead, this.state.tableData)
    );

    // Create a root reference
    var storageRef = firebase
      .storage()
      .ref("/csv/" + this.state.fileName + ".csv");
    var uploadTask = storageRef.put(fileBlob).then(() => {
      alert("הקובץ הועלה בהצלחה");
    });
  }
  //////////////////////////////////

  downloadFile() {
    // Create a root reference
    var storageRef = firebase
      .storage()
      .ref("/csv/" + this.state.fileName + ".csv");
    storageRef
      .getDownloadURL()
      .then(function(url) {
        const to = ["roisulimani@gmail.com"]; // string or array of email addresses
        email(to, {
          // Optional additional arguments
          subject:
            "הבית של סוזן - דו״ח נוכחות" +
            moment().format("MMMM Do YYYY, h:mm:ss a"),
          body: url
        }).catch(console.error);

        this.setState({ link: url });
        // alert(url)
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function(event) {
          var blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();

        // Or inserted into an <img> element:
        var img = document.getElementById("myimg");
        img.src = url;
      })
      .catch(function(error) {
        // Handle any errors
      });
  }

  //////////////////////////////////

  constructor(props) {
    super(props);
    this.state = {
      link: "",
      fileName:
        "הבית של סוזן - דו״ח נוכחות" +
        moment().format("MMMM Do YYYY, h:mm:ss a"),
      tableHead: [
        "שעת יציאה",
        "שעת כניסה",
        "תאריך",
        "שם משפחה",
        "שם פרטי",
        "מספר עובד",
        "ת.ז."
      ],

      tableData: [],
      widthArr: [85, 85, 85, 85, 85, 85, 85],
      isLoading: true,
      board: {},
      key: "",
      btnPressed: false,
      counter: 0,
      month: moment(),
      today: moment().format("YYYY-MM"),
      link: ""
    };
  }

  componentDidMount() {
    const today2 = moment().format("YYYY-MM");
    this.tehila(today2);
  }

  tehila(today1) {
    this.setState({
      isLoading: true,
      tableData: []
    });
    // alert(today1);
    firebase
      .firestore()
      .collection("shifts")
      .where("monthyear", "==", today1)
      .get()
      .then(querySnapshot => {
        //Alert.alert(JSON.stringify(querySnapshot.docs.length));
        //debugger;
        querySnapshot.docs.forEach(doc => {
          const { date, End, Start, Uid } = doc.data();

          firebase
            .firestore()
            .collection("users")
            .where("uid", "==", Uid)
            .get()
            .then(querySnapshot => {
              //Alert.alert(JSON.stringify(querySnapshot.docs.length));
              //debugger;
              const tableData = querySnapshot.docs.map(doc => {
                const { EmployeeNumber, ID, LastName, FirstName } = doc.data();
                return [
                  prettyDate2(End),
                  prettyDate2(Start),
                  date,
                  LastName,
                  FirstName,
                  EmployeeNumber,
                  ID
                ];
              });
              this.setState(prevState => ({
                tableData: prevState.tableData.concat([tableData[0]])
              }));
            });
        });
      });
  }

  render() {
    // this.tehila();
    const state = this.state;
    return (
      <Container>
        <CustomHeader
          title="ייצוא דוחות נוכחות"
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
                  <DotIndicator color="#005D93" />
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
        <Button onPress={() => this.uploadFile()}>ייצא טבלה כקובץ Excel</Button>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 16
          }}
        >
          <Icon
            raised
            name="envelope"
            type="simple-line-icon"
            color="#004577"
            onPress={() => this.downloadFile()}
          />
        </View>
        {/* <View style={styles.container2}>
                <Button title={"send email"} onPress={this.handleEmail} ></Button>
            </View> */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
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
