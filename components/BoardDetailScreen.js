import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Alert
} from "react-native";
import { List, ListItem, Text, Card, Button } from "react-native-elements";
import firebase from "./Firebase";
import { DotIndicator } from "react-native-indicators";
import Button3 from "../src/components/common/Button3";

class BoardDetailScreen extends Component {
  static navigationOptions = {
    title: "פרטי עובד",
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
      isLoading: true,
      board: {},
      key: ""
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
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }
  deleteBoard(key, uid) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });

    var jobskill_query = firebase
      .firestore()
      .collection("shifts")
      .where("Uid", "==", uid);

    jobskill_query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });

    

    firebase
      .firestore()
      .collection("users")
      .doc(key)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.setState({
          isLoading: false
        });
        navigation.navigate("Board");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
        this.setState({
          isLoading: false
        });
      });
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
      <ScrollView>
        <View style={styles.subContainer}>
          <View style={styles.details}>
            <Text style={styles.textStyle}>
              {"שם פרטי: " + this.state.board.FirstName}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.textStyle}>
              {"שם משפחה: " + this.state.board.LastName}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.textStyle}>
              {"ת.ז: " + this.state.board.ID}
            </Text>
          </View>

          <View style={styles.details}>
            <Text style={styles.textStyle}>
              {"מספר עובד: " + this.state.board.EmployeeNumber}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.textStyle}>
              {"כתובת אימייל: " + this.state.board.Email}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.textStyle}>
              {"מספר פלאפון: " + this.state.board.PhoneNumber}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.textStyle}>
              {"תאריך לידה: " + this.state.board.DateOfBirth}
            </Text>
          </View>
        </View>

        <View style={styles.detailButton}>
          <Button3
            onPress={() => {
              this.props.navigation.navigate("EditBoard", {
                boardkey: `${JSON.stringify(this.state.key)}`
              });
            }}
          >
            עריכת פרופיל
          </Button3>
        </View>
        <View style={styles.detailButton}>
          <Button3
            onPress={() => {
              {
                Alert.alert(
                  "מחיקת עובד",
                  "האם את/ה בטוח/ה שברצונך למחוק את פרופיל העובד?",
                  [
                    {
                      text: "מחק עובד",
                      onPress: () => {
                        this.deleteBoard(this.state.key, this.state.board.uid);
                      }
                    },
                    {
                      text: "ביטול",
                      onPress: () => console.log("Cancel Pressed")
                      // style: "cancel"
                    }
                  ],
                  { cancelable: false }
                );
              }
            }}
          >
            מחיקת פרופיל
          </Button3>
        </View>
        <View style={styles.detailButton}>
          <Button3
            onPress={() => {
              this.props.navigation.navigate("EditShifts", {
                boardkey: `${JSON.stringify(this.state.key)}`
              });
            }}
          >
            עריכת משמרות
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
    paddingBottom: 20,
    // borderBottomWidth: 2,
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
  },
  detailButton: {
    marginTop: 10
  },
  details: {
    justifyContent: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: "#CCCCCC"
  },
  textStyle: {
    textAlign: "right",
    fontFamily: "AmaticSC-Bold",
    color: "#005D93",
    fontSize: 30
  }
});

export default BoardDetailScreen;
