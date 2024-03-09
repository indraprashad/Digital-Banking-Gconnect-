import React from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomHeader = ({ navigation }) => {
  const handleNotification = () => {};

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("token");
              navigation.navigate("Login");
            } catch (ex) {
              console.error("Error removing token:", ex);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleNotification}
        style={styles.iconContainer}
      >
        <Icon name="notifications" size={24} color="#F39C12" />
      </TouchableOpacity>

      <Text style={styles.text}>
        <Text style={styles.OrangeText}>𝐆</Text>
        <Text style={styles.WhiteText}>connect</Text>
      </Text>

      <TouchableOpacity onPress={handleLogout} style={styles.iconContainer}>
        <Icon name="logout" size={24} color="#F39C12" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#1974D2",
  },
  iconContainer: {
    padding: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  OrangeText: {
    color: "#F39C12",
    fontSize:35,
  },
  WhiteText: {
    color: "#fff",
    fontSize:30,
  },
};
