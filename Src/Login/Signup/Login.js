import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginScreen = (prop) => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem("token", data.token);
        console.log(data);
        navigation.navigate("Parent");
      } else {
        Alert.alert("Login Error", "Invalid Email or password.");
      }
    } catch (error) {
      Alert.alert("Login Error", "An error occurred during login.");
    } finally {
      setLoading(false);
    }
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

      <Image source={require("../img22.png")} style={styles.logo} />
      <Text style={styles.title}>Welcome to Global Connect</Text>
      <Text style={styles.subtitle}>Let's help you meet all your tasks</Text>
      <Formik
        initialValues={{ email: "", password: "", showPassword: false }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleLogin(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View>
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
                secureTextEntry={!values.showPassword}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() =>
                  setFieldValue("showPassword", !values.showPassword)
                }
              >
                <Ionicons
                  name={values.showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            {/* Conditionally render loading spinner */}
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Button title="Login" onPress={handleSubmit} />
            )}
          </View>
        )}
      </Formik>
      <TouchableOpacity
        onPress={() => navigation.navigate("ForgotPasswordScreen")}
      >
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <Text style={styles.forgotPassword}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  logo: {
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 30,
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
  },
  forgotPassword: {
    textAlign: "center",
    color: "blue",
    textDecorationLine: "none",
    marginBottom: 8,
    marginTop: 8,
  },
  horizontalLine: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 16,
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
});

export default LoginScreen;
