import { View, Text, StatusBar } from "react-native";
import React from "react";
import AppNavigator from "./Src/AppNavigator";

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
};

export default App;
