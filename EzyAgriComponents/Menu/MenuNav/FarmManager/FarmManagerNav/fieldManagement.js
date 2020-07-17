import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Image, FlatList } from "react-native";
import {
  List,
  Checkbox,
  TextInput,
  Button,
  Modal,
  Portal,
  Text,
  Provider,
  Dialog,
  Card,
  TouchableRipple,
} from "react-native-paper";

import { connect } from "react-redux";
import { dicArrayConv } from "../../../../Redux/dataConvertor";
import styles from "../../../../styles";
import { action, addUpdateDataTransaction } from "../../../../Redux/types";
import { ADD_UPDATE_SOIL_TESTING } from "../../../../Redux/types";

import TopMenu from "../../../../TopMenu/topMenu";

function UpdateField(props) {
  return (
    <View>
      <Button
        mode="contained"
        onPress={() => updateInformation(fields)}
        styles={{ width: "80%" }}
      >
        Update Information
      </Button>
    </View>
  );
}

function FieldManagement(props) {
  const [fields, setFields] = useState(dicArrayConv(props.fields));
  const soilTestingFieldInputs = dicArrayConv(props.soilTestingFieldInputs);

  // Dialog
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [soilType, setSoilType] = useState("");
  const [soilCategory, setSoilCategory] = useState("");
  const [cropRecomendations, setCropRecomendations] = useState("");
  const [fertilizerRecomendations, setFertilizerRecomendations] = useState("");

  const [soilTestObject, setSoilTestObject] = useState({
    soil_type: "",
    soil_category: "",
    crop_recomendations: "",
    fertilizer_recomendations: "",
  });

  // What ever field information that changes is added to this list -- ON HOLD
  // [{fieldName:"x",
  //   soilTestInfo:[{ soil_type:"x", soil_category:"x", crop_recommendations:"x", fertilizer_recomendation:"x"}]]
  const [updateTheseField, setUpdateTheseField] = useState([]);

  // State for inputs

  const [expanded, setExpanded] = useState(false);

  //const [inputNamesetFieldName]

  const handlePress = () => setExpanded(!expanded);

  ////////////////////////////////////// array "newInformation"
  const newInformation = () => {
    const infor = [];

    infor.push({ ["soil_type"]: soilType });
    infor.push({ ["soil_category"]: soilCategory });
    infor.push({ ["crop_recomendations"]: cropRecomendations });
    infor.push({
      ["fertilizer_recomendations"]: fertilizerRecomendations,
    });

    return infor;
  };

  const [recordKey, setRecordKey] = useState("");
  const updateInformation = (recordKey, newInformation) => {
    ///console.log(props.fields[recordKey]);

    // Run addToField
    fields.map((value, index, arr) => {
      //console.log(value);
      //addToField(fields, value., newFieldLonLat)
    });
    /**/
    /* */
    const payload = {
      key: recordKey,
      soil_testing: newInformation,
    };

    props.addUpdateDataTransaction(recordKey, ADD_UPDATE_SOIL_TESTING, payload);

    //console.log(dicArrayConv(props.fields));
    setFields(dicArrayConv(props.fields));

    /* */

    setSoilType("");
    setSoilCategory("");
    setCropRecomendations("");
    setFertilizerRecomendations("");
    setRecordKey("");
    hideDialog();
  };

  const onFieldSelect = (fieldKey) => {
    // soli_testing must be saved as [{"soilType":"Dust"}]
    setRecordKey(fieldKey);
    console.log(props.fields[fieldKey]);
    if (props.fields[fieldKey]["soil_testing"] !== undefined) {
      setSoilTestObject({
        soil_type: props.fields[fieldKey]["soil_testing"]["soil_type"],
        soil_category: props.fields[fieldKey]["soil_testing"]["soil_category"],
        crop_recomendations:
          props.fields[fieldKey]["soil_testing"]["crop_recomendations"],
        fertilizer_recomendations:
          props.fields[fieldKey]["soil_testing"]["fertilizer_recomendations"],
      });
    }

    //console.log(soilType);
    showDialog();
  };

  const displaySoilTestObject = () => {
    Object.entries(soilTestObject).map((value, key, arr) => (
      <React.Fragment>
        <TextInput label={value[0]} placeholder={"ENTER " + value[0]} />
        {console.log("Hi")}
        <Text>Hi</Text>
      </React.Fragment>
    ));
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <TopMenu />
        <View style={{ margin: "6%" }}>
          <Button
            onPress={() => {
              props.navigation.navigate("FarmManager");
            }}
            mode={"contained"}
          >
            Back to Farm Manager
          </Button>
        </View>
        <View style={stylesLocal.listItem}>
          <Text
            style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}
          >
            Field information per field
          </Text>
          {fields.length === 0 ? (
            <Text>No fields selected</Text>
          ) : (
            fields.map((value, index) => {
              return (
                <Button
                  mode="contained"
                  onPress={() => onFieldSelect(value["key"])}
                >
                  {value["field_name"]["name"]}
                </Button>
              );
            })
          )}
        </View>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Field Information</Dialog.Title>
            <Dialog.Content>
              {
                <React.Fragment>
                  <Text style={stylesLocal.labelDialog}>{"Soil Type"}</Text>
                  <Text>{soilTestObject.soil_type}</Text>

                  <Text style={stylesLocal.labelDialog}>{"Soil Category"}</Text>
                  <Text>{soilTestObject.soil_category}</Text>

                  <Text style={stylesLocal.labelDialog}>
                    {"Crop Recomendations"}
                  </Text>
                  <Text>{soilTestObject.crop_recomendations}</Text>

                  <Text style={stylesLocal.labelDialog}>
                    {"Fertilizer Recomendations"}
                  </Text>
                  <Text>{soilTestObject.fertilizer_recomendations}</Text>

                  <Text style={stylesLocal.labelDialog}>{"Arable Area"}</Text>
                  <Text>{"?????????????????????????"}</Text>
                </React.Fragment>
              }
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => hideDialog()}>Close</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </React.Fragment>
  );
}

const stylesLocal = StyleSheet.create({
  listItem: {
    width: "80%",
    //flex: 1,
    height: "75%",
  },
  labelDialog: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => ({
  fields: state.addUpdateReducer.fields,
  soilTestingFieldInputs: state.addUpdateReducer.soilTestingFieldInputs,
});

export default connect(mapStateToProps, { addUpdateDataTransaction })(
  FieldManagement
);
