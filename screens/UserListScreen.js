import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const UserListScreen = (props) => {
  return (
    <View>
      <Text> Userlist Screen</Text>
      <Button title="Go to Home" onPress={() => props.navigation.popToTop()} />
    </View>
  );
};

export const screenOptions = {
  headerTitle: "Userlist Screen",
};

const styles = StyleSheet.create({});

export default UserListScreen;
