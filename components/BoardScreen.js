import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Text
} from "react-native";
import { List, ListItem, Icon, Button } from "react-native-elements";
import firebase from "./Firebase";
import { DotIndicator } from "react-native-indicators";
import CustomHeader from "../src/components/manager/CustomHeader";
import { Container, Footer } from "native-base";

class BoardScreen extends Component {
  static navigationOptions = ({ navigation }) => ({ header: null });
  constructor() {
    super();
    this.ref = firebase.firestore().collection("users");
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      boards: []
    };
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  onCollectionUpdate = querySnapshot => {
    const boards = [];
    querySnapshot.forEach(doc => {
      const {
        FirstName,
        LastName,
        ID,
        EmployeeNumber,
        Email,
        PhoneNumber,
        DateOfBirth
      } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        FirstName,
        LastName,
        ID,
        EmployeeNumber,
        Email,
        PhoneNumber,
        DateOfBirth
      });
    });
    this.setState({
      boards,
      isLoading: false
    });
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
      <Container>
        <CustomHeader
          title="חיפוש עובד"
          drawerOpen={() => this.props.navigation.openDrawer()}
        />

        <ScrollView style={styles.container}>
          <View />
          {this.state.boards.map((item, i) => (
            <ListItem
              titleStyle={{
                fontSize: 24,
                fontFamily: "AmaticSC-Bold",
                color: "#005D93"
              }}
              key={i}
              title={item.FirstName + " " + item.LastName}
              rightIcon={{
                name: "user",
                type: "simple-line-icon",
                color: "#004577"
              }}
              onPress={() => {
                this.props.navigation.navigate("BoardDetails", {
                  boardkey: `${JSON.stringify(item.key)}`
                });
              }}
            />
          ))}
        </ScrollView>
        <View>
          <Icon
            raised
            name="user-follow"
            type="simple-line-icon"
            color="#004577"
            onPress={() => this.props.navigation.push("AddBoard")}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
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

export default BoardScreen;
