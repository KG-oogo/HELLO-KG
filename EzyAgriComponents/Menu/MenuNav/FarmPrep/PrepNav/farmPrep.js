import React, { useState, useEffect, useCallback } from "react";
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
  Dialog,
} from "react-native-paper";
import { connect } from "react-redux";
import { action, addUpdateDataTransaction } from "../../../../Redux/types";
import { ADD_UPDATE_FIELD } from "../../../../Redux/types";
import { dicArrayConv } from "../../../../Redux/dataConvertor";

import { getAreaOfPolygon, convertArea } from "geolib";

function MapKG(props) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapPoints, setMapPoints] = useState([]);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // Dialog
  const showDialog = () => {
    if (mapPoints.length >= 3) setVisible(true);
  };
  const hideDialog = () => setVisible(false);

  const [fieldName, setFieldName] = useState({
    name: "",
    //hectre: "",
  });
  const [fields, setFields] = useState(dicArrayConv(props.fields));

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
      setFields(dicArrayConv(props.fields));
    })();
  };

  const clearSelection = () => {
    setMapPoints([]);
  };

  const undoPoint = () => {
    const newMapPoints = mapPoints.filter((value, index) => {
      if (index !== mapPoints.length - 1) {
        return value;
      }
    });
    setMapPoints(newMapPoints);
  };

  /*
  General Action Creator Helper
  -----------------------------

  fields == objectList to calc next key
  newFieldName == payload key name
  newFieldLonLat == payload content
  Extensions parameters for general action creator
  - action creator from props
  - dicArrayConv() for dictionary to array conversion
  - useState() function
  const GeneralActionCreatorHelper(objectList, key, content, actionCreator,dicArrayConv, useStateFunction)


  */
  const addToField = (fields, newFieldName, newFieldLonLat) => {
    let nextIndex = "";
    let exists = 0;
    //console.log(fields);

    // If key exists
    for (let i = 0; i < fields.length; i++) {
      //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
      /* console.log(
        fields[i]["field_name"]["name"] === newFieldName["name"].trim()
      ); */
      //console.log(fields[i]["field_name"]["name"].length);
      //console.log(newFieldName["name"].trim().length);
      //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");

      if (
        /* Object.keys(fields[i]["field_name"]["name"]).filter((e) => e !== "key")[0] ===
        newFieldName["name"].trim() */
        fields[i]["field_name"]["name"].trim() === newFieldName["name"].trim()
      ) {
        nextIndex = fields[i]["key"];
        exists = 1;
        break;
      }
    }

    // If variable nextIndex is empty
    // If key doesnt exist
    if (exists === 0) {
      nextIndex = (fields.length + 1).toString();
    }

    // Calculate area
    const polygonPoints = newFieldLonLat.map((value) => {
      return [value.latitude, value.longitude];
    });

    const areaHectares = parseFloat(
      convertArea(getAreaOfPolygon(polygonPoints), "ha").toFixed(2)
    );
    const areaMeters = parseFloat(
      convertArea(getAreaOfPolygon(polygonPoints), "m2").toFixed(2)
    );

    const payload = {
      [nextIndex]: {
        key: nextIndex,
        field_name: newFieldName,
        polygon: newFieldLonLat,
        areaHectares: areaHectares,
        areaMeters: areaMeters,
      },
    };
    //console.log(payload);
    props.addUpdateDataTransaction(nextIndex, ADD_UPDATE_FIELD, payload);

    //console.log(dicArrayConv(props.fields));

    setMapPoints([]);
    hideModal();
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={stylesLocal.mapContainer}>
          <MapView
            style={stylesLocal.mapStyle}
            mapType={"satellite"}
            onPress={(e) => {
              addMarker(e.nativeEvent.coordinate);
              //console.log(e.nativeEvent.coordinate);
            }}
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
            {mapPoints.length === 1 ? (
              mapPoints.map((point) => (
                <Marker
                  //draggable
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
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

                {mapPoints.map((point) => (
                  <Marker
                    //draggable
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
                      //source={require("../../../../Pictures/marker.svg")}
                      source={require("../../../../Pictures/marker.svg")}
                    />
                  </Marker>
                ))}
              </React.Fragment>
            )}

            {fields.length === 0 ? (
              <React.Fragment></React.Fragment>
            ) : (
              fields.map((value, index, arr) => {
                //console.log(value);
                /**/ return (
                  <Polygon
                    coordinates={value["polygon"]}
                    strokeWidth={2}
                    fillColor={"rgba(45,87,250,0.39)"}
                  />
                );
              })
            )}
          </MapView>
        </View>

        <View style={stylesLocal.buttons}>
          <Button
            mode="contained"
            onPress={() => getLocation()}
            style={{ margin: "1%", width: "45%" }}
          >
            Get Location
          </Button>
          <Button
            mode="contained"
            onPress={() => showDialog()}
            style={{ margin: "1%", width: "45%" }}
          >
            Add Field
          </Button>
          <Button
            mode="contained"
            onPress={() => clearSelection()}
            style={{ margin: "1%", width: "45%" }}
          >
            Clear Selection
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              undoPoint();
              setFields(dicArrayConv(props.fields));
            }}
            style={{ margin: "1%", width: "45%" }}
          >
            Undo
          </Button>
        </View>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Enter you field name please</Dialog.Title>
            <Dialog.Content>
              <TextInput
                placeholder={"Enter Field Name"}
                onChangeText={(e) => setFieldName({ ...fieldName, name: e })}
                style={{ width: "80%" }}
              />
              {/* <TextInput
                placeholder={"Enter Field Hectures"}
                onChangeText={(e) => setFieldName({ ...fieldName, hectre: e })}
                style={{ width: "80%" }}
                keyboardType={"number-pad"}
              /> */}
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  addToField(fields, fieldName, mapPoints);
                  setFields(dicArrayConv(props.fields));
                }}
              >
                Add Field
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
    width: "100%", //Dimensions.get("window").width,
    height: "100%", //Dimensions.get("window").height,
  },
  buttons: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //height: "80%",
    //width: "80%",
    backgroundColor: "#fff",
  },
  back: {
    flex: 1,
    padding: "50%",
    width: "80%",
  },
  polygon: {
    backgroundColor: "#fff",
  },
  mapContainer: {
    width: "90%", //Dimensions.get("window").width,
    height: "70%", //Dimensions.get("window").height,
    borderWidth: 2,
    borderColor: "#556B2F",
  },
});

const mapStateToProps = (state) => ({
  fields: state.addUpdateReducer.fields,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addUpdateDataTransaction: addUpdateDataTransaction,
});

export default connect(mapStateToProps, { addUpdateDataTransaction })(MapKG);
