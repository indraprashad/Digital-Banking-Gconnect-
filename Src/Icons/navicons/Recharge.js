import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import PhoneInput from "react-native-phone-input";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Recharge = () => {
  const [selectedSim, setSelectedSim] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = async () => {
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
      setUserId(data._id);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  const onSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/recharge`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            selectedSim: selectedSim,
            phoneNumber: phoneNumber,
            amount: amount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Recharge failed");
      }

      Alert.alert(
        "Recharge Successful",
        `Selected SIM Type: ${selectedSim}\nPhone Number: ${phoneNumber}\nAmount: ${amount}`,
        [{ text: "OK" }]
      );

      // Clear input values
      setPhoneNumber("");
      setAmount("");
      setSelectedSim("");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Recharge Failed",
        "An error occurred while processing your recharge."
      );
    }
  };

  const onCancel = () => {
    Alert.alert("Recharge Cancelled", "Recharge process has been cancelled.");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Source Account"
        keyboardType="ascii-capable"
        value={userId}
        editable={false}
      />
      <Picker
        selectedValue={selectedSim}
        onValueChange={(itemValue) => setSelectedSim(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Sim Type" value="" enabled={false} />
        <Picker.Item label="Jio" value="Jio" />
        <Picker.Item label="Vodafone" value="Vodafone" />
        <Picker.Item label="Airtel" value="Airtel" />
      </Picker>

      <PhoneInput
        value={phoneNumber}
        onChangePhoneNumber={(number) => setPhoneNumber(number)}
        initialCountry="US"
        style={styles.phoneInput}
        flagStyle={styles.phoneInputFlag}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  picker: {
    height: 40,
    width: "100%",
    marginBottom: 10,
    backgroundColor: "white",
  },
  phoneInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  phoneInputFlag: {
    marginRight: 10,
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

export default Recharge;
