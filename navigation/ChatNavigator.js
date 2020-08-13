import React, { useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
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

const StartStackNavigator = createStackNavigator();

export const StartNavigator = (props) => {
  return (
    <StartStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <StartStackNavigator.Screen
        name="Start"
        component={StartScreen}
        options={StartScreenOptions}
      />
      <StartStackNavigator.Screen
        name="Register"
        component={RegisterScreen}
        options={RegisterScreenOptions}
      />
      <ChatStackNavigator.Screen
        name="UserList"
        component={UserListScreen}
        options={UserListScreenOptions}
      />
      <ChatStackNavigator.Screen
        name="Chat"
        component={ChatScreen}
        options={ChatScreenOptions}
      />
    </StartStackNavigator.Navigator>
  );
};

const ChatStackNavigator = createStackNavigator();

const ChatNavigator = (props) => {
  return (
    <ChatStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ChatStackNavigator.Screen
        name="UserList"
        component={UserListScreen}
        options={UserListScreenOptions}
      />
      <ChatStackNavigator.Screen
        name="Chat"
        component={ChatScreen}
        options={ChatScreenOptions}
      />
      <StartStackNavigator.Screen
        name="Start"
        component={StartScreen}
        options={StartScreenOptions}
      />
      <StartStackNavigator.Screen
        name="Register"
        component={RegisterScreen}
        options={RegisterScreenOptions}
      />
    </ChatStackNavigator.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: Colors.primary }}
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      shifting={true}
    >
      <Tab.Screen
        name="Userlist"
        component={ChatNavigator}
        options={{
          tabBarLabel: "Userlist",
          tabBarIcon: (tabInfo) => (
            <Ionicons name="ios-people" size={25} color={tabInfo.tintColor} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={StartNavigator}
        options={{
          tabBarLabel: "Log",
          tabBarIcon: (tabInfo) => (
            <Ionicons name="ios-log-out" size={25} color={tabInfo.tintColor} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
