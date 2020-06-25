import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Image, Text } from "react-native";
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
import { connect } from "react-redux";
import { dicArrayConv } from "../../../../Redux/dataConvertor";
import styles from "../../../../styles";

function FieldManagement(props) {
  const [fields, setFields] = useState(dicArrayConv(props.fields));
  //const soilTestingFieldInputs = dicArrayConv(props.soilTestingFieldInputs);

  const [expanded, setExpanded] = useState(false);

  //const [inputNamesetFieldName]

  handlePress = () => setExpanded(!expanded);

  // Dialog
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

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

  const onCropPlanAdd = () => {
    showDialog();
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={stylesLocal.listItem}>
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
                    value.soil_testing.map((v, i, a) => {
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
                    })
                  ) : (
                    <Text>No soil testing data entered</Text>
                  )}
                  <View>
                    <Button
                      mode="contained"
                      onPress={() => onCropPlanAdd()}
                      style={{
                        margin: "1%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Start Management
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
        </View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Enter Field Management Infor please</Dialog.Title>
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
              <Text>Irrigation Infor:</Text>
              <Text>Planting Date:</Text>
              <Text>Estimated Harvest Date:</Text>
              <Text>Seed Variety:</Text>
              <Text>Pestecide type:</Text>
              <Text></Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => console.log("pressed")}>
                Update Field
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
  },
});

const mapStateToProps = (state) => ({
  fields: state.addUpdateReducer.fields,
  soilTestingFieldInputs: state.addUpdateReducer.soilTestingFieldInputs,
});

export default connect(mapStateToProps)(FieldManagement);

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
