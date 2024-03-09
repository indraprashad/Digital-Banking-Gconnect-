import React from "react";
import { View, TextInput, Button, StyleSheet, Image, email } from "react-native";

const ForgotPasswordScreen = () => {
  const handleResetPassword = (email) => {
    // Add logic to send a password reset email to the provided email address
    console.log(`Password reset email sent to: ${email}`);
  };

  return (
    <View style={styles.container}>
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
      <Image source={require("../Images/img22.png")} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter secret code"
        keyboardType="number-pad"
        autoCapitalize="none"
      />
      <Button
        title="Reset Password"
        onPress={() => handleResetPassword(email)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
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
  logo: {
    width: 143,
    height: 161,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ForgotPasswordScreen;
