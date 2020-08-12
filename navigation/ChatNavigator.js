import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import StartScreen, {
  screenOptions as StartScreenOptions,
} from "../screens/StartScreen";
import ChatScreen, {
  screenOptions as ChatScreenOptions,
} from "../screens/ChatScreen";
import RegisterScreen, {
  screenOptions as RegisterScreenOptions,
} from "../screens/RegisterScreen";
import UserListScreen, {
  screenOptions as UserListScreenOptions,
} from "../screens/UserListScreen";

import Colors from "../constants/Colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ChatStackNavigator = createStackNavigator();

export const ChatNavigator = (props) => {
  return (
    <ChatStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ChatStackNavigator.Screen
        name="Start"
        component={StartScreen}
        options={StartScreenOptions}
      />
      <ChatStackNavigator.Screen
        name="Chat"
        component={ChatScreen}
        options={ChatScreenOptions}
      />
      <ChatStackNavigator.Screen
        name="Register"
        component={RegisterScreen}
        options={RegisterScreenOptions}
      />
      <ChatStackNavigator.Screen
        name="UserList"
        component={UserListScreen}
        options={UserListScreenOptions}
      />
    </ChatStackNavigator.Navigator>
  );
};
