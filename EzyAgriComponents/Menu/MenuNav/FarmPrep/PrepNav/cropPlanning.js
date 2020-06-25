import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  Text,
} from "react-native";
import {
  List,
  Checkbox,
  TextInput,
  Button,
  Modal,
  Portal,
  Provider,
  Dialog,
  Card,
  TouchableRipple,
} from "react-native-paper";
import DatePicker from "react-native-datepicker";
import { connect } from "react-redux";
import { dicArrayConv } from "../../../../Redux/dataConvertor";
import styles from "../../../../styles";

import { action, addUpdateDataTransaction } from "../../../../Redux/types";
import { ADD_UPDATE_CROP_PLAN } from "../../../../Redux/types";

function CropPlanning(props) {
  const [fields, setFields] = useState(dicArrayConv(props.fields));
  //const soilTestingFieldInputs = dicArrayConv(props.soilTestingFieldInputs);

  const [expanded, setExpanded] = useState(false);

  //const [inputNamesetFieldName]

  handlePress = () => setExpanded(!expanded);

  // Crop Plan Dialog
  const todayDate = new Date();
  const today =
    todayDate.getFullYear() +
    "-" +
    (todayDate.getMonth() + 1) +
    "-" +
    todayDate.getDate();
  const [cropPlan, setCropPlan] = useState({
    irrigation_info: "",
    planting_date: today,
    estimate_harvest_date: "",
    seed_variety: "",
    pestecide_type: "",
  });
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // Irrlgation
  const [irrigationInfo, setIrrigationInfo] = useState({
    area: "",
    duration: "",
    water_quantity: "",
    qty_ha: "",

    recurrence: "",
    cost: "",
  });
  const [visibleIrrigationInfo, setVisibleIrrigationInfo] = useState(false);
  const showIrrigationInfoDialog = () => setVisibleIrrigationInfo(true);
  const hideIrrigationInfoDialog = () => setVisibleIrrigationInfo(false);

  //{/* <List.Item title={v} />; */}
  /* switch (v) {
    case v["soil_type"] !== undefined:
      return <Text>Soil Type :{v["soil_type"]} </Text>;

    case v["soil_category"] !== undefined:
      return <Text>Soil Category :{v["soil_type"]} </Text>;

    case v["crop_recomendations"] !== undefined:
      return (
        <Text>Crop Recomendations :{v["soil_type"]} </Text>
      );

    case v["fertilizer_recomendations"] !== undefined:
      return (
        <Text>
          Fertilizer Recomendations :{v["soil_type"]}
        </Text>
      );

    default:
      console.log(v);
      return <Text>No soil testing data entered</Text>;
  } */

  /*
    OLD Crop Pllan List
    if (v["soil_type"]) {
                        return <Text>Soil Type :{v["soil_type"]} </Text>;
                      } else if (v["soil_category"]) {
                        return (
                          <Text>Soil Category :{v["soil_category"]} </Text>
                        );
                      } else if (v["crop_recomendations"]) {
                        return (
                          <Text>
                            Crop Recomendations :{v["crop_recomendations"]}
                          </Text>
                        );
                      } else if (v["fertilizer_recomendations"]) {
                        return (
                          <Text>
                            Fertilizer Recomendations :
                            {v["fertilizer_recomendations"]}
                          </Text>
                        );
                      }

  */

  // Redux commit
  const [recordKey, setRecordKey] = useState("");
  const updateInformation = (recordKey, newInformation) => {
    const payload = {
      key: recordKey,
      crop_planning: { ...newInformation, irrigation_info: irrigationInfo },
    };

    props.addUpdateDataTransaction(recordKey, ADD_UPDATE_CROP_PLAN, payload);

    //console.log(dicArrayConv(props.fields));
    setFields(dicArrayConv(props.fields));

    /* */

    setCropPlan({
      irrigation_info: "",
      planting_date: today,
      estimate_harvest_date: "",
      seed_variety: "",
      pestecide_type: "",
    });
    setIrrigationInfo({
      area: "",
      duration: "",
      water_quantity: "",
      qty_ha: "",

      recurrence: "",
      cost: "",
    });

    hideDialog();
  };

  const onCropPlanAdd = (fieldKey) => {
    setRecordKey(fieldKey);
    showDialog();
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <ScrollView style={stylesLocal.listItem}>
          <List.Section title="Fields">
            {fields.map((value, index, arr) => {
              return (
                <List.Accordion
                  title={value.field_name}
                  left={(props) => <List.Icon {...props} icon="folder" />}
                  expanded={expanded}
                  onPress={handlePress}
                >
                  {value.soil_testing !== undefined ? (
                    Object.entries(value.soil_testing).map((v, i, a) => {
                      //console.log(v.entries());
                      //return <Text>{v} </Text>;
                      return (
                        <Text>
                          {v[0]} :{v[1]}
                        </Text>
                      );
                    })
                  ) : (
                    <Text>No soil testing data entered</Text>
                  )}
                  <View>
                    <Button
                      mode="contained"
                      onPress={() => onCropPlanAdd(value["key"])}
                      style={{
                        margin: "1%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Add Crop Plan
                    </Button>
                  </View>
                </List.Accordion>
              );
            })}

            {/* <List.Accordion
              title="Field Name"
              left={(props) => <List.Icon {...props} icon="folder" />}
              expanded={expanded}
              onPress={handlePress}
            >
              <List.Item title="First item" />
              <List.Item title="Second item" />
            </List.Accordion> */}
          </List.Section>
        </ScrollView>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Enter Crop Plan please</Dialog.Title>
            <Dialog.Content>
              {/* <TextInput
                placeholder={"Enter Field Name"}
                onChangeText={(e) => setFieldName(e)}
                style={{ width: "80%" }}
              /> */}
              {/* {soilTestingFieldInputs.map((value, index, arr) => (
                <React.Fragment key={value.key}>
                  <List.Item title={value.input_name}></List.Item>
                  <TextInput
                    placeholder={"ENTER " + value.input_name}
                    //onChangeText={(e) => eval("(" + value.set + ")")}
                  />
                </React.Fragment>
              ))} */}
              <Text>Planting Date:</Text>
              <DatePicker
                style={{ width: 200 }}
                date={cropPlan.planting_date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={cropPlan.planting_date}
                maxDate="3000-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) =>
                  setCropPlan({ ...cropPlan, planting_date: date })
                }
              />

              <Text>Estimated Harvest Date:</Text>
              <DatePicker
                style={{ width: 200 }}
                date={cropPlan.estimate_harvest_date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={cropPlan.planting_date}
                maxDate="3000-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) =>
                  setCropPlan({ ...cropPlan, estimate_harvest_date: date })
                }
              />

              <TextInput
                label={"Seed Variety"}
                placeholder={"ENTER SEED VARIETY"}
                value={cropPlan.seed_variety}
                onChangeText={(e) =>
                  setCropPlan({ ...cropPlan, seed_variety: e })
                }
              />

              <TextInput
                label={"Pestecide Type"}
                placeholder={"ENTER PESTECIDE TYPE"}
                value={cropPlan.pestecide_type}
                onChangeText={(e) =>
                  setCropPlan({ ...cropPlan, pestecide_type: e })
                }
              />

              <Button
                mode="outlined"
                onPress={() => showIrrigationInfoDialog()}
              >
                Enter Irrigation Info
              </Button>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => updateInformation(recordKey, cropPlan)}>
                Add Crop Plan
              </Button>
            </Dialog.Actions>
          </Dialog>

          <Portal>
            <Dialog
              visible={visibleIrrigationInfo}
              onDismiss={hideIrrigationInfoDialog}
            >
              <Dialog.Title>Enter Irrigation Infor please</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  label={"Area"}
                  placeholder={"ENTER AREA"}
                  value={irrigationInfo.area}
                  onChangeText={(e) =>
                    setIrrigationInfo({ ...irrigationInfo, area: e })
                  }
                />

                <TextInput
                  label={"Duration"}
                  placeholder={"ENTER DURATION"}
                  value={irrigationInfo.duration}
                  onChangeText={(e) =>
                    setIrrigationInfo({ ...irrigationInfo, duration: e })
                  }
                />
                <TextInput
                  label={"Water Quantity"}
                  placeholder={"ENTER WATER QUANTITY"}
                  value={irrigationInfo.water_quantity}
                  onChangeText={(e) =>
                    setIrrigationInfo({ ...irrigationInfo, water_quantity: e })
                  }
                />
                <TextInput
                  label={"Qty/ha"}
                  placeholder={"ENTER QTY/HA"}
                  value={irrigationInfo.qty_ha}
                  onChangeText={(e) =>
                    setIrrigationInfo({ ...irrigationInfo, qty_ha: e })
                  }
                />
                <TextInput
                  label={"Recurrence"}
                  placeholder={"ENTER RECURRENCE"}
                  value={irrigationInfo.recurrence}
                  onChangeText={(e) =>
                    setIrrigationInfo({ ...irrigationInfo, recurrence: e })
                  }
                />
                <TextInput
                  label={"Cost"}
                  placeholder={"ENTER COST"}
                  value={irrigationInfo.cost}
                  onChangeText={(e) =>
                    setIrrigationInfo({ ...irrigationInfo, cost: e })
                  }
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => hideIrrigationInfoDialog()}>
                  Update Irrigation
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Portal>
      </View>
    </React.Fragment>
  );
}

