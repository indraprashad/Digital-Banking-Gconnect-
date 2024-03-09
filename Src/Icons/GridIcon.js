import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const GridIcon = () => {
  const navigation = useNavigation();

  const handleGridItemPress = (itemName, routeName) => {
    if (routeName === "Scan") {
      navigation.navigate("Scan");
    } else if (routeName === "Codes") {
      navigation.navigate("Codes");
    } else if (routeName === "History") {
      navigation.navigate("History");
    } else if (routeName === "Recharge") {
      navigation.navigate("Recharge");
    } else if (routeName === "Transfer") {
      navigation.navigate("Transfer");
    } else if (routeName === "Support") {
      navigation.navigate("Support");
    } else if (routeName === "FAQ") {
      navigation.navigate("FAQ");
    } else if (routeName === "Calender") {
      navigation.navigate("Calender");
    } else if (routeName === "Settings") {
      navigation.navigate("Settings");
    } else {
      alert(`Pressed ${itemName}`);
    }
  };

  const gridItems = [
    { name: "Scan", icon: "camera", route: "Scan" },
    { name: "QR Code", icon: "qr-code", route: "Codes" },
    { name: "History", icon: "history", route: "History" },
    { name: "Recharge", icon: "phone", route: "Recharge" },
    { name: "Transfer", icon: "repeat", route: "Transfer" },
    { name: "Support", icon: "support", route: "Support" },
    { name: "F.A.Q", icon: "info", route: "FAQ" },
    { name: "Calender", icon: "event", route: "Calender" },
    { name: "Setting", icon: "settings", route: "Settings" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {gridItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.gridItem}
            onPress={() => handleGridItemPress(item.name, item.route)}
          >
            <Icon name={item.icon} type="material" size={40} color="#1974D2" />
            <Text style={styles.gridItemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  gridItem: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: 100,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 3,
  },
  gridItemText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default GridIcon;
