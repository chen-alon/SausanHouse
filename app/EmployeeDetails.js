import React, { Component } from "react";
import {
  View,
  ListView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import ActionBar from "./ActionBar";
import EmployeeListItem from "./EmployeeListItem";
import * as employeeService from "./services/employee-service-mock";
import Button from "./services/Button";
import { Hoshi } from "react-native-textinput-effects";
import Icon from 'react-native-vector-icons/FontAwesome';


export default class EmployeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
    employeeService.findById(this.props.data.id).then(employee => {
      this.setState({
        employee: employee,
        dataSource: this.state.dataSource.cloneWithRows(employee.reports)
      });
    });
  }

  openManager() {
    this.props.navigator.push({
      name: "details",
      data: this.state.employee.manager
    });
  }

  render() {
    if (this.state && this.state.employee) {
      let employee = this.state.employee;
      let manager;
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Hoshi
              style={styles.hosi}
              label="שם פרטי"
              placeholder={employee.firstName}
              textAlign="center"
              borderColor={"#00adf5"}

            />
            <Hoshi
              style={styles.hosi}
              label="שם משפחה"
              placeholder={employee.lastName}
              textAlign="center"
              borderColor={"#00adf5"}

            />
            <Hoshi
              style={styles.hosi}
              label="ת.ז"
              placeholder={employee.id}
              textAlign="center"
              borderColor={"#00adf5"}

            />
            <Hoshi
              style={styles.hosi}
              label="מספר עובד"
              placeholder={employee.id}
              textAlign="center"
              borderColor={"#00adf5"}

            />
            <Hoshi
              style={styles.hosi}
              label="פלאפון"
              placeholder={employee.mobilePhone}
              textAlign="center"
              borderColor={"#00adf5"}

            />
            <Hoshi
              style={styles.hosi}
              label="דוא''ל"
              placeholder={employee.email}
              textAlign="center"
              borderColor={"#00adf5"}

            />
            <Button style={styles.buttonStyle}>
              <Text style={styles.textStyle}>צפיה במשמרות</Text>
            </Button>
            <Button style={styles.buttonStyle}>
              <Text style={styles.textStyle}>עדכן פרטים</Text>
            </Button>
            <Button style={styles.buttonStyle}>
              <Text style={styles.textStyle}>מחיקת עובד</Text>
            </Button>
            <ActionBar
              mobilePhone={employee.mobilePhone}
              email={employee.email}
            />
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  hosi: {
    // this is used as active border color
    borderColor: "#00adf5",
    //width: 20,
    //borderHeight: 3,
    //inputPadding: 40,
    height: 20,
    textAlign: "center"
    //marginLeft:
    // paddingRight: 100
  },

  container: {
    marginTop: 40,
    backgroundColor: "#FFFFFF",
    flex: 1
  },
  header: {
    backgroundColor: "#fff",
    flex: 1
  },

  bigText: {
    fontSize: 20
  },
  textStyle: {
    fontSize: 18,
    justifyContent: "center",
    textAlign: "center",
    marginRight: 5,
    marginLeft: 5
  },

  buttonStyle: {
    backgroundColor: "#b76c94",
    textAlign: "center",
    alignSelf: "center",
    color: "#000",
    padding: 30,
    fontSize: 25,
    height: 10,
    marginLeft: 10,
    marginRight: 10,
    width: "60%",
    marginTop: 50
  }
});