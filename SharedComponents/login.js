import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { Title } from "react-native-paper";

//import * as React from "react";

export default function Login() {
  const [outputText, setOutputText] = useState(0);
  const [credintials, setCredintials] = useState({
    username: "",
    password: "",
  });

  setCredintials = (key, text) => {
    credintials[{ key }] = { text };
  };
  return (
    <View style={styles.form}>
      <View style={{}}>
        <Title>Login</Title>
      </View>

      <View style={{}}>
        <TextInput
          label="Enter Username"
          value={credintials.username}
          onChangeText={(text) => setCredintials("username", text)}
        />
      </View>
      <View style={{}}>
        <TextInput
          label="Enter Password"
          value={credintials.password}
          onChangeText={(text) => setCredintials("password", text)}
          secureTextEntry={true}
        />
      </View>

      <View style={{}}>
        <Button
          mode="contained"
          onPress={() => this.props.navigation.navigate("Menu")}
        >
          Login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    padding: "10%",
    justifyContent: "space-between",
    flex: 1,
  },
});
