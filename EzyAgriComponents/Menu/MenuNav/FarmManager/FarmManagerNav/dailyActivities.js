import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  Button,
  Card,
  Title,
  Paragraph,
  List,
  Checkbox,
  TextInput,
  Modal,
  Portal,
  Text,
  Provider,
  Dialog,
  TouchableRipple,
} from "react-native-paper";

import { connect } from "react-redux";
import { mdiCart } from "@mdi/js";
import { dicArrayConv } from "../../../../Redux/dataConvertor";

import TopMenu from "../../../../TopMenu/topMenu";

//import styles from "../../../../styles";

import {
  action,
  addUpdateDataTransaction,
  deleteDataTransaction,
  DELETE_INVENTORY,
  ADD_UPDATE_MY_INVENTORY,
  ADD_UPDATE_MY_PRODUCE,
} from "../../../../Redux/types";

import { withNavigation, StackRouter } from "react-navigation";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import { Calendar, CalendarList, Agenda } from "react-native-calendars";

import AgendaScreen from "./ajenda";
const menuItems = [
  {
    key: "1",
    item: "name",
  },
  {
    key: "2",
    item: "description",
  },
  {
    key: "3",
    item: "unit_price",
  },
  {
    key: "4",
    item: "quantity_in_stock",
  },
  {
    key: "5",
    item: "reorder_level",
  },

  {
    key: "6",
    item: "reorder_time_in_days",
  },
  {
    key: "7",
    item: "quantity_in_reorder",
  },
  {
    key: "8",
    item: "discontinued",
  },
];
/*


*/

