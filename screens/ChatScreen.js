import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ChatScreen = ({ navigation, route }) => {

  const { receiverID } = route.params
  return (
    <View>
      <Text> Chat Screen</Text>
      <Text>{receiverID}</Text>
      <Button title="Go to Home" onPress={() => navigation.popToTop()} />
    </View>
  );
};

export const screenOptions = {
  headerTitle: "Chat Screen",
};

const styles = StyleSheet.create({});

export default ChatScreen;
