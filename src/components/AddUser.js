import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text
} from "native-base";
import TextInput from "./common/TextInput";

import Icon from "react-native-vector-icons/FontAwesome";

class AddUser extends Component {
  render() {
    return (
      <View>
        <Header style={styles.container}>
          <Text style={styles.HeaderText}>הוספת חניך</Text>
        </Header>
      <ScrollView>

        <TextInput />
        <Button style={styles.buttonStyle}>
          <Text style={styles.textStyle}>הוספה</Text>
        </Button>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  HeaderText: {
    fontSize: 25,
    color: "#fff",
    textAlign: "center",
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: "#b76c94",
    justifyContent: "center",
    textAlign: "center"
  },
  textStyle: {
    fontSize: 18,
    justifyContent: "center",
    marginRight: 5,
    marginLeft: 5
  },
  container: {
    flexGrow: 1,
    justifyContent: "flex-end",
    backgroundColor: "#fff"
  },
  buttonStyle: {
    backgroundColor: "#b76c94",
    textAlign: "center",
    alignSelf: "center",
    color: "#000",
    padding: 30,
    fontSize: 25,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    width: "60%",
    marginTop: 50
  },
  container: {
    backgroundColor: "#b76c94"
  }
});

export default AddUser;
