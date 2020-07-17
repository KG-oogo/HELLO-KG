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

function CropManagement(props) {
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

  const [cropPlanObject, setCropPlanObject] = useState({
    irrigation_info: "",
    planting_date: "",
    estimate_harvest_date: "",
    seed_variety: "",
    pestecide_type: "",
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
    //console.log(props.fields[fieldKey]);
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

    if (props.fields[fieldKey]["crop_planning"] !== undefined) {
      setCropPlanObject({
        irrigation_info:
          props.fields[fieldKey]["crop_planning"]["irrigation_info"],
        planting_date: props.fields[fieldKey]["crop_planning"]["planting_date"],
        estimate_harvest_date:
          props.fields[fieldKey]["crop_planning"]["estimate_harvest_date"],
        seed_variety: props.fields[fieldKey]["crop_planning"]["seed_variety"],
        pestecide_type:
          props.fields[fieldKey]["crop_planning"]["pestecide_type"],
      });
    }

    //console.log(soilType);
    showDialog();
  };

  /* useEffect(() => {
    setFields(dicArrayConv(props.fields));
  }, [setFields]); */
  //
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
            Crop information per field
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
            <Dialog.Title>Crop Information</Dialog.Title>
            <Dialog.Content>
              {
                <React.Fragment>
                  <Text style={stylesLocal.labelDialog}>{"Planting Date"}</Text>
                  <Text>{cropPlanObject.planting_date}</Text>
                  <Text style={stylesLocal.labelDialog}>
                    {"Estimate Harvest Date"}
                  </Text>
                  <Text>{cropPlanObject.estimate_harvest_date}</Text>
                  <Text style={stylesLocal.labelDialog}>{"Seed Variety"}</Text>
                  <Text>{cropPlanObject.seed_variety}</Text>
                  <Text style={stylesLocal.labelDialog}>
                    {"Pestecide Type"}
                  </Text>
                  <Text>{cropPlanObject.pestecide_type}</Text>
                  <Text style={stylesLocal.labelDialog}>
                    {"Irrigation Info"}
                  </Text>
                  <Text>
                    - Duration: {cropPlanObject.irrigation_info.duration}
                  </Text>
                  <Text>
                    - Water Quantity:
                    {cropPlanObject.irrigation_info.water_quantity}
                  </Text>
                  <Text>
                    - Quantity Per Hectre:
                    {cropPlanObject.irrigation_info.qty_ha}
                  </Text>
                  <Text>
                    - Estimated Cost:
                    {cropPlanObject.irrigation_info.cost}
                  </Text>
                  <Text>- Frequency:</Text>
                  <Text>{"   "}-- Planting:</Text>{" "}
                  {cropPlanObject.irrigation_info.frequency !== undefined ? (
                    Object.keys(
                      cropPlanObject.irrigation_info.frequency.planting
                    )
                      .sort()
                      .map((value) => (
                        <Text>
                          {"        "}---{value}
                        </Text>
                      ))
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                  <Text>{"   "}-- Growth:</Text>
                  {cropPlanObject.irrigation_info.frequency !== undefined ? (
                    Object.keys(cropPlanObject.irrigation_info.frequency.growth)
                      .sort()
                      .map((value) => (
                        <Text>
                          {"        "}---{value}
                        </Text>
                      ))
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                  <Text>{"   "}-- Harvest:</Text>
                  {cropPlanObject.irrigation_info.frequency !== undefined ? (
                    Object.keys(
                      cropPlanObject.irrigation_info.frequency.harvest
                    )
                      .sort()
                      .map((value) => (
                        <Text>
                          {"        "}---{value}
                        </Text>
                      ))
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
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
  CropManagement
);
