import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { Title } from "react-native-paper";

//import * as React from "react";

export default function Login(props) {
  const [outputText, setOutputText] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [credintials, setCredintials] = useState({
    username: "",
    password: "",
  });

  return (
    <View style={styles.form}>
      <View style={{}}>
        <Title>Login</Title>
      </View>

      <View style={{}}>
        <TextInput
          label="Enter Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={{}}>
        <TextInput
          label="Enter Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>

      <View style={{}}>
        <Button
          mode="contained"
          onPress={() => props.navigation.navigate("Application")}
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
