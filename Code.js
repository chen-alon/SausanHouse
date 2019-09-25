import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import BoardScreen from "./components/BoardScreen";
import BoardDetailScreen from "./components/BoardDetailScreen";
import AddBoardScreen from "./components/AddBoardScreen";
import EditBoardScreen from "./components/EditBoardScreen";
import EditShifts from "./components/EditShifts";

const RootStack = createStackNavigator(
  {
    Board: BoardScreen,
    BoardDetails: BoardDetailScreen,
    AddBoard: AddBoardScreen,
    EditBoard: EditBoardScreen,
    EditShifts: EditShifts
  },
  {
    initialRouteName: "Board",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#777777"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerBackTitle: null
    }
  }
);

const App = createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
