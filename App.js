import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import AppNavigator from "./navigation/AppNavigator";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "saw-regular": require("./assets/fonts/Sawasdee.ttf"),
    "saw-bold": require("./assets/fonts/Sawasdee-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return <AppNavigator />;
}
