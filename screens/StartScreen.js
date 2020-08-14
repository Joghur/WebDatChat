import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from "react-native";

import { API_Key } from "../settings-env.json";

const StartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => { }, []);

  const login = async (email, password) => {
    console.log(email, password);
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      API_Key,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    // setUserId(resData.localId);
    // setToken(resData.idToken);
    setIsLoggedIn(true)
  };

  const onChangeHandlerEmail = (txt) => {
    setEmail(txt);
  };
  const onChangeHandlerPassword = (txt) => {
    setPassword(txt);
  };

  const authHandler = async () => {
    console.log("authHandler");

    setIsLoading(true);
    login(email, password);
    setIsLoading(false);
  };

  return (
    <View>
      <View style={styles.inputContainer} >
        <View style={styles.input} >
          <TextInput
            id="email"
            value={email}
            placeholder="Email"
            onChangeText={onChangeHandlerEmail}
          />
        </View>

        <View style={styles.input} >
          <TextInput
            id="password"
            value={password}
            placeholder="Password"
            onChangeText={onChangeHandlerPassword}
            password
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          {!isLoggedIn && (
            <Button
              title="Go to Register"
              onPress={() => props.navigation.navigate("Register")}
            />
          )}
        </View>
        <View style={styles.button}>
          {!isLoggedIn && (
            <Button title={"Login"} onPress={authHandler} />
          )}
        </View>
        <View>
          {isLoggedIn && (
            <View style={styles.button}>
              <Button
                title="Go to Userlist"
                onPress={() => props.navigation.navigate("UserList", {
                  email: email,
                })}
              />
              <View style={styles.button}>
              </View>
              <Button
                title="Logout"
                onPress={() => {
                  setIsLoggedIn(false)
                  setEmail("")
                  setPassword("")
                }}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export const screenOptions = {
  headerTitle: "Start Screen",
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 5
  },
  inputContainer: {
    padding: 10
  },
  buttonContainer: {
    padding: 10,
  },
  button: {
    marginBottom: 15,
  }
});

export default StartScreen;
