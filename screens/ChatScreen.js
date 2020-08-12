import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ChatScreen = (props) => {
  return (
    <View>
      <Text> Chat Screen</Text>
      <Button title="Go to Home" onPress={() => props.navigation.popToTop()} />
    </View>
  );
};

export const screenOptions = {
  headerTitle: "Chat Screen",
};

const styles = StyleSheet.create({});

export default ChatScreen;
