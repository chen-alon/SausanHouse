// Import of libaries

import React, { Component } from "react";
import { AppRegistry, View, StyleSheet } from "react-native";

import Stacknav from "./src/components/manager/Stacknav";

import LoginFormNavigation from "./src/components/LoginFormNavigation";

import firebase from "./components/Firebase";

import TeensStackNavigation from "./src/components/teen/TeensStackNavigation";

console.disableYellowBox = true;

class App extends Component {
  state = { loggedIn: false, role: null };
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false, role: null });
      }
      this.updateFromServer();
    });
  }

  updateFromServer() {
    const flag = true;
    firebase
      .firestore()
      .collection("users")

      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          {
            if (
              `${doc.data().manager}` === "Admin" &&
              `${doc.data().uid}` === firebase.auth().currentUser.uid
            ) {
              this.setState({ role: "Admin" });
              flag = false;
            }

            //
          }
        });
        if (flag === true) {
          this.setState({ role: "User" });
        }
      });
  }

  renderContent() {
    if (!this.state.loggedIn) {
      return (
        <View style={styles.container}>
          <LoginFormNavigation />
        </View>
      );
    }
    if (this.state.role == null) return null;
    else if (this.state.role === "Admin") return <Stacknav />;
    else return <TeensStackNavigation />;
  }

  render() {
    return <View style={styles.container}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexGrow: 1
    //  justifyContent: 'flex-end'
  },
  container2: {
    backgroundColor: "#fff",
    flexGrow: 1
    //  justifyContent: 'flex-end'
  }
});

AppRegistry.registerComponent("SusanHouse", () => App);
