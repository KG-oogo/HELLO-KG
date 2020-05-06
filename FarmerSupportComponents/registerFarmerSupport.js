import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { Title } from "react-native-paper";

//import * as React from "react";

export default function RegisterFarmerSupport() {
  const [outputText, setOutputText] = useState(0);
  const [nameFarmerSupport, setnameFarmerSupport] = useState("");

  return (
    <View style={styles.form}>
      <View style={{}}>
        <Title>Farmer Support Registration</Title>
      </View>

      <View style={{}}>
        <TextInput
          label="Enter Name"
          value={nameFarmerSupport}
          onChangeText={(text) => setnameFarmerSupport(text)}
        />
      </View>

      <View style={{}}>
        <Button
          mode="contained"
          onPress={() => console.log({ nameFarmerSupport })}
        >
          Register
        </Button>
      </View>

      <Text>You have typed: {nameFarmerSupport}</Text>
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
