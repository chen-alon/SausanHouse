import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Header, Body, Title, Content, Left, Icon, Right } from "native-base";

class CustomHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Icon
            name="ios-menu"
            onPress={() => this.props.drawerOpen()}
            style={styles.icon}
          />
        </Left>
        <Body>
          <Title style={styles.header}>{this.props.title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

const styles = {
  header: {
    fontSize: 26,
    color: "#fff",
    fontFamily: "AmaticSC-Bold"
    //  alignSelf: "center"
  },
  icon: {
    color: "#fff"
  }
};
export default CustomHeader;
