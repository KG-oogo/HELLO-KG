import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Image, Text } from "react-native";
import { List, Checkbox, TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";
import { dicArrayConv } from "../../../../Redux/dataConvertor";
import styles from "../../../../styles";

function CropPlanning(props) {
  const [fields, setFields] = useState(dicArrayConv(props.fields));
  //const soilTestingFieldInputs = dicArrayConv(props.soilTestingFieldInputs);

  const [expanded, setExpanded] = useState(false);

  //const [inputNamesetFieldName]

  handlePress = () => setExpanded(!expanded);

  {
  }

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
                  {/* <List.Item title="First item" />
                <List.Item title="Second item" /> */}
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

export default connect(mapStateToProps)(CropPlanning);
