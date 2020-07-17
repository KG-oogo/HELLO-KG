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

import MultipleDatePicker from "react-multiple-datepicker";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

//Planting and Estimated Harvest Date Calender
const Cal = (props) => {
  return (
    <Calendar
      // Enable horizontal scrolling, default = false
      horizontal={true}
      // Enable paging on horizontal, default = false
      pagingEnabled={true}
      // Set custom calendarWidth.
      calendarWidth={320}
      pastScrollRange={0}
      futureScrollRange={12}
      markedDates={{
        [props.cropPlan[props.date]]: { selected: true },
      }}
      onDayPress={(day) => {
        props.setCropPlan({ ...props.cropPlan, [props.date]: day.dateString });
        //console.log("selected day", day);
      }}
    />
  );
};

//Frequency Calendar List
const CalList = (props) => {
  useEffect(() => {
    //console.log(props.irrigationInfo.frequency);
    /* props.setIrrigationInfo({
      ...props.irrigationInfo,
      frequency: {
        ...props.irrigationInfo.frequency,
        [props.irrigationKey]: props.calenderList,
      },
    }); */
  }, [props.calenderList]);

  const createMarkedDates = (day, object, objectUpdater) => {
    /*
      
      {
        "2020-06-16": { selected: true },
      }
    */

    objectUpdater({
      ...object,
      [day.dateString]: { selected: true },
    });

    /*const [frequencyNow, setFrequencyNow] = useState(
      props.irrigationInfo.frequency
    );
     setFrequencyNow({
      ...frequencyNow,
      [props.irrigationKey]: irrigationDates,
    }); */

    const object2 = props.calenderList;

    /* props.setIrrigationInfo({
      ...props.irrigationInfo,
      frequency: {
        ...props.irrigationInfo.frequency,
        [props.irrigationKey]: object2,
      },
    }); */

    //console.log(object2);
    /* props.setIrrigationInfo({
      ...props.irrigationInfo,
      frequency: [props.irrigationKey], //: irrigationDates,
    }); */
  };

  return (
    <Calendar
      // Enable horizontal scrolling, default = false
      horizontal={true}
      // Enable paging on horizontal, default = false
      pagingEnabled={true}
      // Set custom calendarWidth.
      calendarWidth={320}
      pastScrollRange={0}
      futureScrollRange={12}
      markedDates={props.calenderList}
      onDayPress={(day) => {
        /*
        props.calenderListChanger({
          ...props.calenderList,
          [day.dateString]: { selected: true },
        });
        console.log(props.calenderList);
         props.setIrrigationInfo({
          ...props.irrigationInfo,
          frequency: {
            ...props.irrigationInfo.frequency,
            [props.irrigationKey]: props.calenderList,
          },
        }); */
        createMarkedDates(day, props.calenderList, props.calenderListChanger);
      }}
    />
  );
};

