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
//import CamKG from "../Learning/camera";

//import * as React from "react";

function AddProduct(props) {
  //console.log(props.products);
  const [products, setproducts] = useState({});

  const keys = Object.keys(dicArrayConv(props.products)[0]);

  //console.log(keys);
  return (
    //contentContainerStyle
    <KeyboardAvoidingView style={styles.container}>
      <View style={{}}>
        <Title>Add Product</Title>
      </View>

      {/* <FlatList
        style={styles.items}
        data={keys}
        renderItem={({ item }) => (
          <KeyboardAvoidingView key={item.key} style={{ padding: "2%" }}>
            
            <TextInput
              label={"ENTER " + item.toUpperCase()}
              value={products[item]}
              onChangeText={(text) => setproducts({ ...products, item: text })}
            />
          </KeyboardAvoidingView>
        )}
      />
 */}

      {keys.map((item) => (
        <KeyboardAvoidingView key={item.key} style={styles.items}>
          {item === "picture" ? (
            <Button
              mode="outlined"
              onPress={() => props.navigation.navigate("CamKG")}
            >
              {item.toUpperCase()}
            </Button>
          ) : (
            <TextInput
              label={"ENTER " + item.toUpperCase()}
              value={products[item]}
              onChangeText={(text) => setproducts({ ...products, item: text })}
            />
          )}
        </KeyboardAvoidingView>
      ))}
      <View style={styles.items}>
        <Button
          mode="contained"
          onPress={() => props.navigation.navigate("Application")}
        >
          Add Product
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
    padding: "10%",
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
  products: state.addUpdateReducer.products,
});

export default connect(mapStateToProps)(AddProduct);
