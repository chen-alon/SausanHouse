import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({ onPress, children }) => {
  const { buttonStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text
        style={{
          fontFamily: "AmaticSC-Bold",
          alignSelf: "center",
          color: "#94C9E8",
          fontSize: 20,
          //fontWeight: "600",
          paddingTop: 10,
          paddingBottom: 10
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    alignSelf: "center",
    fontFamily: "AmaticSC-Bold",
    // flex: 1,
    alingSelf: "stretch",
    backgroundColor: "#005D93",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E2DCDE",
    // marginLeft: 5,
    // marginRight: 5,
    width: "90%"
  }
};

export default Button;
