import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";

//library imports 
import { Container, Content, Icon, Header, Body, Left} from 'native-base'
import { createDrawerNavigator,createStackNavigator, StackNavigator, DrawerItems, SafeAreaView, createAppContainer } from 'react-navigation'
import firebase from 'firebase';


//custom files 
//import AppStackNavigator from './AppStackNavigator'
import LoginForm from './LoginForm';
import ForgotPasswordController from "./ForgotPasswordController";


const MyApp = createStackNavigator({

  // For each screen that you can navigate to, create a new entry 
  Home: {
    screen: LoginForm, navigationOptions: () => ({
      header: null,
      HeaderProps: null
        })
  },
  ForgotPasswordController: {
    screen: ForgotPasswordController, navigationOptions: () => ({
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#4b6584',
      }
    })
  }


},
  {
    initialRouteName: 'Home',
  });

const Navig2 = createAppContainer(MyApp);
export default Navig2;