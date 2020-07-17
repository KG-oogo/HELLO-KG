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
    /* for (const [key, value] of Object.entries(soilTestObject)) {
      return (
        <TextInput
          label={key}
          placeholder={"ENTER " + key}
          onChangeText={(e) => setSoilTestObject({ ...soilTestObject, key: e })}
        />
      );
    } 
    ////////////////////////////////
    //const [k, val] = value;
      //console.log(k);
    */
    Object.entries(soilTestObject).map((value, key, arr) => (
      <React.Fragment>
        <TextInput
          label={value[0]}
          placeholder={"ENTER " + value[0]}
          //onChangeText={(e) => setSoilTestObject({ ...soilTestObject, k: e })}
        />
        {console.log("Hi")}
        <Text>Hi</Text>
      </React.Fragment>
    ));
  };

  /* useEffect(() => {
    setFields(dicArrayConv(props.fields));
  }, [setFields]); */
  //
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
              <Button
                mode="contained"
                onPress={() => onFieldSelect(value["key"])}
              >
                {value["field_name"]["name"]}
              </Button>
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
              /> 
              soil_type: "",
    soil_category: "",
    crop_recomendations: "",
    fertilizer_recomendations: "",
              
              */}
              {
                <React.Fragment>
                  <TextInput
                    label={"Soil Type"}
                    placeholder={"ENTER Soil Type"}
                    value={soilTestObject.soil_type}
                    onChangeText={(e) =>
                      setSoilTestObject({ ...soilTestObject, soil_type: e })
                    }
                  />

                  <TextInput
                    label={"Soil Category"}
                    placeholder={"ENTER SOIL CATEGORY"}
                    value={soilTestObject.soil_category}
                    onChangeText={(e) =>
                      setSoilTestObject({ ...soilTestObject, soil_category: e })
                    }
                  />

                  <TextInput
                    label={"Crop Recomendations"}
                    placeholder={"ENTER CROP RECOMENDATIONS"}
                    value={soilTestObject.crop_recomendations}
                    onChangeText={(e) =>
                      setSoilTestObject({
                        ...soilTestObject,
                        crop_recomendations: e,
                      })
                    }
                  />

                  <TextInput
                    label={"Fertilizer Recomendations"}
                    placeholder={"ENTER FERTILIZER RECOMENDATIONS"}
                    value={soilTestObject.fertilizer_recomendations}
                    onChangeText={(e) =>
                      setSoilTestObject({
                        ...soilTestObject,
                        fertilizer_recomendations: e,
                      })
                    }
                  />
                </React.Fragment>
              }
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => updateInformation(recordKey, soilTestObject)}
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

/* OLD ENTER SOIL RESULTS
{soilTestingFieldInputs.map((value, index, arr) => (
                <React.Fragment key={value.key}>
                   <List.Item title={value.input_name}></List.Item> 
                  <TextInput
                    label={value.input_name}
                    placeholder={"ENTER " + value.input_name}
                    onChangeText={(e) => eval("(" + value.set + ")")}
                  />
                </React.Fragment>
              ))}

{Object.entries(soilTestObject).map((value, key, arr) => {
                return (
                  <React.Fragment key={key}>
                    <TextInput
                      label={value[0].replace("_", " ").toUpperCase()}
                      placeholder={
                        "ENTER " + value[0].replace("_", " ").toUpperCase()
                      }
                      onChangeText={
                        (e) => console.log("pressed")
                         setSoilTestObject({ ...soilTestObject, [value[0]]: e }) 
                      }
                      />
                    </React.Fragment>
                  );
                })}
*/

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
