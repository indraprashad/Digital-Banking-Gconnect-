import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const History = () => {
  const [username, setUserName] = useState("Loading");
  const [_id, setId] = useState("Loading");
  const [amount, setAmount] = useState("Loading");
  const [balance, setBalance] = useState("show");
  const [userId, setUserId] = useState(null);

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
      setUserName(data.username);
      setId(data._id);
      setUserId(data._id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Transfer = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/transfer`
      );
      const data = await response.json();
      console.log(data);
      if (data.length > 0) {
        const firstTransfer = data[0];
        const amount = firstTransfer.amount;
        console.log("Amount:", amount);
        setAmount(amount);
      } else {
        console.log("No transfer data found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBalance = async () => {
    try {
      if (!userId) return;

      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/balance?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setBalance(data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    Boiler();
    Transfer();
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [userId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{username}</Text>
        <TouchableOpacity>
          <Icon name="more-horiz" size={30} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.mainText}>
          Your Account {_id} has been credited with INR {amount} on{" "}
          {new Date().toLocaleString()} and your avail.BAL. IS INR {balance}.
        </Text>
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 20,
    borderRadius: 15,
    width: "95%",
    marginLeft: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    flex: 1,
    textTransform: "uppercase",
  },
  icon: {
    marginRight: 10,
  },
  mainText: {
    textTransform: "uppercase",
    textAlign: "justify",
  },
});
