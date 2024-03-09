import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import React, { Component } from "react";

export default class Add extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="To Account"
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="From  Account"
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
        />
        <TextInput
          style={styles.input}
          placeholder="Remarks"
        />

        <TouchableOpacity style={styles.submit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "90%",
    borderWidth: 2,
    borderColor: "grey",
    padding: 8,
    marginTop: 20
  },
  submit: {
    width: "90%",
    borderWidth: 2,
    borderColor: "#1974D2",
    backgroundColor: "#1974D2",
    padding: 8,
    marginTop: 20,
    alignItems: "center", 
    borderRadius: 5
  },
  submitText: {
    color: "white",
    fontWeight: "bold" 
  }
});
