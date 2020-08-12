import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { API_Key } from '../settings_mbt.json';




// const saveDataToStorage = (token, userId) => {
//   AsyncStorage.setItem(
//     'userData',
//     JSON.stringify({
//       token: token,
//       userId: userId
//     })
//   );
// };



const StartScreen = (props) => {

  // const [ isLoading, setIsLoading ] = useState(false);
  const [token, setToken] = useState("")
  const [userId, setUserId] = useState("")

  useEffect(() => {
    const login = async (email, password) => {
      console.log(email, password)
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_Key,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      );


      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if (errorId === 'EMAIL_NOT_FOUND') {
          message = 'This email could not be found!';
        } else if (errorId === 'INVALID_PASSWORD') {
          message = 'This password is not valid!';
        }
        throw new Error(message);
      }

      const resData = await response.json();
      console.log(resData);
      setUserId(resData.localId)
      setToken(resData.idToken)

    };

    login("joghur@gmail.com", "testing")
  }, [])

  return (
    <View>
      <Text> Start Screen</Text>
      <View>
        <Text>UserId: {userId ? userId : "Intet userId"}</Text>
        <Text>Token: {token ? token : "Intet token"}</Text>
      </View>
      <Button
        title="Go to Chat"
        onPress={() => props.navigation.navigate("Chat")}
      />
      <Button
        title="Go to Register"
        onPress={() => props.navigation.navigate("Register")}
      />
      <Button
        title="Go to Userlist"
        onPress={() => props.navigation.navigate("UserList")}
      />
    </View>
  );
};

export const screenOptions = {
  headerTitle: "Start Screen",
};

const styles = StyleSheet.create({});

export default StartScreen;
