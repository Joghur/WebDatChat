import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { ChatNavigator } from "./ChatNavigator";

const AppNavigator = (props) => {
  return <NavigationContainer>{<ChatNavigator />}</NavigationContainer>;
};

export default AppNavigator;
