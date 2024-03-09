import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const FormComponent = ({
  handleChange,
  handleBlur,
  handleSubmit,
  values,
  errors,
  touched,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={handleChange("username")}
        onBlur={handleBlur("username")}
        value={values.username}
      />
      {touched.username && errors.username && (
        <Text style={styles.error}>{errors.username}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        value={values.email}
      />
      {touched.email && errors.email && (
        <Text style={styles.error}>{errors.email}</Text>
      )}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          value={values.password}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      {touched.password && errors.password && (
        <Text style={styles.error}>{errors.password}</Text>
      )}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          secureTextEntry={!showConfirmPassword}
          onChangeText={handleChange("confirmPassword")}
          onBlur={handleBlur("confirmPassword")}
          value={values.confirmPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons
            name={showConfirmPassword ? "eye" : "eye-off"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      {touched.confirmPassword && errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      )}

      <Button title="Create Account" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 30,
    width: "100%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 30,
    width: "100%",
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});

export default FormComponent;
