import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const RegisterScreen = (props) => {
  return (
    <View>
      <Text> Register Screen</Text>
      <Button
        title="Go to Userlist"
        onPress={() => props.navigation.navigate("UserList")}
      />
      <Button title="Go to Home" onPress={() => props.navigation.popToTop()} />
    </View>
  );
};

export const screenOptions = {
  headerTitle: "Register Screen",
};

const styles = StyleSheet.create({});

export default RegisterScreen;
