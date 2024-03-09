import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import LogoGif from "../Images/original.gif";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = () => {
  const navigation = useNavigation();
  const animatedValues = useRef(
    [...Array(8)].map(() => new Animated.Value(0))
  ).current;

  const Boiler = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/signin`, {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Login!");
        const data = await res.json();
        console.log(data);
        //TODO:  You might want to store user profile in async storage AsyncStorage.setItem('user', data);
        navigation.dispatch(StackActions.replace("Parent"));
      })
      .catch((err) => {
        navigation.dispatch(StackActions.replace("Login"));
      });
  };

  useEffect(() => {
    Boiler()
  }, []);
  useEffect(() => {
    const animations = animatedValues.map((value, index) =>
      Animated.timing(value, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      })
    );
    Animated.stagger(100, animations).start();
  }, [animatedValues]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
      {/* Logo GIF */}
      <ImageBackground source={LogoGif} style={{ width: 100, height: 100 }} />

      {/* Gconnect Text */}
      <Text style={{ fontSize: 24, color: "blue", marginTop: 10 }}>
        Gconnect
      </Text>

      <View style={{ flexDirection: "row" }}>
        {["L", "o", "a", "d", "i", "n", "g", "..."].map((letter, index) => (
          <Animated.Text
            key={index}
            style={{
              fontSize: 18,
              color: "green",
              opacity: animatedValues[index],
              transform: [
                {
                  translateY: animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            }}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
};

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

export default Splash;
