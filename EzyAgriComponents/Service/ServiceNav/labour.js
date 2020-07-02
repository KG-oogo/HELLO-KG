import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import {
  Button,
  TouchableRipple,
  Card,
  Title,
  Paragraph,
} from "react-native-paper";
import { connect } from "react-redux";
import { dicArrayConv } from "../../Redux/dataConvertor";
import { mdiCart } from "@mdi/js";

import TopMenu from "../../TopMenu/topMenu";
import styles from "../../styles";
import { FlatGrid } from "react-native-super-grid";

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

function ServiceLabour(props) {
  const [soilTesting, setsoilTesting] = useState(
    dicArrayConv(props.soilTesting)
  );
  return (
    <View style={styles.container}>
      <View style={stylesLocal.view}>
        {soilTesting.length === 0 ? (
          <Text>There is no labour on the market</Text>
        ) : (
          <React.Fragment>
            <FlatGrid
              itemDimension={130}
              items={soilTesting}
              style={stylesLocal.gridView}
              // staticDimension={300}
              // fixed
              // spacing={20}
              renderItem={({ item, index }) => (
                <TouchableRipple
                  onPress={() => {
                    console.log("hi");
                  }}
                >
                  <Card>
                    <Card.Content>
                      <Text style={{ color: "#556B2F", fontStyle: "italic" }}>
                        {item.price}
                      </Text>
                      <Text style={{ color: "#556B2F" }}>
                        {item.description}
                      </Text>
                    </Card.Content>
                  </Card>
                </TouchableRipple>
              )}
            />

            {/* <FlatList
              style={stylesLocal.flatList}
              numColumns={2}
              data={soilTesting}
              renderItem={({ item }) => (
                <TouchableRipple
                  onPress={() => {
                    finger(props.action);
                    setsoilTesting(dicArrayConv(props.soilTesting));
                  }}
                  style={stylesLocal.touchable}
                >
                  <View style={stylesLocal.items}>
                    <Button style={stylesLocal.title}>{item.price}</Button>
                    <Button style={stylesLocal.title}>
                      {item.description}
                    </Button>
                  </View>
                </TouchableRipple>
              )}
            />
            <Title>Detailed</Title>
            <FlatList
              style={stylesLocal.flatList}
              numColumns={2}
              data={soilTesting}
              renderItem={({ item }) => (
                <TouchableRipple
                  onPress={() => {
                    finger(props.action);
                    setsoilTesting(dicArrayConv(props.soilTesting));
                  }}
                  style={stylesLocal.touchable}
                >
                  <View style={stylesLocal.items}>
                    <Button style={stylesLocal.title}>{item.price}</Button>
                    <Button style={stylesLocal.title}>
                      {item.description}
                    </Button>
                  </View>
                </TouchableRipple>
              )}
            /> */}
          </React.Fragment>
        )}
      </View>
    </View>
  );
}

const stylesLocal = StyleSheet.create({
  container: {
    marginTop: "20%",
    //flex: 1,
  },
  view: {
    justifyContent: "space-evenly",
    alignItems: "center",
    //flexDirection: "row",

    flexWrap: "wrap",
    //height: "80%",
  },
  items: {
    //margin: "5%",
    //paddingRight: "15%",
    //justifyContent: "flex-start",
    //alignItems: "flex-start",
    //alignContent: "center",
  },
  flatList: {
    //padding: "5%",
    //paddingRight: "15%",

    alignContent: "center",
  },
  title: {
    margin: "2%",
    //padding: "2%",
    flexWrap: "wrap",
    fontSize: 12,
    textAlign: "center",
    width: "100%",
    //height: "100%",
  },
  touchable: {
    justifyContent: "center",
    alignItems: "center",
  },
  gridView: {},
});

const mapStateToProps = (state) => ({
  soilTesting: state.addUpdateReducer.soilTesting,
});

export default connect(mapStateToProps)(ServiceLabour);
