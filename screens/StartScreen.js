import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const StartScreen = (props) => {
  return (
    <View>
      <Text> Start Screen</Text>
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
