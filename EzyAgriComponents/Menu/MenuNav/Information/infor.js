import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  TouchableRipple,
  Searchbar,
} from "react-native-paper";
import { withNavigation } from "react-navigation";
import TopMenu from "../../../TopMenu/topMenu";
import { dicArrayConv } from "../../../Redux/dataConvertor";
import { connect } from "react-redux";

function Information(props) {
  const [infoMenu, setInfoMenu] = useState(dicArrayConv(props.infoMenu));
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = () => {
    console.log("");
  };

  const currentTime = new Date().toJSON().slice(0, 10);

  return (
    <View style={styles.container}>
      <TopMenu />
      <View style={stylesLocal.view}>
        <Card style={stylesLocal.items} elevation={10}>
          <Title>Weather</Title>
          <Paragraph>KZN</Paragraph>
          <Paragraph>{currentTime}</Paragraph>
          <Paragraph>Rain</Paragraph>
          <Card.Actions>
            <Button mode="contained" onPress={() => console.log("pressed")}>
              View More
            </Button>
          </Card.Actions>
        </Card>
      </View>
      <View style={stylesLocal.view}>
        <FlatList
          style={{ width: "100%", height: "50%" }}
          // numColumns={2}
          data={infoMenu}
          //onPress={props.navigation.navigate(item.redirect)}
          renderItem={({ item }) => (
            <TouchableRipple>
              <Card style={stylesLocal.otherInfor} elevation={10}>
                <Card.Content>
                  <Title>{item.info_name}</Title>
                  <Paragraph>{item.info_description}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <Button
                    mode="contained"
                    onPress={() => {
                      props.navigation.navigate(item.redirect);
                    }}
                  >
                    View More
                  </Button>
                </Card.Actions>
              </Card>
            </TouchableRipple>
          )}
        />
      </View>
    </View>
  );
}

const stylesLocal = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
    //flexDirection: "row",
    width: "80%",

    flexWrap: "wrap",
  },
  items: {
    margin: "5%",
    paddingHorizontal: "5%",
    width: "95%",

    //justifyContent: "center",
    //alignItems: "center",
  },
  otherInfor: {
    margin: "1%",
    padding: "1%",
    //width: "90%",
  },
  card: { paddingVertical: "15%" },
});

const mapStateToProps = (state) => ({
  infoMenu: state.addUpdateReducer.infoMenu,
});

export default connect(mapStateToProps)(withNavigation(Information));

/*

.your-component-reset {
    div, span, object, iframe {
        margin: 0;
        padding: 0;
        border: 0;
        font-weight: normal;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    // add some more reset styles
}

*/
