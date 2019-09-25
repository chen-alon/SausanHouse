import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default class SearchBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search.."
          onChangeText={this.props.onChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C9C9CE"
  },
  input: {
    height: 40,
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 2
  }
});
