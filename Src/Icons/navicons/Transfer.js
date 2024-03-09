import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Transfer = () => {
  const [senderId, setSenderId] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");

  const onSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/transfer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            _id: senderId,
            recipient,
            amount: parseFloat(amount),
            remarks,
          }),
        }
      );
      if (response.ok) {
        Alert.alert(
          "Transaction Successful",
          "Transaction has been completed."
        );
        setRecipient("");
        setAmount("");
        setRemarks("");
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error("Error performing transaction:", error);
      Alert.alert(
        "Transaction Failed",
        "Failed to complete the transaction. Please try again later."
      );
    }
  };

  const onCancel = () => {
    Alert.alert(
      "Transaction Cancelled",
      "Transaction process has been cancelled."
    );
  };

  const Boiler = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/username`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();
      setSenderId(data._id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    Boiler();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Sender Account"
        keyboardType="ascii-capable"
        value={senderId}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Recipient Account"
        keyboardType="ascii-capable"
        value={recipient}
        onChangeText={setRecipient}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Remarks"
        keyboardType="ascii-capable"
        value={remarks}
        onChangeText={setRemarks}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={{ color: "white", textAlign: "center" }}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={{ color: "white", textAlign: "center" }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Transfer;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
});