function DailyActivities(props, { route, navigation }) {
  // Filter product list by user_id
  const inventoryFilterByUserId = (inventory) => {
    console.log(inventory);
    if (Object.keys(inventory).length === 0) {
      return dicArrayConv(inventory);
    } else {
      dicArrayConv(inventory).filter((value) => {
        //console.log(value);
        if (value.user_id !== undefined) {
          return value.user_id === props.user_id;
        } else {
          return dicArrayConv(inventory);
        }
      });
    }
  };

  //inventoryFilterByUserId(props.inventory)
  const [myProduce, setMyProduce] = useState(dicArrayConv(props.myProduce));
  const [inventory, setInventory] = useState(dicArrayConv(props.inventory));
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = () => {
    console.log("");
  };

  // Dialog
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    unit_price: "",
    quantity_in_stock: "",
    reorder_level: "",
    reorder_time_in_days: "",
    quantity_in_reorder: "",
    discontinued: "",
    user_id: props.user_id,
  });

  const [image, setImage] = useState(null);

  const [recordKey, setRecordKey] = useState("");
  const updateInformation = (inventory, newInformation) => {
    //console.log(newInformation);
    let nextIndex = "";
    let exists = 0;

    // If variable nextIndex is empty
    // If key doesnt exist
    if (exists === 0) {
      nextIndex = (inventory.length + 1).toString();
    }

    /**/

    const payload = {
      [nextIndex]: {
        key: nextIndex,
        inventory: newInformation,
      },
    };

    props.addUpdateDataTransaction(nextIndex, ADD_UPDATE_MY_INVENTORY, payload);
    //props.addUpdateDataTransaction(nextIndex, ADD_UPDATE_MY_PRODUCE, payload);

    setProduct({
      name: "",
      description: "",
      unit_price: "",
      quantity_in_stock: "",
      reorder_level: "",
      reorder_time_in_days: "",
      quantity_in_reorder: "",
      discontinued: "",
      user_id: props.user_id,
    });
    setImage(null);
    hideDialog();
  };

  const deleteProduct = (key) => {
    const payload = key;
    //console.log(payload);

    props.deleteDataTransaction(DELETE_INVENTORY, payload);
  };

  /*
<Calendar
          // Specify style for calendar container element. Default = {}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            height: 350,
          }}
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#b6c1cd",
            textSectionTitleDisabledColor: "#d9e1e8",
            selectedDayBackgroundColor: "#00adf5",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#00adf5",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
            dotColor: "#00adf5",
            selectedDotColor: "#ffffff",
            arrowColor: "orange",
            disabledArrowColor: "#d9e1e8",
            monthTextColor: "blue",
            indicatorColor: "blue",
            textDayFontFamily: "monospace",
            textMonthFontFamily: "monospace",
            textDayHeaderFontFamily: "monospace",
            textDayFontWeight: "300",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "300",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
<Agenda
          // The list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key has to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={{
            "2012-05-22": [{ name: "item 1 - any js object" }],
            "2012-05-23": [{ name: "item 2 - any js object", height: 80 }],
            "2012-05-24": [],
            "2012-05-25": [
              { name: "item 3 - any js object" },
              { name: "any js object" },
            ],
          }}
          // Callback that gets called when items for a certain month should be loaded (month became visible)
          loadItemsForMonth={(month) => {
            console.log("trigger items loading");
          }}
          // Callback that fires when the calendar is opened or closed
          onCalendarToggled={(calendarOpened) => {
            console.log(calendarOpened);
          }}
          // Callback that gets called on day press
          onDayPress={(day) => {
            console.log("day pressed");
          }}
          // Callback that gets called when day changes while scrolling agenda list
          onDayChange={(day) => {
            console.log("day changed");
          }}
          // Initially selected day
          selected={"2012-05-16"}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={"2012-05-10"}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={"2012-05-30"}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // Specify how each item should be rendered in agenda
          renderItem={(item, firstItemInDay) => {
            return <View />;
          }}
          // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
          renderDay={(day, item) => {
            return <View />;
          }}
          // Specify how empty date content with no items should be rendered
          renderEmptyDate={() => {
            return <View />;
          }}
          // Specify how agenda knob should look like
          renderKnob={() => {
            return <View />;
          }}
          // Specify what should be rendered instead of ActivityIndicator
          renderEmptyData={() => {
            return <View />;
          }}
          // Specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {
            return r1.text !== r2.text;
          }}
          // Hide knob button. Default = false
          hideKnob={true}
          // By default, agenda dates are marked if they have at least one item, but you can override this if needed
          markedDates={{
            "2012-05-16": { selected: true, marked: true },
            "2012-05-17": { marked: true },
            "2012-05-18": { disabled: true },
          }}
          // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
          disabledByDefault={true}
          // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
          onRefresh={() => console.log("refreshing...")}
          // Set this true while waiting for new data from a refresh
          refreshing={false}
          // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
          refreshControl={null}
          // Agenda theme
          theme={{
            //...calendarTheme,
            agendaDayTextColor: "yellow",
            agendaDayNumColor: "green",
            agendaTodayColor: "red",
            agendaKnobColor: "blue",
          }}
          // Agenda container style
          style={{
            borderWidth: 1,
            borderColor: "gray",
            height: "30%",
            width: "50%",
          }}
        />



*/
  // Today' date
  const todayDate = new Date();
  const today =
    todayDate.getFullYear() +
    "-" +
    (todayDate.getMonth().toString().length > 1
      ? todayDate.getMonth() + 1
      : "0" + (todayDate.getMonth() + 1)) +
    "-" +
    todayDate.getDate();

  // Render item
  const renderItem = (item, firstItemInDay) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  // Render empty date
  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  // Get day's agenda
  //
  const dayItemsTest = {
    "2020-07-16": {
      "2020-07-16": [
        { name: "item 3 - 2020-07-16" },
        { name: "any js object" },
      ],
    },
    "2020-07-17": {
      "2020-07-17": [
        { name: "item 3 - 2020-07-17" },
        { name: "any js object" },
      ],
    },
    "2020-07-18": {
      "2020-07-18": [
        { name: "item 3 - 2020-07-18" },
        { name: "any js object" },
      ],
    },
  };

  console.log("################################");
  console.log(today);
  console.log("################################");
  const [dayItems, setDayItems] = useState(dayItemsTest[today]);
  const getDayAgenda = (day) => {};

  return (
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
      <View style={{ width: "100%", height: "65%" }}>
        <Agenda
          // The list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key has to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={dayItems}
          // Callback that gets called when items for a certain month should be loaded (month became visible)
          loadItemsForMonth={(month) => {
            console.log("trigger items loading");
          }}
          // Callback that fires when the calendar is opened or closed
          onCalendarToggled={(calendarOpened) => {
            console.log(calendarOpened);
          }}
          // Callback that gets called on day press
          onDayPress={(day) => {
            //console.log(day);
            //console.log(dayItemsTest[day.dateString]);
            setDayItems(() => dayItemsTest[day.dateString]);
            console.log(dayItems);
          }}
          // Callback that gets called when day changes while scrolling agenda list
          onDayChange={(day) => {
            console.log("day changed");
          }}
          // Initially selected day
          selected={() => today}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          //minDate={"2012-05-10"}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          //maxDate={"2012-05-30"}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // Specify how each item should be rendered in agenda
          renderItem={renderItem}
          /* renderItem={(item, firstItemInDay) => {
            return <View />;
          }} */
          // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
          renderDay={(day, item) => {
            return <View />;
          }}
          // Specify how empty date content with no items should be rendered
          renderEmptyDate={() => {
            return <View />;
          }}
          // Specify how agenda knob should look like
          renderKnob={() => {
            return <View />;
          }}
          // Specify what should be rendered instead of ActivityIndicator
          renderEmptyData={() => {
            return <View />;
          }}
          // Specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {
            return r1.text !== r2.text;
          }}
          // Hide knob button. Default = false
          hideKnob={true}
          // By default, agenda dates are marked if they have at least one item, but you can override this if needed
          markedDates={{
            "2012-05-16": { selected: true, marked: true },
            "2020-07-17": { marked: true },
            "2012-05-18": { disabled: true },
          }}
          // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
          disabledByDefault={true}
          // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
          onRefresh={() => console.log("refreshing...")}
          // Set this true while waiting for new data from a refresh
          refreshing={false}
          // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
          refreshControl={null}
          // Agenda theme
          theme={{
            //...calendarTheme,
            agendaDayTextColor: "yellow",
            agendaDayNumColor: "green",
            agendaTodayColor: "red",
            agendaKnobColor: "blue",
          }}
          // Agenda container style
          style={{}}
        />
      </View>
      <View style={stylesLocal.buttons}>
        <Button
          onPress={() => {
            props.navigation.navigate("FarmManager");
          }}
          mode={"contained"}
          style={{ margin: "2%" }}
        >
          Add Activity
        </Button>

        <Button
          onPress={() => {
            props.navigation.navigate("FarmManager");
          }}
          mode={"contained"}
          style={{ margin: "2%" }}
        >
          Delete Activity
        </Button>
      </View>
    </View>
  );
}

