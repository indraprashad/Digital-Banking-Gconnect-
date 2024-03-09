import React from "react";
import { View, Image, StyleSheet,Text } from "react-native";

const ImageComponent = () => (
  <View style={styles.imageContainer}>
    <Image source={require("../Images/img22.png")} style={styles.image} />
    <Text style={styles.title}>Welcome to Global Connect</Text>
      <Text style={styles.subtitle}>Let's help you meet all your tasks</Text>
  </View>
);

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  image: {
    width: 143,
    height: 161,
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
    fontStyle: "normal",
  },
});

export default ImageComponent;
