import React, { useState, useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";

const Info = (props) => {
  const [username, setUserName] = useState("Loading");
  const [email, setEmail] = useState("Loading");
  const [_id, setId] = useState("Loading");
  const [balance, setBalance] = useState(1000.0);

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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    Boiler();
  }, []);


  // Generate QR code data
  const qrData = JSON.stringify({ username, email, _id });
  let logo = require("./icon.png");

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.qrContainer}>
        <QRCode
          value={qrData}
          logo={logo}
          logoSize={45}
          logoBackgroundColor="#fff"
          logoBorderRadius={100 / 4}
          size={200}
        />
      </View>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 20,
    paddingTop: 30,
  },
  button: {
    backgroundColor: "#1974D2",
    padding: 15,
    borderRadius: 5,
    width: 100,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  qrContainer: {
    alignItems: "center",
  },
});
