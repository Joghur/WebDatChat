import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { MainTabNavigator } from "./ChatNavigator";

const AppNavigator = (props) => {
  return <NavigationContainer>{<MainTabNavigator />}</NavigationContainer>;
};

export default AppNavigator;
