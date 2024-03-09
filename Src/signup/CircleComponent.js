import React from "react";
import { View, StyleSheet } from "react-native";

const CircleComponent = () => (
  <View style={styles.circleContainer}>
    <View style={styles.circle} />
    <View
      style={{
        position: "absolute",
        top: -10,
        left: 110,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        paddingTop: 40,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "rgba(68, 215, 235, 0.5)",
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  circleContainer: {
    position: "absolute",
    top: -70,
    left: -100,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingTop: 40,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(68, 215, 235, 0.5)",
  },
});

export default CircleComponent;