//var date = new Date().getDate(); //Current Date
const stylesLocal = StyleSheet.create({
  listItem: {
    width: "80%",
  },
});

const mapStateToProps = (state) => ({
  fields: state.addUpdateReducer.fields,
  soilTestingFieldInputs: state.addUpdateReducer.soilTestingFieldInputs,
});

export default connect(mapStateToProps, { addUpdateDataTransaction })(
  CropPlanning
);

/*

<React.Fragment>
                      (
                      {value.soil_testing.map((v, i, a) => {
                        //console.log(v.entries());
                        //return <Text>{v} </Text>;
                        if (v["soil_type"]) {
                          return <Text>Soil Type :{v["soil_type"]} </Text>;
                        } else if (v["soil_category"]) {
                          return (
                            <Text>Soil Category :{v["soil_category"]} </Text>
                          );
                        } else if (v["crop_recomendations"]) {
                          return (
                            <Text>
                              Crop Recomendations :{v["crop_recomendations"]}
                            </Text>
                          );
                        } else if (v["fertilizer_recomendations"]) {
                          return (
                            <Text>
                              Fertilizer Recomendations :
                              {v["fertilizer_recomendations"]}
                            </Text>
                          );
                        }
                      })}
                      <Button
                        mode="contained"
                        onPress={() => showDialog()}
                        style={{ margin: "1%" }}
                      >
                        Add Field
                      </Button>
                      )
                    </React.Fragment>

*/
