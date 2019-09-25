import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TextInput
} from "react-native";
import { Container } from "native-base";
import { Button, CheckBox } from "react-native-elements";
import firebase, { secondFirebaseInstance } from "./Firebase";
import { DotIndicator } from "react-native-indicators";
import Button3 from "../src/components/common/Button3";

class AddBoardScreen extends Component {
  static navigationOptions = {
    title: "הוספת עובד",
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
  constructor() {
    super();
    this.ref = firebase.firestore().collection("users");
    this.state = {
      FirstName: "",
      LastName: "",
      ID: "",
      EmployeeNumber: "",
      Email: "",
      PhoneNumber: "",
      DateOfBirth: "",
      manager: "",
      uid: "",
      checked: false,
      isLoading: false
    };
  }
  updateTextInput = (text, field) => {
    this.setState({ [field]: text });
  };

  saveBoard() {
    this.setState({
      isLoading: true
    });
    secondFirebaseInstance
      .auth()
      .createUserWithEmailAndPassword(this.state.Email, this.state.PhoneNumber)
      .then(() => {
        this.setState({
          uid: secondFirebaseInstance.auth().currentUser.uid
        });
        this.ref.add({
          FirstName: this.state.FirstName,
          LastName: this.state.LastName,
          ID: this.state.ID,
          EmployeeNumber: this.state.EmployeeNumber,
          Email: this.state.Email,
          PhoneNumber: this.state.PhoneNumber,
          DateOfBirth: this.state.DateOfBirth,
          manager: this.state.manager,
          uid: this.state.uid
        });
        secondFirebaseInstance.auth().signOut();
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        this.setState({
          isLoading: false
        });
      });
    // this.createNewUserRev2(this.state.Email, this.state.PhoneNumber)
    // this.updateTextInput(id, "uid");
  }

  checkBoxPressed = () =>
    this.setState({
      checked: !this.state.checked
    });

  setAdmin = checked => {
    if (checked === true) {
      this.updateTextInput("Admin", "manager");
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <DotIndicator color="#004577" />
        </View>
      );
    }
    return (
      <ScrollView>
        <View style={styles.subContainer}>
          <TextInput
            style={{
              fontSize: 22,
              backgroundColor: "transparent",
              fontFamily: "AmaticSC-Bold",
              fontWeight: "normal"
            }}
            placeholderStyle={{
              fontFamily: "AmaticSC-Bold",
              fontWeight: "normal"
            }}
            placeholder={"First name"}
            value={this.state.FirstName}
            onChangeText={text => this.updateTextInput(text, "FirstName")}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            style={{
              fontSize: 22,
              backgroundColor: "transparent",
              fontFamily: "AmaticSC-Bold",
              fontWeight: "normal"
            }}
            placeholderStyle={{
              fontFamily: "AmaticSC-Bold",
              fontWeight: "normal"
            }}
            placeholder={"Last name"}
            value={this.state.LastName}
            onChangeText={text => this.updateTextInput(text, "LastName")}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            style={{
              fontSize: 22,
              backgroundColor: "transparent",
              fontFamily: "AmaticSC-Bold",
              fontWeight: "normal"
            }}
            placeholderStyle={{
              fontFamily: "AmaticSC-Bold",
              fontWeight: "normal"
            }}
            placeholder={"Id"}
            value={this.state.ID}
            onChangeText={text => this.updateTextInput(text, "ID")}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            style={{
              fontSize: 22,
              backgroundColor: "transparent",
              fontFamily: "AmaticSC-Bold",
              fontWeight: "normal"
            }}
            placeholderStyle={{
              fontFamily: "AmaticSC-Bold",
              fontWeight: "normal"
            }}
            placeholder={"Employee number"}
            value={this.state.EmployeeNumber}
            onChangeText={text => this.updateTextInput(text, "EmployeeNumber")}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            style={{
              fontSize: 22,
              backgroundColor: "transparent",
              fontFamily: "AmaticSC-Bold",
              fontWeight: "normal"
            }}
            placeholderStyle={{
              fontFamily: "AmaticSC-Bold",
              fontWeight: "normal"
            }}
            placeholder={"Email"}
            value={this.state.Email}
            onChangeText={text => this.updateTextInput(text, "Email")}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            style={{
              fontSize: 22,
              backgroundColor: "transparent",
              fontFamily: "AmaticSC-Bold",
              fontWeight: "normal"
            }}
            placeholderStyle={{
              fontFamily: "AmaticSC-Bold",
              fontWeight: "normal"
            }}
            placeholder={"Phone number"}
            value={this.state.PhoneNumber}
            onChangeText={text => this.updateTextInput(text, "PhoneNumber")}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            style={{
              fontSize: 22,
              backgroundColor: "transparent",
              fontFamily: "AmaticSC-Bold",
              fontWeight: "normal"
            }}
            placeholderStyle={{
              fontFamily: "AmaticSC-Bold",
              fontWeight: "normal"
            }}
            placeholder={"Date of birth"}
            value={this.state.DateOfBirth}
            onChangeText={text => this.updateTextInput(text, "DateOfBirth")}
          />
        </View>

        <View>
          <CheckBox
            textStyle={{
              fontSize: 20,
              fontFamily: "AmaticSC-Bold",
              fontWeight: "normal"
            }}
            fontFamily="AmaticSC-Bold"
            fontWeight="normal"
            center
            title="מנהל"
            checked={this.state.checked}
            onPress={() => this.checkBoxPressed()}
          />
        </View>

        <View style={{ paddingTop: 20 }}>
          <Button3
            onPress={() => {
              this.setAdmin(this.state.checked);
              this.saveBoard();
              // this.createNewAcount(this.state.Email, this.state.PhoneNumber);
            }}
          >
            שמירת פרטים
          </Button3>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#CCCCCC"
  },
  activity: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default AddBoardScreen;
