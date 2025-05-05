import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const signIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setSubmitLoading(true);
    try {
      // Load users from AsyncStorage
      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      if (users.length === 0) {
        Alert.alert(
          "Error",
          "No registered users found. Please register first."
        );
        setSubmitLoading(false);
        return;
      }

      // Check credentials
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        Alert.alert("Error", "Invalid email or password");
        setSubmitLoading(false);
        return;
      }

      // Save logged-in user data with email
      await AsyncStorage.setItem("currentUser", JSON.stringify(user));
      setEmail("");
      setPassword("");
      setSubmitLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Failed to log in. Please try again.");
      setSubmitLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="dark" />
      <LottieView
        style={styles.animation}
        source={require("../assets/Animation - 1746296044167.json")}
        autoPlay
        loop
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button
          title="Login"
          containerStyle={styles.button}
          onPress={signIn}
          loading={submitLoading}
          buttonStyle={styles.loginButton}
        />
        <Button
          title="Register"
          containerStyle={styles.button}
          onPress={() => navigation.navigate("Register")}
          buttonStyle={styles.registerButton}
          type="outline"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  animation: {
    height: 200,
    width: 300,
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    maxWidth: 300,
  },
  input: {
    fontSize: 16,
  },
  button: {
    width: "100%",
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "#000",
    borderRadius: 8,
  },
  registerButton: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default LoginScreen;
