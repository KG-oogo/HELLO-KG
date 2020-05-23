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
  DataTable,
} from "react-native-paper";

import { connect } from "react-redux";
import { mdiCart } from "@mdi/js";
import { dicArrayConv } from "../../../../Redux/dataConvertor";
import { addUpdateDataTransaction } from "../../../../Redux/types";

import TopMenu from "../../../../TopMenu/topMenu";

import styles from "../../../../styles";
import { withNavigation } from "react-navigation";

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

function Demand(props) {
  const [demand, setDemand] = useState(dicArrayConv(props.demand));
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = () => {
    console.log("");
  };
  return (
    <View style={stylesLocal.container}>
      <View style={stylesLocal.view}>
        {demand.length === 0 ? (
          <Text>There is no demand</Text>
        ) : (
          <FlatList
            style={{ width: "100%", height: "100%", padding: "5%" }}
            // numColumns={2}
            data={demand}
            renderItem={({ item }) => (
              <Card style={stylesLocal.card} elevation={10}>
                <Card.Content>
                  <Title>{item.crop_name}</Title>
                  <DataTable>
                    <DataTable.Row>
                      <DataTable.Cell>Variety:</DataTable.Cell>
                      <DataTable.Cell>{item.variety}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Cell>Quantity:</DataTable.Cell>
                      <DataTable.Cell>{item.quantity}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Cell>Date:</DataTable.Cell>
                      <DataTable.Cell>{item.demand_date}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Cell>Unit Price:</DataTable.Cell>
                      <DataTable.Cell>{item.demand_unit_price}</DataTable.Cell>
                    </DataTable.Row>
                  </DataTable>
                </Card.Content>

                <Card.Actions style={{ justifyContent: "center" }}>
                  <Button
                    mode="contained"
                    onPress={() => console.log("Pressed")}
                    style={{ width: "80%" }}
                  >
                    View
                  </Button>
                </Card.Actions>
              </Card>
            )}
          />
        )}
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
    width: "100%",
    flexWrap: "wrap",
  },
  items: {
    margin: "5%",

    justifyContent: "center",
    alignItems: "center",
  },
  card: { padding: "5%", margin: "5%" },
});

const mapStateToProps = (state) => ({
  demand: state.addUpdateReducer.demand,
});

export default connect(mapStateToProps)(withNavigation(Demand));
