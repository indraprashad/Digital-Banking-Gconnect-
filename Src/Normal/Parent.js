import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StackActions, useNavigation } from "@react-navigation/native";
import GridIcon from "../Icons/GridIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Parent = (props) => {
  const [username, setUserName] = useState("Loading");
  const [_id, setId] = useState("Loading");
  const [balance, setBalance] = useState(null);
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [showBalance, setShowBalance] = useState(false);

  const handleAddAccount = () => {
    navigation.navigate("Info");
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
      setUserName(data.username);
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

  const handleAddMoney = () => {
    navigation.navigate("Add");
  };
  return (
    <View style={styles.container}>
      <View style={styles.square}>
        <View style={styles.profileInfo}>
          <Image
            source={require("../Images/img22.png")}
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{username}</Text>
            <Text style={styles.Account}>Account: {_id}</Text>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              <Text style={styles.balance}>
                Balance: {showBalance ? (balance ? balance : "Show") : "Show"}
              </Text>
            </TouchableOpacity>
            <Text style={styles.buttonText} onPress={handleAddAccount}>
              More Details{" "}
              <Icon
                name="keyboard-arrow-up"
                size={24}
                color="#333340"
                style={styles.iconss}
              />
              <Icon
                name="keyboard-arrow-down"
                size={24}
                color="#333340"
                style={styles.iconss}
              />
            </Text>
            <TouchableOpacity>
              <Text style={[styles.AddMoney]} onPress={handleAddMoney}>ADD MONEY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <GridIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: "100%",
    height: 390,
    backgroundColor: "#1974D2",
    marginLeft: 0,
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  profileInfo: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 90,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 25,
    marginTop: 10,
  },
  userInfo: {
    marginLeft: 20,
    paddingTop: 20,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 40,
    paddingHorizontal: 60,
    paddingTop: 20,
  },
  OrangeText: {
    color: "#F39C12",
  },
  WhiteText: {
    color: "#fff",
  },
  balance: {
    color: "white",
    fontSize: 20,
    marginTop: -5,
  },
  Account: {
    color: "white",
    fontSize: 20,
    marginTop: -5,
    marginBottom: 5,
  },
  name: {
    color: "#F39C12",
    fontSize: 20,
    marginTop: 5,
    fontStyle: "normal",
    marginBottom: 5,
    textAlign: "center",
    textTransform: "uppercase",
  },
  button: {
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 30,
    borderColor: "#F39C12",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    marginTop: -5,
    paddingTop: 10,
  },
  iconContainer: {
    padding: 20,
    paddingTop: 40,
  },
  iconss: {
    marginLeft: 5,
    marginTop: 10,
    color: "#fff",
  },
  AddMoney:{
    backgroundColor:"#1974D2",
    padding: 10,
    marginTop:20,
    borderRadius:15,
    textAlign:"center",
    borderWidth:2,
    borderColor:"#F39C12",
    color:"#fff",
    fontSize:18,
  }
});

export default Parent;
