import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TextInput
} from "react-native";
import Button from "../src/components/common/Button";
import firebase from "./Firebase";
import { DotIndicator } from "react-native-indicators";
import { Container, Footer } from "native-base";

class EditBoardScreen extends Component {
  static navigationOptions = {
    title: "עריכת עובד",
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
    this.state = {
      key: "",
      isLoading: true,
      FirstName: "",
      LastName: "",
      ID: "",
      EmployeeNumber: "",
      Email: "",
      PhoneNumber: "",
      DateOfBirth: ""
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase
      .firestore()
      .collection("users")
      .doc(JSON.parse(navigation.getParam("boardkey")));

    ref.get().then(doc => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          FirstName: board.FirstName,
          LastName: board.LastName,
          ID: board.ID,
          EmployeeNumber: board.EmployeeNumber,
          Email: board.Email,
          PhoneNumber: board.PhoneNumber,
          DateOfBirth: board.DateOfBirth,
          uid: board.uid,
          manager: board.manager,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  updateBoard() {
    this.setState({
      isLoading: true
    });
    const { navigation } = this.props;
    const updateRef = firebase
      .firestore()
      .collection("users")
      .doc(this.state.key);
    updateRef
      .set({
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        ID: this.state.ID,
        EmployeeNumber: this.state.EmployeeNumber,
        Email: this.state.Email,
        PhoneNumber: this.state.PhoneNumber,
        DateOfBirth: this.state.DateOfBirth,
        uid: this.state.uid,
        manager: this.state.manager
      })
      .then(docRef => {
        this.setState({
          key: "",
          FirstName: "",
          LastName: "",
          ID: "",
          EmployeeNumber: "",
          Email: "",
          PhoneNumber: "",
          DateOfBirth: "",
          uid: "",
          manager: "",
          isLoading: false
        });
        this.props.navigation.navigate("users");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        this.setState({
          isLoading: false
        });
      });
    {
      this.props.navigation.navigate("Board", {
        boardkey: `${JSON.stringify(this.state.key)}`
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <DotIndicator color="#004577" />
        </View>
      );
    }
    return (
      <Container>
        <ScrollView>
          <View style={styles.subContainer}>
            <TextInput
              style={{
                fontSize: 22,

                fontFamily: "AmaticSC-Bold",
                fontWeight: "normal"
              }}
              placeholder={"First name"}
              placeholderStyle={{
                fontFamily: "AmaticSC-Bold"
              }}
              value={this.state.FirstName}
              onChangeText={text => this.updateTextInput(text, "FirstName")}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
              style={{
                fontSize: 22,

                fontFamily: "AmaticSC-Bold",
                fontWeight: "normal"
              }}
              placeholder={"Last name"}
              placeholderStyle={{
                fontFamily: "AmaticSC-Bold"
              }}
              value={this.state.LastName}
              onChangeText={text => this.updateTextInput(text, "LastName")}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
              style={{
                fontSize: 22,

                fontFamily: "AmaticSC-Bold",
                fontWeight: "normal"
              }}
              placeholder={"Id"}
              placeholderStyle={{
                fontFamily: "AmaticSC-Bold"
              }}
              value={this.state.ID}
              onChangeText={text => this.updateTextInput(text, "ID")}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
              style={{
                fontSize: 22,

                fontFamily: "AmaticSC-Bold",
                fontWeight: "normal"
              }}
              placeholder={"Employee number"}
              placeholderStyle={{
                fontFamily: "AmaticSC-Bold"
              }}
              value={this.state.EmployeeNumber}
              onChangeText={text =>
                this.updateTextInput(text, "EmployeeNumber")
              }
            />
          </View>

          <View style={styles.subContainer}>
            <TextInput
              style={{
                fontSize: 22,

                fontFamily: "AmaticSC-Bold",
                fontWeight: "normal"
              }}
              placeholder={"Phone number"}
              placeholderStyle={{
                fontFamily: "AmaticSC-Bold"
              }}
              value={this.state.PhoneNumber}
              onChangeText={text => this.updateTextInput(text, "PhoneNumber")}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
              style={{
                fontSize: 22,

                fontFamily: "AmaticSC-Bold",
                fontWeight: "normal"
              }}
              placeholder={"Date of birth"}
              placeholderStyle={{
                fontFamily: "AmaticSC-Bold"
              }}
              value={this.state.DateOfBirth}
              onChangeText={text => this.updateTextInput(text, "DateOfBirth")}
            />
          </View>

          <View style={styles.button}>
            <Button
              onPress={() => {
                {
                  this.updateBoard();
                }
              }}
            >
              עדכן פרטים
            </Button>
          </View>
        </ScrollView>
      </Container>
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

export default EditBoardScreen;
