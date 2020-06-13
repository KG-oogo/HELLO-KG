import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import MapView, { Marker, Polyline, Polygon } from "react-native-maps";
import * as Location from "expo-location";
import styles from "../../../../styles";

import SvgUri from "react-native-svg-uri";
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  TextInput,
} from "react-native-paper";
import { connect } from "react-redux";
import { action, addUpdateDataTransaction } from "../../../../Redux/types";
import { ADD_UPDATE_FIELD } from "../../../../Redux/types";
import { dicArrayConv } from "../../../../Redux/dataConvertor";

function MapKG(props) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapPoints, setMapPoints] = useState([]);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [fieldName, setFieldName] = useState("");
  const [fields, setFields] = useState(dicArrayConv(props.fields));

  /* useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    //mapPoints = [];
  }); */

  //console.log(location.coords);
  //const location = LocationMe();
  //console.log(typeof location);
  const addMarker = async (coord) => {
    var firstPoint = {};
    if (mapPoints.length === 0) {
      setMapPoints([...mapPoints, coord]);
    } else {
      firstPoint = mapPoints[0];

      setMapPoints([...mapPoints, coord]);
    }
  };

  const getLocation = () => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  };

  const clearSelection = () => {
    setMapPoints([]);
  };

  const addToField = (fields, newFieldName, newFieldLonLat) => {
    //action, addUpdateDataTransaction
    //setFields([...fields, newField])
    /* action("ADD_UPDATE_MENU_ITEMS", {
        10: {
          key: 10,
          name: "Input Shop",
          icon: "shopping-cart",
        },
      }); 
      
      {
      "The ": Array [
        Object {
          "latitude": -26.201731171478244,
          "longitude": 28.034481815993786,
        },
        
      ],
      "key": "2",
    }
     
    
    "1": {
    key: "1",
    crop_name: "Rice",
    crop_description:      
    crop_picture: "../../Pictures/",
  }
      */
    console.log(fields.length);
    //console.log(newFieldName);
    //console.log(newFieldLonLat);
    let nextIndex = "";

    for (let i = 0; i < fields.length; i++) {
      //console.log("################################");

      //console.log(fields[i]);
      //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");

      if (
        Object.keys(fields[i]).filter((e) => e !== "key")[0] === newFieldName
      ) {
        //console.log( fields[i]["key"]);
        nextIndex = fields[i]["key"];
        break;
      } else {
        nextIndex = newFieldName;
      }
    }

    fields.filter((v, i, a) => {
      //console.log(v);
      //console.log(Object.keys(v).filter((e) => e !== "key")[0]);
      //console.log(v["key"]);
      if (Object.keys(v).filter((e) => e !== "key")[0] === newFieldName) {
        //console.log(newFieldName);
        //console.log(Object.keys(v).filter((e) => e !== "key")[0]);
        //nextIndex = i;
        //console.log("################################");
        //console.log(nextIndex);
        //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        return i;
      } else {
        //nextIndex = fields.length + 1;
        //nextIndex = i;
        //console.log(nextIndex);
        return fields.length + 1;
      }
      /*
      console.log("################################");
      console.log(i);
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
*/
    });

    //console.log("################################");
    //console.log(nextIndex);
    //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    /*fields.forEach((element, index) => {
      const keys = Object.keys(element);
      let key = "";
      keys.forEach((e, i) => {
        if (e === "key") {
          key = i;
        }
        if (e === newFieldName) {
          nextIndex = key;
          console.log(nextIndex);
        } else {
          nextIndex = fields.length + 1;
          console.log(nextIndex);
        }

       
        console.log("################################");
        console.log(e);
        console.log(i);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(element[e]);
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");

      });
    });*/

    //const nextIndex = fields.length + 1;

    //remove white space from key ******************************************
    const payload = {
      [nextIndex.toString()]: {
        key: nextIndex.toString(),
        [newFieldName]: newFieldLonLat,
      },
    };
    props.addUpdateDataTransaction(
      nextIndex.toString(),
      ADD_UPDATE_FIELD,
      payload
    );
    setFields(dicArrayConv(props.fields));
    setMapPoints([]);
    hideModal();
  };

  //console.log(mapPoints);
  //addMarker(coord)
  return (
    <React.Fragment>
      <View style={styles.container}>
        <View styles={stylesLocal.back}>
          <Button
            mode="contained"
            onPress={() => props.navigation.navigate("Application")}
            styles={{ width: "80%" }}
          >
            back
          </Button>
        </View>
        <MapView
          style={stylesLocal.mapStyle}
          onPress={(e) => addMarker(e.nativeEvent.coordinate)}
          region={
            location === null
              ? {
                  latitude: -28.4792625,
                  longitude: 24.6727135,
                  latitudeDelta: 0.000000000001,
                  longitudeDelta: 0.000000000000001,
                }
              : {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.000000000001,
                  longitudeDelta: 0.000000000000001,
                }
          }
        >
          {/* <Marker
            draggable
            coordinate={
              location === null
                ? {
                    latitude: -28.4792625,
                    longitude: 24.6727135,
                  }
                : {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }
            }
            title={"Me"}
          /> */}
          {mapPoints.length === 1 ? (
            mapPoints.map((point) => (
              <Marker
                draggable
                coordinate={{
                  latitude: point.latitude,
                  longitude: point.longitude,
                }}
                title={"Me"}
              >
                <SvgUri
                  width="50"
                  height="50"
                  source={require("../../../../Pictures/marker.svg")}
                />
              </Marker>
            ))
          ) : mapPoints.length === 0 ? (
            <React.Fragment></React.Fragment>
          ) : (
            <React.Fragment>
              <Polygon coordinates={mapPoints} strokeWidth={2} />
              {/* {fields.length < 1 ? (
                <React.Fragment></React.Fragment>
              ) : (
                <Polygon coordinates={fields} strokeWidth={2} />
              )} */}

              {/* {console.log("#######################################")}
              {console.log(fields)}
              {console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")} */}

              {mapPoints.map((point) => (
                <Marker
                  draggable
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  title={"Me"}
                  //icon={}
                >
                  <SvgUri
                    width="50"
                    height="50"
                    source={require("../../../../Pictures/marker.svg")}
                  />
                </Marker>
              ))}
            </React.Fragment>
          )}
        </MapView>
        <View style={stylesLocal.buttons}>
          <Button
            mode="contained"
            onPress={() => getLocation()}
            style={{ margin: "1%" }}
          >
            Get Location
          </Button>
          <Button
            mode="contained"
            onPress={() => showModal()}
            style={{ margin: "1%" }}
          >
            Add Field
          </Button>
          <Button
            mode="contained"
            onPress={() => clearSelection()}
            style={{ margin: "1%" }}
          >
            Clear Selection
          </Button>
        </View>

        <Modal
          visible={visible}
          onDismiss={hideModal}
          styles={stylesLocal.modal}
        >
          <TextInput
            placeholder={"Enter Field Name"}
            onChangeText={(e) => setFieldName(e)}
          />
          <Button
            mode="contained"
            onPress={() => addToField(fields, fieldName, mapPoints)}
          >
            ok
          </Button>
        </Modal>
      </View>
    </React.Fragment>
  );
}

const stylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: "90%", //Dimensions.get("window").width,
    height: "70%", //Dimensions.get("window").height,
  },
  buttons: {
    justifyContent: "space-evenly",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "5%",
    width: "5%",
  },
  back: {
    flex: 1,
    padding: "50%",
    width: "80%",
  },
});

const mapStateToProps = (state) => ({
  fields: state.addUpdateReducer.fields,
});

export default connect(mapStateToProps, { action, addUpdateDataTransaction })(
  MapKG
);
