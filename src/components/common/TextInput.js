import { Hoshi } from "react-native-textinput-effects";
import React, { Component } from "react";
import { View } from "react-native";

export default class App extends Component {
  render() {
    return (
      <View>
        {[
          "שם פרטי",
          "שם משפחה",
          "ת.ז",
          "מספר עובד",
          "פלאפון",
          "דואר-אלקטרוני"
        ].map(item => (
          <Hoshi
            key={item}
            label={item}
            // this is used as active border color
            borderColor={"#b76c94"}
            width="20%"
            // active border height
            borderHeight={3}
            inputPadding={40}
            height={20}
            // justifyContent="left"
            textAlign="center"
            // width={40}
            //maxLength={10}
            //paddingLeft={100}
            //paddingRight={30}

            // this is used to set backgroundColor of label mask.
            // please pass the backgroundColor of your TextInput container.
            //backgroundColor={'#fff'}
          />
        ))}
      </View>
    );
  }
}
