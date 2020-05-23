import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import styles from "../../../../styles";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { dicArrayConv } from "../../../../Redux/dataConvertor";
import TopMenu from "../../../../TopMenu/topMenu";

function Diagnosis(props) {
  return (
    <View style={styles.container}>
      <TopMenu />
      <Text>Diagnosis</Text>
    </View>
  );
}

const stylesLocal = StyleSheet.create({});

export default connect(null)(withNavigation(Diagnosis));