const ProductImage = (props) => {
  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      props.setProduct({ ...props.product, picture: result.uri });

      if (!result.cancelled) {
        props.setImage(result.uri);
        //props.setProduct({ ...inventory, picture: result.uri });
      }

      console.log(props.product);
    } catch (E) {
      console.log(E);
    }
  };
  //style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  //<Button title="Pick an image from camera roll" onPress={pickImage()} />
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Button mode="outlined" onPress={() => pickImage()}>
        Add Picture
      </Button>
      {props.image && (
        <Image
          source={{ uri: props.image }}
          style={{ width: 100, height: 100 }}
        />
      )}
    </View>
  );
};

const stylesLocal = StyleSheet.create({
  container: {
    //justifyContent: "center",
    //alignItems: "center",
    //flex: 1,
  },
  view: {
    //justifyContent: "center",
    alignItems: "center",
    //flexDirection: "row",
    //flexWrap: "wrap",
    //margin: "5%",
    height: "75%",
  },
  items: {
    margin: "5%",
    width: "80%",
    //justifyContent: "center",
    //alignItems: "center",
  },
  card: {
    //paddingVertical: "15%"
  },
  buttons: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

const mapStateToProps = (state) => ({
  inventory: state.addUpdateReducer.inventory,
  user_id: state.addUpdateReducer.user_id,
});

export default connect(mapStateToProps, {
  addUpdateDataTransaction,
  deleteDataTransaction,
})(withNavigation(DailyActivities));
