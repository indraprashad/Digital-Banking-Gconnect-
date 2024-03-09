import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Info = (props) => {
  const [username, setUserName] = useState("Loading");
  const [email, setEmail] = useState("Loading");
  const [_id, setId] = useState("Loading");
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
      setEmail(data.email);
      setId(data._id);
      setUserId(data._id);
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
  }, []);

  useEffect(() => {
    fetchBalance(); 
  }, [userId]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{username}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Account Number:</Text>
        <Text style={styles.value}>{_id}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Balance:</Text>
        <Text style={styles.value}>{balance}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Account Type:</Text>
        <Text style={styles.value}>Saving</Text>
      </View>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    width: "95%",
    marginLeft: 8,
    borderRadius: 15,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    marginVertical: 5,
  },
  label: {
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
    fontSize: 18,
  },
  value: {
    flex: 1,
    textAlign: "justify",
    fontSize: 18,
    textTransform: "uppercase",
  },
});
