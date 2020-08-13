import React, { useMemo, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { MainTabNavigator, StartNavigator } from "./ChatNavigator";

import { AuthContext } from "../components/context";

const AppNavigator = (props) => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState();

  // Use authContext const {signIn} = React.usecontext(AuthContext)

  const authContext = useMemo(() => ({
    token: token,
    userId: userId,
    email: email,
    signIn: (token) => {
      setToken(token);
    },
    signOut: () => {
      setToken(null);
    },
    iDHandler: (id) => {
      setUserId(id);
    },
    emailHandler: (email) => {
      setEmail(email);
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