function CropPlanning(props) {
  const [fields, setFields] = useState(dicArrayConv(props.fields));
  //const soilTestingFieldInputs = dicArrayConv(props.soilTestingFieldInputs);

  const [expanded, setExpanded] = useState(false);

  //const [inputNamesetFieldName]

  const handlePress = () => {
    setExpanded(!expanded);
  };

  // Frequency List
  const [expandedFrequency, setExpandedFrequency] = useState(false);
  const handleFrequencyPress = () => {
    setExpandedFrequency(!expandedFrequency);
  };

  // Crop Plan Dialog
  const todayDate = new Date();
  const today =
    todayDate.getFullYear() +
    "-" +
    (todayDate.getMonth() + 1) +
    "-" +
    todayDate.getDate();
  const [cropPlan, setCropPlan] = useState({
    irrigation_info: {},
    planting_date: today,
    estimate_harvest_date: "",
    seed_variety: "",
    pestecide_type: "",
  });
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // Irrigation
  const [irrigationInfo, setIrrigationInfo] = useState({
    area: "",
    duration: "",
    water_quantity: "",
    qty_ha: "",

    frequency: {},
    cost: "",
  });
  const [visibleIrrigationInfo, setVisibleIrrigationInfo] = useState(false);
  const showIrrigationInfoDialog = () => setVisibleIrrigationInfo(true);
  const hideIrrigationInfoDialog = () => setVisibleIrrigationInfo(false);

  const [visibleCalender, setVisibleCalender] = useState(false);
  const showCalenderDialog = () => setVisibleCalender(true);
  const hideCalenderDialog = () => setVisibleCalender(false);

  //Planting and Estimated Harvest Date Calender
  const [visiblePlantingCalender, setVisiblePlantingCalender] = useState(false);
  const showPlantingCalenderDialog = () => setVisiblePlantingCalender(true);
  const hidePlantingCalenderDialog = () => setVisiblePlantingCalender(false);
  const [visibleEstimatedCalender, setVisibleEstimatedCalender] = useState(
    false
  );
  const showEstimatedCalenderDialog = () => setVisibleEstimatedCalender(true);
  const hideEstimatedCalenderDialog = () => setVisibleEstimatedCalender(false);

  //Frequency Calendar List
  //Objects
  const [plantingCalenderList, setPlantingCalenderList] = useState({});
  const [growthCalenderList, setGrowthCalenderList] = useState({});
  const [harvestCalenderList, setHarvestCalenderList] = useState({});
  const [
    visiblePlantingCalenderList,
    setVisiblePlantingCalenderList,
  ] = useState(false);
  const showPlantingCalenderListDialog = () =>
    setVisiblePlantingCalenderList(true);
  const hidePlantingCalenderListDialog = () =>
    setVisiblePlantingCalenderList(false);

  const [visibleGrowthCalenderList, setVisibleGrowthCalenderList] = useState(
    false
  );
  const showGrowthCalenderListDialog = () => setVisibleGrowthCalenderList(true);
  const hideGrowthCalenderListDialog = () =>
    setVisibleGrowthCalenderList(false);

  const [visibleHarvestCalenderList, setVisibleHarvestCalenderList] = useState(
    false
  );
  const showHarvestCalenderListDialog = () =>
    setVisibleHarvestCalenderList(true);
  const hideHarvestCalenderListDialog = () =>
    setVisibleHarvestCalenderList(false);

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

      frequency: {},
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
        <ScrollView contentContainerStyle={stylesLocal.listItem}>
          <List.Section title="Fields">
            {fields.map((value, index, arr) => {
              return (
                <List.Accordion
                  title={value.field_name.name}
                  left={(props) => <List.Icon {...props} />}
                  expanded={(e) => {
                    console.log(e);
                    return expanded;
                  }}
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
              <React.Fragment>
                <Button
                  mode="outlined"
                  onPress={() => showPlantingCalenderDialog()}
                  icon="calendar"
                >
                  Enter Planting Date:
                </Button>

                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {cropPlan.planting_date}
                </Text>
              </React.Fragment>

              <React.Fragment>
                <Button
                  mode="outlined"
                  onPress={() => showEstimatedCalenderDialog()}
                  icon="calendar"
                >
                  Estimated Harvest Date:
                </Button>

                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {cropPlan.estimate_harvest_date}
                </Text>
              </React.Fragment>

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
                  label={"Estimated Cost"}
                  placeholder={"ENTER COST"}
                  value={irrigationInfo.cost}
                  onChangeText={(e) =>
                    setIrrigationInfo({ ...irrigationInfo, cost: e })
                  }
                  keyboardType={"number-pad"}
                />

                <List.Accordion
                  title="Frequency"
                  left={(props) => <List.Icon {...props} />}
                  expanded={expandedFrequency}
                  onPress={handleFrequencyPress}
                  style={{ width: "100%", alignItems: "center" }}
                >
                  <Button
                    mode="outlined"
                    onPress={() => showPlantingCalenderListDialog()}
                    icon="calendar"
                  >
                    Planting
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={() => showGrowthCalenderListDialog()}
                    icon="calendar"
                  >
                    Growth
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={() => showHarvestCalenderListDialog()}
                    icon="calendar"
                  >
                    Harvest
                  </Button>
                </List.Accordion>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => hideIrrigationInfoDialog()}>
                  Update Irrigation
                </Button>
              </Dialog.Actions>
            </Dialog>

            <Dialog
              visible={visiblePlantingCalenderList}
              onDismiss={hidePlantingCalenderListDialog}
            >
              <Dialog.Title>
                Enter Irrigation Dates During Planting please
              </Dialog.Title>
              <Dialog.Content>
                <CalList
                  calenderList={plantingCalenderList}
                  calenderListChanger={setPlantingCalenderList}
                  irrigationKey={"planting"}
                  irrigationInfo={irrigationInfo}
                  setIrrigationInfo={setIrrigationInfo}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    hidePlantingCalenderListDialog();
                    setIrrigationInfo({
                      ...irrigationInfo,
                      frequency: {
                        ...irrigationInfo.frequency,
                        planting: plantingCalenderList,
                      },
                    });
                  }}
                >
                  Close
                </Button>
              </Dialog.Actions>
            </Dialog>

            <Dialog
              visible={visibleGrowthCalenderList}
              onDismiss={hideGrowthCalenderListDialog}
            >
              <Dialog.Title>
                Enter Irrigation Dates During Growth Please
              </Dialog.Title>
              <Dialog.Content>
                <CalList
                  calenderList={growthCalenderList}
                  calenderListChanger={setGrowthCalenderList}
                  irrigationKey={"growth"}
                  irrigationInfo={irrigationInfo}
                  setIrrigationInfo={setIrrigationInfo}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    hideGrowthCalenderListDialog();
                    setIrrigationInfo({
                      ...irrigationInfo,
                      frequency: {
                        ...irrigationInfo.frequency,
                        growth: growthCalenderList,
                      },
                    });
                  }}
                >
                  Close
                </Button>
              </Dialog.Actions>
            </Dialog>

            <Dialog
              visible={visibleHarvestCalenderList}
              onDismiss={hideHarvestCalenderListDialog}
            >
              <Dialog.Title>
                Enter Irrigation Dates During Harvest Please
              </Dialog.Title>
              <Dialog.Content>
                <CalList
                  calenderList={harvestCalenderList}
                  calenderListChanger={setHarvestCalenderList}
                  irrigationKey={"harvest"}
                  irrigationInfo={irrigationInfo}
                  setIrrigationInfo={setIrrigationInfo}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    hideHarvestCalenderListDialog();
                    setIrrigationInfo({
                      ...irrigationInfo,
                      frequency: {
                        ...irrigationInfo.frequency,
                        harvest: harvestCalenderList,
                      },
                    });
                  }}
                >
                  Close
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          <Dialog
            visible={visiblePlantingCalender}
            onDismiss={hidePlantingCalenderDialog}
          >
            <Dialog.Title>Enter Planting Date please</Dialog.Title>
            <Dialog.Content>
              <Cal
                cropPlan={cropPlan}
                setCropPlan={setCropPlan}
                date={"planting_date"}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => hidePlantingCalenderDialog()}>
                Close
              </Button>
            </Dialog.Actions>
          </Dialog>

          <Dialog
            visible={visibleEstimatedCalender}
            onDismiss={hideEstimatedCalenderDialog}
          >
            <Dialog.Title>Enter Estimated Harvest Date please</Dialog.Title>
            <Dialog.Content>
              <Cal
                cropPlan={cropPlan}
                setCropPlan={setCropPlan}
                date={"estimate_harvest_date"}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => hideEstimatedCalenderDialog()}>
                Close
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </React.Fragment>
  );
}

//var date = new Date().getDate(); //Current Date
const stylesLocal = StyleSheet.create({
  listItem: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => ({
  fields: state.addUpdateReducer.fields,
  soilTestingFieldInputs: state.addUpdateReducer.soilTestingFieldInputs,
});

export default connect(mapStateToProps, { addUpdateDataTransaction })(
  CropPlanning
);
