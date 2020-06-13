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

function SoilTesting(props) {
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

  // What ever field information that changes is added to this list -- ON HOLD
  // [{fieldName:"x",
  //   soilTestInfo:[{ soil_type:"x", soil_category:"x", crop_recommendations:"x", fertilizer_recomendation:"x"}]]
  const [updateTheseField, setUpdateTheseField] = useState([]);

  // State for inputs

  const [expanded, setExpanded] = useState(false);

  //const [inputNamesetFieldName]

  const handlePress = () => setExpanded(!expanded);

  const addToField = (fields, newFieldName, newFieldLonLat) => {
    let nextIndex = "";
    let exists = 0;

    // If key exists
    for (let i = 0; i < fields.length; i++) {
      if (
        Object.keys(fields[i]).filter((e) => e !== "key")[0] ===
        newFieldName.trim()
      ) {
        nextIndex = fields[i]["key"];
        exists = 1;
        break;
      }
    }

    // If variable nextIndex is empty
    // If key doesnt exist
    /*if (exists === 0) {
      nextIndex = (fields.length + 1).toString();
    }
    */

    const payload = {
      [nextIndex]: {
        key: nextIndex,
        [newFieldName.trim()]: newFieldLonLat,
      },
    };
    props.addUpdateDataTransaction(nextIndex, ADD_UPDATE_FIELD, payload);

    setFields(dicArrayConv(props.fields));
  };

  ////////////////////////////////////// array "newInformation"
  const newInformation = () => {
    const infor = [];
    /* infor.push({ [Object.keys(soilType)]: soilType });
    infor.push({ [Object.keys(soilCategory)]: soilCategory });
    infor.push({ [Object.keys(cropRecomendations)]: cropRecomendations });
    infor.push({
      [Object.keys(fertilizerRecomendations)]: fertilizerRecomendations,
    }); */
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
    props.fields[fieldKey]["soil_testing"] !== undefined
      ? props.fields[fieldKey]["soil_testing"].map((value, index, arr) => {
          if (value["soilType"]) {
            setSoilType(value["soilType"]);
          }
          if (value["soilCategory"]) {
            setSoilCategory(value["soilCategory"]);
          }
          if (value["cropRecomendations"]) {
            setCropRecomendations(value["cropRecomendations"]);
          }
          if (value["fertilizerRecomendations"]) {
            setFertilizerRecomendations(value["fertilizerRecomendations"]);
          }
        })
      : console.log("Nothing");

    //console.log(soilType);
    showDialog();
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={stylesLocal.listItem}>
          <Text
            style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}
          >
            Enter Field Soil Testing results per field
          </Text>
          {fields.map((value, index) => {
            return (
              <TouchableRipple
                onPress={() =>
                  onFieldSelect(
                    value["key"] //Object.keys(value).filter((v, i, a) => v === "key")[0]
                  )
                }
                key={index}
              >
                <Text style={{ textAlign: "center", fontSize: 35 }}>
                  {value["field_name"]}
                </Text>
              </TouchableRipple>
            );
          })}
        </View>

        <Button onPress={() => console.log(props.fields)}>Test Button</Button>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Enter soil results please</Dialog.Title>
            <Dialog.Content>
              {/* <TextInput
                placeholder={"Enter Field Name"}
                onChangeText={(e) => setFieldName(e)}
                style={{ width: "80%" }}
              /> */}
              {soilTestingFieldInputs.map((value, index, arr) => (
                <React.Fragment key={value.key}>
                  <List.Item title={value.input_name}></List.Item>
                  <TextInput
                    placeholder={"ENTER " + value.input_name}
                    onChangeText={(e) => eval("(" + value.set + ")")}
                  />
                </React.Fragment>
              ))}
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => updateInformation(recordKey, newInformation())}
              >
                Add Soil Results
              </Button>
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
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  fields: state.addUpdateReducer.fields,
  soilTestingFieldInputs: state.addUpdateReducer.soilTestingFieldInputs,
});

export default connect(mapStateToProps, { addUpdateDataTransaction })(
  SoilTesting
);
