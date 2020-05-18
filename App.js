import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { AppRegistry } from "react-native";
import { Button } from "react-native-paper";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import SwitchNivigator from "./EzyAgriComponents/navigation";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import thunk from "redux-thunk";

import reducer from "./EzyAgriComponents/Redux/reducers/reducers";
import { addUpdateReducer } from "./EzyAgriComponents/Redux/reducers/reducers";

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

  //const state = createStore(addUpdateReducer, {}, applyMiddleware(thunk));
  const state = createStore(reducer, {}, applyMiddleware(thunk));
  //const state = createStore(reducer, {}, applyMiddleware(ReduxThunk));
  //const state = createStore(addUpdateReducer, {}, applyMiddleware(ReduxThunk));

  return (
    <Provider store={state}>
      <PaperProvider theme={theme}>
        <SwitchNivigator />
      </PaperProvider>
    </Provider>
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
