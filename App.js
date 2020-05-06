import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { AppRegistry } from "react-native";
import { Button } from "react-native-paper";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import TabNavigator from "./EzyAgriComponents/navigation";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#556B2F",
    accent: "#32CD32",
  },
};

export default function App() {
  const [outputText, setOutputText] = useState(0);

  return (
    <PaperProvider theme={theme}>
      <TabNavigator />
    </PaperProvider>
  );
}

/*
<Tab.Screen name="Home" component={MenuFirstTab} />
          <Tab.Screen name="Settings" component={RegisterFarmerSupport} />
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

AppRegistry.registerComponent("main", () => App);
