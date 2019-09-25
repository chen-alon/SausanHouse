import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

//library imports
import { Container, Content, Icon, Header, Body, Left } from "native-base";
import {
  createDrawerNavigator,
  DrawerItems,
  createAppContainer
} from "react-navigation";
import firebase from "firebase";

import HomePageManager from "../HomePageManager";
import ShiftLogin from "../ShiftLogin";

import MyShifts from "../MyShifts";
import CsvExport from "../CsvExport";
import Code from "../../../Code";
import ForgotPasswordController2 from "../ForgotPasswordController2";
import FollowPage from "../FollowPage";

const CustomDrawerContentComponent = props => (
  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Text
          style={{
            fontSize: 40,
            fontFamily: "AmaticSC-Bold",
            color: "#005D93",
            alignSelf: "center"
          }}
        >
          הבית של
        </Text>
        <Text
          style={{
            fontSize: 40,
            fontFamily: "AmaticSC-Bold",
            color: "#005D93",
            alignSelf: "center"
          }}
        >
          סוזן
        </Text>
      </Body>
    </Header>
    <Content>
      <ScrollView>
        <DrawerItems {...props} />
        <Text
          style={{
            paddingRight: 17,
            paddingTop: 10,
            fontWeight: "bold",
            textAlign: "right",
            color: "#000"
          }}
          onPress={() => firebase.auth().signOut()}
        >
          יציאה מהמערכת
        </Text>
      </ScrollView>
    </Content>
  </Container>
);

const MyApp = createDrawerNavigator(
  {
    // For each screen that you can navigate to, create a new entry
    Home: {
      screen: HomePageManager,
      navigationOptions: { title: "דף הבית" }
    },
    ShiftLogin: {
      screen: ShiftLogin,
      navigationOptions: { title: "שעון נוכחות" }
    },
    MyShifts: {
      screen: MyShifts,
      navigationOptions: { title: "המשמרות שלי" }
    },
    EmployeeDirectoryApp: {
      screen: Code,
      navigationOptions: { title: "חיפוש עובד" }
    },
    FollowPage: {
      screen: FollowPage,
      navigationOptions: { title: "דף מעקב" }
    },
    CsvExport: {
      screen: CsvExport,
      navigationOptions: { title: "ייצוא דוחות נוכחות" }
    },
    ForgotPasswordController2: {
      screen: ForgotPasswordController2,
      navigationOptions: { title: "איפוס סיסמא" }
    }
  },
  {
    initialRouteName: "Home",
    drawerPosition: "right",
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  drawerHeader: {
    height: 200,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  headerText: {
    fontSize: 40,
    fontFamily: "AmaticSC-Bold",
    color: "#005D93",
    alignItems: "center"
  }
});

const Stacknav = createAppContainer(MyApp);
export default Stacknav;
