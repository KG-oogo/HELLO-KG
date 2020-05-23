import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  TouchableRipple,
  Searchbar,
} from "react-native-paper";

import { connect } from "react-redux";
import { mdiCart } from "@mdi/js";
import { dicArrayConv } from "../../../../Redux/dataConvertor";
import { addUpdateDataTransaction } from "../../../../Redux/types";

import TopMenu from "../../../../TopMenu/topMenu";

import styles from "../../../../styles";

import { withNavigation } from "react-navigation";

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
  /*  action("ADD_UPDATE_MENU_ITEMS", {
    10: {
      key: 10,
      name: "Input Shop",
      icon: "shopping-cart",
    },
  }); */
  //console.log("after");
};

function MyProduce(props) {
  const [myProduce, setMyProduce] = useState(dicArrayConv(props.myProduce));
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = () => {
    console.log("");
  };
  return (
    <View style={stylesLocal.container}>
      <View style={stylesLocal.view}>
        {myProduce.length === 0 ? (
          <Text>You have no Produce entered</Text>
        ) : (
          <FlatList
            style={{ width: "100%", height: "100%", padding: "5%" }}
            // numColumns={2}
            data={myProduce}
            renderItem={({ item }) => (
              <Card style={stylesLocal.items}>
                <Card.Content>
                  <Title>{item.name}</Title>
                  <Paragraph>{item.description}</Paragraph>
                </Card.Content>
                {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
                <Card.Cover source={item.picture} />
                <Card.Actions style={{ justifyContent: "space-between" }}>
                  <Button
                    icon="check"
                    mode="contained"
                    onPress={() => console.log("Pressed")}
                  >
                    Remove
                  </Button>
                </Card.Actions>
              </Card>
            )}
          />
        )}
        <View>
          <Button
            mode="contained"
            onPress={() => props.navigation.navigate("")}
          >
            Add Produce
          </Button>
        </View>
      </View>
    </View>
  );
}

const stylesLocal = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
    //flexDirection: "row",

    flexWrap: "wrap",
  },
  items: {
    margin: "5%",

    ///justifyContent: "center",
    //alignItems: "center",
  },
  card: { paddingVertical: "15%" },
});

const mapStateToProps = (state) => ({
  myProduce: state.addUpdateReducer.myProduce,
});

export default connect(mapStateToProps)(withNavigation(MyProduce));
