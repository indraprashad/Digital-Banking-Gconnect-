import React from "react";
import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import FormComponent from "./FormComponent";
import ImageComponent from "./ImageComponent";
import CircleComponent from "./CircleComponent";
import AsyncStorage from '@react-native-async-storage/async-storage';
const CreateAccount = () => {
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('token', data.token);
        console.log(data);
        Alert.alert('Account created Successfully', 'Now Login.',
        buttons=[{ text: 'OK', onPress: () => { setAlertVisible(false); navigation.navigate("Login"); } }]) // Show success alert
      } else {
        console.error("Error:", response.statusText);
        Alert.alert('Registration Error', 'An error occurred during registration.'); // Show error alert
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert('Registration Error', 'An error occurred during registration.'); // Show error alert
    }
  };

  return (
    <View style={styles.container}>
      <CircleComponent />
      <ImageComponent />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <FormComponent
            handleChange={formikProps.handleChange}
            handleBlur={formikProps.handleBlur}
            handleSubmit={formikProps.handleSubmit}
            values={formikProps.values}
            errors={formikProps.errors}
            touched={formikProps.touched}
          />
        )}
      </Formik>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.signup}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signup: {
    color: "blue",
    textDecorationLine: "none",
    marginTop: 20,
  },
});

export default CreateAccount;
