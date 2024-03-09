import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Verify = ({ actionType }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let actionText;
  if (actionType === "recharge") {
    actionText = "recharge";
  } else if (actionType === "transfer") {
    actionText = "fund transfer";
  } else {
    actionText = "action";
  }

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem("token", data.token);
        console.log(data);
        // Navigate based on actionType after successful verification
      } else {
        Alert.alert("Verification Failed", "Invalid password");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during verification");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    // Your logic for cancel action
    // Here, you can navigate to another screen or perform any other action
    Alert.alert("Verification Cancelled", "Verification process has been cancelled.");
  };

  useEffect(() => {
    // onSubmit(); // If you want to automatically submit on component mount, uncomment this line
  }, []);

  return (
    <View style={styles.container}>
      <Text>Please enter your password to verify {actionText}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit} disabled={loading}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={onCancel} disabled={loading}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  submitButton: {
    backgroundColor: "#1974D2",
    padding: 10,
    borderRadius: 5,
    width: "48%",
  },
  cancelButton: {
    backgroundColor: "#1974D2",
    padding: 10,
    borderRadius: 5,
    width: "48%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default Verify;
