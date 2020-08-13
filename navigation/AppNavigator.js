import React, { useMemo, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { MainTabNavigator, StartNavigator } from "./ChatNavigator";

import { AuthContext } from "../components/context";

const AppNavigator = (props) => {
  const [token, setToken] = useState();

  const authContext = useMemo(() => ({
    signIn: (token) => {
      setToken(token);
    },
    signOut: () => {
      setToken(null);
    },
  }));

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {token && <MainTabNavigator />}
        {!token && <StartNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default AppNavigator;
