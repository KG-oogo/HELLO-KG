import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Title } from "react-native-paper";
import { connect } from "react-redux";
import { dicArrayConv } from "../Redux/dataConvertor";
import _ from "lodash";

//import * as React from "react";

function AddService(props) {
  //console.log(props.tractors);
  const [tractors, setTractors] = useState({});

  const keys = Object.keys(dicArrayConv(props.tractors)[0]);

  //console.log(keys);
  return (
    //contentContainerStyle
    <KeyboardAvoidingView style={styles.container}>
      <View style={{}}>
        <Title>Add Service</Title>
      </View>

      {/* <FlatList
        style={styles.items}
        data={keys}
        renderItem={({ item }) => (
          <KeyboardAvoidingView key={item.key} style={{ padding: "2%" }}>
           
            <TextInput
              label={"ENTER " + item.toUpperCase()}
              value={tractors[item]}
              onChangeText={(text) => setTractors({ ...tractors, item: text })}
            />
          </KeyboardAvoidingView>
        )}
      /> */}

      {keys.map((item) => (
        <KeyboardAvoidingView key={item.key} style={styles.items}>
          <TextInput
            label={"ENTER " + item.toUpperCase()}
            value={tractors[item]}
            onChangeText={(text) => setTractors({ ...tractors, item: text })}
          />
        </KeyboardAvoidingView>
      ))}

      <View style={styles.items}>
        <Button
          mode="contained"
          onPress={() => props.navigation.navigate("Application")}
        >
          Add Service
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
    flex: 1,
    backgroundColor: "#fff",

    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    padding: "5%",
    justifyContent: "space-between",
    flex: 1,
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    height: "90%",
  },
  items: {
    padding: "2%",

    width: "80%",
  },
});

const mapStateToProps = (state) => ({
  tractors: state.addUpdateReducer.tractors,
});

export default connect(mapStateToProps)(AddService);
