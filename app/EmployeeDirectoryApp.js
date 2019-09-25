import React, { Component } from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Navigator } from "react-native-deprecated-custom-components";
import EmployeeList from "./EmployeeList";
import EmployeeDetails from "./EmployeeDetails";
import CustomHeader from '../src/components/manager/CustomHeader';
import { View, Container } from "native-base";

export default class EmployeeDirectoryApp extends Component {
  renderScene(route, navigator) {
    switch (route.name) {
      case "employee-list":
        return <EmployeeList navigator={navigator} />;
      case "details":
        return <EmployeeDetails navigator={navigator} data={route.data} />;
    }
  }

  render() {
    return (
      <Container>
        <CustomHeader title="חיפוש עובד" drawerOpen={() => this.props.navigation.openDrawer()}>
        </CustomHeader>     
      <Navigator
        
        style={styles.container}
        initialRoute={{ name: "employee-list" }}  
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                if (route.name === "employee-list") {
                  return null;
                } else {
                  return (
                    <TouchableOpacity onPress={() => navigator.pop()}>
                      <Image
                        source={require("./assets/back.png")}
                        style={styles.backButton}
                      />
                    </TouchableOpacity>
                  );
                }
              },
              RightButton: (route, navigator, index, navState) => {
                return null;
              },
              Title: (route, navigator, index, navState) => {
                return <Text style={styles.title}>{route.title}</Text>;
              }
            }}
            style={styles.navBar}
          />
        }
      />
      </Container>


      
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    marginTop: 8,
    marginLeft: 12,
    backgroundColor: "#fff",
    height: 24,
    width: 24
  },
  // title: {
  //   fontSize: 25,
  //   color: "#000",
  //   textAlign: "center",
  //   justifyContent: "center"
  // },
  // container: {
  //   backgroundColor: "#fff",
  //   marginTop: 8
  // }
});
