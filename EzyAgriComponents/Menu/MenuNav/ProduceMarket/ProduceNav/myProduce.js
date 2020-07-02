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

import styles from "../../../../styles";
import {
  action,
  addUpdateDataTransaction,
  deleteDataTransaction,
  DELETE_PRODUCTS,
} from "../../../../Redux/types";
import {
  ADD_UPDATE_PRODUCTS,
  ADD_UPDATE_MY_PRODUCE,
} from "../../../../Redux/types";

import { withNavigation, StackRouter } from "react-navigation";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

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
    item: "company",
  },
  {
    key: "4",
    item: "category",
  },
  {
    key: "5",
    item: "amount",
  },

  {
    key: "6",
    item: "picture",
  },
];
/*


*/

function MyProduce(props, { route, navigation }) {
  // Filter product list by user_id
  const productsFilterByUserId = (products) => {
    console.log(products);
    if (Object.keys(products).length === 0) {
      return dicArrayConv(products);
    } else {
      dicArrayConv(products).filter((value) => {
        //console.log(value);
        if (value.user_id !== undefined) {
          return value.user_id === props.user_id;
        } else {
          return dicArrayConv(products);
        }
      });
    }
  };

  //productsFilterByUserId(props.products)
  const [myProduce, setMyProduce] = useState(dicArrayConv(props.myProduce));
  const [products, setProducts] = useState(dicArrayConv(props.products));
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
    company: "",
    category: "",
    picture: "",
    user_id: props.user_id,
  });

  const [image, setImage] = useState(null);

  const [recordKey, setRecordKey] = useState("");
  const updateInformation = (products, newInformation) => {
    //console.log(newInformation);
    let nextIndex = "";
    let exists = 0;

    // If key exists
    /* for (let i = 0; i < products.length; i++) {
      if (
        Object.keys(fields[i]).filter((e) => e !== "key")[0] ===
        newFieldName.trim()
      ) {
        nextIndex = products[i]["key"];
        exists = 1;
        break;
      }
    } */

    // If variable nextIndex is empty
    // If key doesnt exist
    if (exists === 0) {
      nextIndex = (products.length + 1).toString();
    }

    /**/

    const payload = {
      [nextIndex]: {
        key: nextIndex,
        products: newInformation,
      },
    };

    props.addUpdateDataTransaction(nextIndex, ADD_UPDATE_PRODUCTS, payload);
    props.addUpdateDataTransaction(nextIndex, ADD_UPDATE_MY_PRODUCE, payload);
    /*
    setFields(dicArrayConv(props.fields));

    

    setSoilType("");
    setSoilCategory("");
    setCropRecomendations("");
    setFertilizerRecomendations("");
    setRecordKey("");
*/
    setProduct({
      name: "",
      description: "",
      company: "",
      category: "",
      picture: "",
      user_id: props.user_id,
    });
    setImage(null);
    hideDialog();
  };

  const deleteProduct = (key) => {
    const payload = key;
    //console.log(payload);

    props.deleteDataTransaction(DELETE_PRODUCTS, payload);
    /**/
  };

  return (
    <View style={stylesLocal.container}>
      <ScrollView contentContainerStyle={stylesLocal.view}>
        {products.length === 0 ? (
          <React.Fragment>
            <Text>You have no products entered</Text>
          </React.Fragment>
        ) : (
          <FlatList
            style={{ width: "100%", height: "100%", padding: "5%" }}
            // numColumns={2}
            data={products}
            renderItem={({ item }) => (
              <React.Fragment>
                <Card style={stylesLocal.items} elevation={10}>
                  <Card.Content>
                    <Title>{item.products.name}</Title>
                    <Paragraph>{item.products.description}</Paragraph>
                  </Card.Content>
                  {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
                  <Card.Cover source={{ uri: item.products.picture }} />

                  <Card.Actions style={{ justifyContent: "space-between" }}>
                    <Button
                      icon="check"
                      mode="contained"
                      onPress={() => {
                        {
                          deleteProduct(item.key);
                          setProducts(dicArrayConv(props.products));
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
          Add Product
        </Button>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Enter product infor please</Dialog.Title>
          <Dialog.Content>
            {menuItems.map((value, index, arr) =>
              value.item !== "picture" ? (
                <React.Fragment key={value.key}>
                  <TextInput
                    label={value.item.toUpperCase()}
                    placeholder={"ENTER " + value.item.toUpperCase()}
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
                updateInformation(products, product);
                setProducts(dicArrayConv(props.products));
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

/*
<TextInput
                  label={"Estimated Cost"}
                  placeholder={"ENTER COST"}
                  value={irrigationInfo.cost}
                  onChangeText={(e) =>
                    setIrrigationInfo({ ...irrigationInfo, cost: e })
                  }
                  keyboardType={"number-pad"}
                />
*/

const ProductImage = (props) => {
  //const [image, setImage] = useState(null);
  /* useEffect(() => {
    getPermissionAsync();
  }, []); */

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
        //props.setProduct({ ...products, picture: result.uri });
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
    height: "90%",
  },
  items: {
    margin: "5%",
    //width: "100%",
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
  myProduce: state.addUpdateReducer.myProduce,
  products: state.addUpdateReducer.products,
  user_id: state.addUpdateReducer.user_id,
});

export default connect(mapStateToProps, {
  addUpdateDataTransaction,
  deleteDataTransaction,
})(withNavigation(MyProduce));

{
  /*
                <React.Fragment>
                  <TextInput
                    label={"Soil Type"}
                    placeholder={"ENTER Soil Type"}
                    value={soilTestObject.soil_type}
                    onChangeText={(e) =>
                      setSoilTestObject({ ...soilTestObject, soil_type: e })
                    }
                  />

                  
                </React.Fragment>
                  */
}
