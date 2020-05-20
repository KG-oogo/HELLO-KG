import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button, TouchableRipple, Card, Title } from "react-native-paper";
import { connect } from "react-redux";
import { dicArrayConv } from "../../Redux/dataConvertor";
import { mdiCart } from "@mdi/js";

import TopMenu from "../../TopMenu/topMenu";

function AgriShopButton() {
  return <Button>Press me</Button>;
}

/*
icon={({ size, color }) => (
          <Image
            source={require('../assets/chameleon.jpg')}
            style={{ width: size, height: size, tintColor: color }}
          />
        )}
*/

const finger = (action) => {
  //console.log(action);
  /* action("ADD_UPDATE_MENU_ITEMS", {
    10: {
      key: 10,
      name: "Input Shop",
      icon: "shopping-cart",
    },
  }); */
  //console.log("after");
};

function ServiceTractor(props) {
  const [tractors, settractors] = useState(dicArrayConv(props.tractors));
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        {tractors.length === 0 ? (
          <Text>There are no tractors to request</Text>
        ) : (
          <FlatList
            style={{ width: "100%" }}
            //numColumns={2}
            data={tractors}
            renderItem={({ item }) => (
              <TouchableRipple
                onPress={() => {
                  finger(props.action);
                  settractors(dicArrayConv(props.tractors));
                }}
              >
                <Card key={item.key} style={styles.items}>
                  <Card.Content>
                    <Title style={styles.text}>{item.company}</Title>
                    <Text style={styles.text}>District: {item.district}</Text>
                    <Text style={styles.text}>Service: {item.service}</Text>
                    <Text style={styles.text}>Price: {item.price}</Text>
                    <Text style={styles.text}>Unit: {item.unit}</Text>
                    <Button
                      mode="contained"
                      onPress={() => console.log("Pressed")}
                    >
                      Request Service
                    </Button>
                  </Card.Content>
                </Card>
              </TouchableRipple>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    //marginTop: "20%",
    flex: 1,
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
    //flexDirection: "row",
    width: "100%",
  },
  items: {
    margin: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#556B2F",
  },
});

const mapStateToProps = (state) => ({
  tractors: state.addUpdateReducer.tractors,
});

export default connect(mapStateToProps)(ServiceTractor);
