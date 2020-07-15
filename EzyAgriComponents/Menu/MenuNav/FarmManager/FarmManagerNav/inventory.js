import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Image, FlatList } from "react-native";

import {
  Button,
  Card,
  Title,
  Paragraph,
  List,
  Checkbox,
  TextInput,
  Modal,
  Portal,
  Text,
  Provider,
  Dialog,
  TouchableRipple,
} from "react-native-paper";

import { connect } from "react-redux";
import { mdiCart } from "@mdi/js";
import { dicArrayConv } from "../../../../Redux/dataConvertor";

import TopMenu from "../../../../TopMenu/topMenu";

//import styles from "../../../../styles";

import {
  action,
  addUpdateDataTransaction,
  deleteDataTransaction,
  DELETE_INVENTORY,
  ADD_UPDATE_MY_INVENTORY,
  ADD_UPDATE_MY_PRODUCE,
} from "../../../../Redux/types";

import { withNavigation, StackRouter } from "react-navigation";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

const menuItems = [
  {
    key: "1",
    item: "name",
  },
  {
    key: "2",
    item: "description",
  },
  {
    key: "3",
    item: "unit_price",
  },
  {
    key: "4",
    item: "quantity_in_stock",
  },
  {
    key: "5",
    item: "reorder_level",
  },

  {
    key: "6",
    item: "reorder_time_in_days",
  },
  {
    key: "7",
    item: "quantity_in_reorder",
  },
  {
    key: "8",
    item: "discontinued",
  },
];
/*


*/

function Inventory(props, { route, navigation }) {
  // Filter product list by user_id
  const inventoryFilterByUserId = (inventory) => {
    console.log(inventory);
    if (Object.keys(inventory).length === 0) {
      return dicArrayConv(inventory);
    } else {
      dicArrayConv(inventory).filter((value) => {
        //console.log(value);
        if (value.user_id !== undefined) {
          return value.user_id === props.user_id;
        } else {
          return dicArrayConv(inventory);
        }
      });
    }
  };

  //inventoryFilterByUserId(props.inventory)
  const [myProduce, setMyProduce] = useState(dicArrayConv(props.myProduce));
  const [inventory, setInventory] = useState(dicArrayConv(props.inventory));
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = () => {
    console.log("");
  };

  // Dialog
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    unit_price: "",
    quantity_in_stock: "",
    reorder_level: "",
    reorder_time_in_days: "",
    quantity_in_reorder: "",
    discontinued: "",
    user_id: props.user_id,
  });

  const [image, setImage] = useState(null);

  const [recordKey, setRecordKey] = useState("");
  const updateInformation = (inventory, newInformation) => {
    //console.log(newInformation);
    let nextIndex = "";
    let exists = 0;

    // If variable nextIndex is empty
    // If key doesnt exist
    if (exists === 0) {
      nextIndex = (inventory.length + 1).toString();
    }

    /**/

    const payload = {
      [nextIndex]: {
        key: nextIndex,
        inventory: newInformation,
      },
    };

    props.addUpdateDataTransaction(nextIndex, ADD_UPDATE_MY_INVENTORY, payload);
    //props.addUpdateDataTransaction(nextIndex, ADD_UPDATE_MY_PRODUCE, payload);

    setProduct({
      name: "",
      description: "",
      unit_price: "",
      quantity_in_stock: "",
      reorder_level: "",
      reorder_time_in_days: "",
      quantity_in_reorder: "",
      discontinued: "",
      user_id: props.user_id,
    });
    setImage(null);
    hideDialog();
  };

  const deleteProduct = (key) => {
    const payload = key;
    //console.log(payload);

    props.deleteDataTransaction(DELETE_INVENTORY, payload);
    /**/
  };

  return (
    <View style={styles.container}>
      <TopMenu />
      <ScrollView contentContainerStyle={stylesLocal.view}>
        {inventory.length === 0 ? (
          <React.Fragment>
            <Text>You have no inventory entered</Text>
          </React.Fragment>
        ) : (
          <FlatList
            style={{ width: "100%", height: "100%", padding: "5%" }}
            // numColumns={2}
            data={inventory}
            renderItem={({ item }) => (
              <React.Fragment>
                <Card style={stylesLocal.items} elevation={10}>
                  <Card.Content>
                    <Title>{item.inventory.name}</Title>
                    <Paragraph>{item.inventory.description}</Paragraph>
                  </Card.Content>
                  {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
                  {/* <Card.Cover source={{ uri: item.inventory.picture }} /> */}

                  <Card.Actions style={{ justifyContent: "space-between" }}>
                    <Button
                      icon="check"
                      mode="contained"
                      onPress={() => {
                        {
                          deleteProduct(item.key);
                          setInventory(dicArrayConv(props.inventory));
                        }
                      }}
                    >
                      Remove
                    </Button>
                  </Card.Actions>
                </Card>
              </React.Fragment>
            )}
          />
        )}
      </ScrollView>

      <View style={stylesLocal.button}>
        <Button mode="contained" onPress={() => showDialog()}>
          Add Inventory
        </Button>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Enter inventory infor please</Dialog.Title>
          <Dialog.Content>
            {menuItems.map((value, index, arr) =>
              value.item !== "picture" ? (
                <React.Fragment key={value.key}>
                  <TextInput
                    label={value.item.replace(/_/g, " ").toUpperCase()}
                    placeholder={
                      "ENTER " + value.item.replace(/_/g, " ").toUpperCase()
                    }
                    value={product[value.item]}
                    onChangeText={(e) =>
                      setProduct({ ...product, [value.item]: e })
                    }
                  />
                </React.Fragment>
              ) : (
                <ProductImage
                  image={image}
                  setImage={setImage}
                  setProduct={setProduct}
                  product={product}
                />
              )
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                updateInformation(inventory, product);
                setInventory(dicArrayConv(props.inventory));
              }}
            >
              Add
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const ProductImage = (props) => {
  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      props.setProduct({ ...props.product, picture: result.uri });

      if (!result.cancelled) {
        props.setImage(result.uri);
        //props.setProduct({ ...inventory, picture: result.uri });
      }

      console.log(props.product);
    } catch (E) {
      console.log(E);
    }
  };
  //style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  //<Button title="Pick an image from camera roll" onPress={pickImage()} />
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Button mode="outlined" onPress={() => pickImage()}>
        Add Picture
      </Button>
      {props.image && (
        <Image
          source={{ uri: props.image }}
          style={{ width: 100, height: 100 }}
        />
      )}
    </View>
  );
};

const stylesLocal = StyleSheet.create({
  container: {
    //justifyContent: "center",
    //alignItems: "center",
    //flex: 1,
  },
  view: {
    //justifyContent: "center",
    alignItems: "center",
    //flexDirection: "row",
    //flexWrap: "wrap",
    //margin: "5%",
    height: "75%",
  },
  items: {
    margin: "5%",
    width: "80%",
    //justifyContent: "center",
    //alignItems: "center",
  },
  card: {
    //paddingVertical: "15%"
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    //margin: "15%",
  },
});

const mapStateToProps = (state) => ({
  inventory: state.addUpdateReducer.inventory,
  user_id: state.addUpdateReducer.user_id,
});

export default connect(mapStateToProps, {
  addUpdateDataTransaction,
  deleteDataTransaction,
})(withNavigation(Inventory));
