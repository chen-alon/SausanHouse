import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated
} from "react-native";
import * as firebase from "firebase";
import styles from "./styles";
import Images from "./Images";
import CustomHeader from "./manager/CustomHeader";
import Button2 from "./common/Button2";
import { DotIndicator } from "react-native-indicators";

export default class ForgotPasswordController extends Component {
  static navigationOptions = ({ navigation }) => {};
  static defaultProps = {
    backgroundColor: "#fff",
    titleText: "שכחתי סיסמא",
    submitText: "שלח",
    placeHolderText: "example@domain.com"
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      Password: "",
      spinner: false
    };
  }
  renderButton() {
    if (this.state.spinner) {
      return <DotIndicator color="#004577" />;
    }
    return (
      <Button2
        onPress={() => {
          this.btnSubmitPress();
          this.setState({ spinner: true });
        }}
      >
        שלח
      </Button2>
    );
  }

  /**
   * Validate email
   */
  validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  /**
   * Button submit pressed
   */
  btnSubmitPress() {
    if (this.state.email.trim().length == 0) {
      Alert.alert(
        "איפוס סיסמא",
        "יש להזין כתובת דוא״ל",
        [{ text: "OK", onPress: () => this.setState({ spinner: false }) }],
        { cancelable: false }
      );
    } else if (this.validateEmail(this.state.email) == false) {
      Alert.alert(
        "איפוס סיסמא",
        "כתובת הדוא״ל שהוזנה אינה תיקנית",
        [{ text: "OK", onPress: () => this.setState({ spinner: false }) }],
        { cancelable: false }
      );
    } else {
      this.callForgotPassword();
    }
  }

  setSpinnerState() {}

  /**
   */
  callForgotPassword() {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(username => {
        Alert.alert(
          "איפוס סיסמא",
          "הודעת חידוש סיסמה נשלחה לחשבון הדוא״ל שהזנת בהצלחה",
          [{ text: "OK", onPress: () => this.setState({ spinner: false }) }],
          { cancelable: false }
        );
        username.sendEmailVerification();
      })
      .catch(e => {
        this.setState({ spinner: false });
      });
  }

  /**
   * Button close pressed
   */
  btnClosePress() {
    this.props.callbackAfterForgotPassword(0, this.props.otherParamsToSend);
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <View>
          <Text
            style={{
              paddingTop: 10,
              paddingRight: 10,
              textAlign: "right",
              color: "#004577",
              fontSize: 25,
              fontWeight: "normal",
              fontFamily: "AmaticSC-Bold"
            }}
            onPress={() => navigate("LoginForm")}
          >
            {"<"} חזור לדף הבית
          </Text>
        </View>
        <View
          style={[
            styles.bottomView,
            { backgroundColor: this.props.backgroundColor }
          ]}
        >
          <View>
            <View style={{ paddingTop: 150 }}>
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
                autoCorrect={false}
                keyboardType={"email-address"}
                textAlign="center"
                placeholder={this.props.placeHolderText}
                placeholderStyle={{
                  fontFamily: "AmaticSC-Bold",
                  fontWeight: "normal"
                }}
                placeholderTextColor="#5FA9DD"
                height={45}
                autoCorrect={false}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
            </View>
            <View style={{ paddingTop: 30 }}>{this.renderButton()}</View>
          </View>
        </View>
      </View>
    );
  }
}
