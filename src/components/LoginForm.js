import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Alert,
  Image,
  Platform
} from "react-native";
import Button from "./common/Button";

import firebase from "firebase";
import { DotIndicator } from "react-native-indicators";

import { View } from "native-base";
import Video from "react-native-video";

class LoginForm extends React.Component {
  state = { username: "", password: "", error: "", loading: false };

  onButtonPress() {
    const { username, password } = this.state;
    this.setState({ error: "", loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
  }

  onLoginFail() {
    this.setState({ loading: false });
    Alert.alert(
      "שגיאה",
      "שם משתמש ו/או סיסמה אינם נכונים",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  onLoginSuccess() {
    this.setState({
      username: "",
      password: "",
      loading: false,
      error: ""
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <DotIndicator color="#004577" />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}> כניסה </Button>;
  }

  render() {
    return (
      <View style={styles.videoView}>
        <Video
          repeat
          source={{ uri: "fluid" }}
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
          opacity={0.6}
        />

        <View>
          <KeyboardAvoidingView
            behavior={"padding"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -140}
          >
            <View style={styles.Content}>
              <Image
                source={require("./images/logoS.png")}
                style={{ width: 200, height: 200, alignSelf: "center" }}
              />
            </View>
            <View style={styles.Content2}>
              <TextInput
                style={{
                  borderColor: "#004577",
                  borderRadius: 25,
                  borderWidth: 2,
                  fontSize: 22,
                  width: "80%",
                  alignSelf: "center",
                  backgroundColor: "transparent",
                  fontFamily: "AmaticSC-Bold",
                  fontWeight: "normal"
                }}
                textAlign="center"
                placeholder={"שם משתמש"}
                placeholderStyle={{
                  fontFamily: "AmaticSC-Bold"
                }}
                placeholderTextColor="#004577"
                height={45}
                autoCorrect={false}
                onChangeText={username => this.setState({ username })}
                value={this.state.username}
              />
            </View>
            <View style={styles.Content2}>
              <TextInput
                style={{
                  borderColor: "#004577",
                  borderRadius: 25,
                  borderWidth: 2,
                  fontSize: 22,
                  width: "80%",
                  alignSelf: "center",
                  backgroundColor: "transparent",
                  fontFamily: "AmaticSC-Bold"
                }}
                textAlign="center"
                placeholder={"סיסמא"}
                placeholderStyle={{
                  fontFamily: "AmaticSC-Bold"
                }}
                placeholderTextColor="#004577"
                secureTextEntry={true}
                autoCorrect={false}
                height={45}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </View>
            <View style={styles.Content}>{this.renderButton()}</View>
            <Text style={styles.errorTextStyle}>{this.state.error}</Text>
            <View>
              <Text
                style={styles.forgetPassword}
                onPress={() =>
                  this.props.navigation.navigate("ForgotPasswordController")
                }
              >
                שכחתי סיסמא
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 18,
    justifyContent: "center",
    marginRight: 5,
    marginLeft: 5,
    marginTop: 8,
    flex: 1,
    color: "#2d3436"
    // fontFamily: "AmaticSC-Bold"
  },

  forgetPassword: {
    color: "#130f40",
    fontSize: 25,
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "AmaticSC-Bold"
  },

  Content: {
    paddingTop: 30,
    paddingBottom: 30
  },

  Content2: {
    paddingTop: 20,
    paddingBottom: 20
    // fontFamily: "AmaticSC-Bold"
  },
  videoView: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center"
  },
  login: {
    fontFamily: "AmaticSC-Bold"
  }
});

export default LoginForm;
