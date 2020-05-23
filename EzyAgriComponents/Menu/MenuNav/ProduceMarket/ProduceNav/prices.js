import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  TouchableNativeFeedback,
} from "react-native";
import { Card, Button } from "react-native-paper";
import { mdiCart, mdiFingerprint } from "@mdi/js";
import { Icon } from "react-native-elements";

import {
  Title,
  TouchableRipple,
  DataTable,
  Searchbar,
} from "react-native-paper";

import TopMenu from "../../../../TopMenu/topMenu";
import { connect } from "react-redux";

import { action } from "../../../../Redux/types";

import { dicArrayConv } from "../../../../Redux/dataConvertor";
import _ from "lodash";
import styles from "../../../../styles";
import { FlatGrid } from "react-native-super-grid";
import { withNavigation } from "react-navigation";

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

/* const dicArrayConv = (dic) => {
  return _.values(dic);
}; */

function Prices(props) {
  const [prices, setPrices] = useState(dicArrayConv(props.prices));
  const [searchQuery, setSearchQuery] = useState("");
  //const prices = dicArrayConv(props.prices);
  useEffect(() => {
    //console.log(props);
  });

  //console.log(props.items2);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={(e) => setSearchQuery(e)}
        value={searchQuery}
      />

      <View style={stylesLocal.view}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Crop Name</DataTable.Title>
            <DataTable.Title numeric>Market Name</DataTable.Title>
            <DataTable.Title numeric>Retail Price</DataTable.Title>
            <DataTable.Title numeric>Wholesale Price</DataTable.Title>
          </DataTable.Header>

          {/* <FlatGrid
            itemDimension={130}
            items={prices}
            // staticDimension={300}
            // fixed
            // spacing={20}
            renderItem={({ item, index }) => (
              <DataTable.Row>
                <DataTable.Cell>{item.crop_name}</DataTable.Cell>
                <DataTable.Cell>{item.market_name}</DataTable.Cell>
                <DataTable.Cell numeric>{item.retail_price}</DataTable.Cell>
                <DataTable.Cell numeric>{item.wholesale_price}</DataTable.Cell>
              </DataTable.Row>
            )}
          /> */}

          <FlatList
            data={prices}
            keyExtractor={() => props.prices.key}
            renderItem={({ item, index }) => (
              <DataTable.Row>
                <DataTable.Cell>{item.crop_name}</DataTable.Cell>
                <DataTable.Cell>{item.market_name}</DataTable.Cell>
                <DataTable.Cell numeric>{item.retail_price}</DataTable.Cell>
                <DataTable.Cell numeric>{item.wholesale_price}</DataTable.Cell>
              </DataTable.Row>
            )}
          />

          <DataTable.Pagination
            page={1}
            numberOfPages={3}
            onPageChange={(page) => {
              console.log(page);
            }}
            label="1-2 of "
          />
        </DataTable>

        {/* {items.map((item) => (
          <TouchableRipple onPress={() => finger(item.name)}>
            <View key={item.key} style={styles.items}>
              <Text style={{ color: "green" }}>{item.name}</Text>
              <Icon size={80} name={item.icon} color="green" />
            </View>
          </TouchableRipple>
        ))} */}
      </View>
    </View>
  );
}

/*
{items.map((item) => (
        <Button
          icon="info"
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={styles.items}
        >
          {item.name}
        </Button>
      ))}
//////////////////////////////

<View key={item.key} style={styles.items}>
          <Text>{item.name}</Text>
          <Icon name={item.icon} />
        </View>
*/

const stylesLocal = StyleSheet.create({
  container: {
    marginTop: "10%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    height: "100%",
  },
  items: {
    padding: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    prices: state.addUpdateReducer.prices,
  };
};

export default connect(mapStateToProps, { action })(withNavigation(Prices));
