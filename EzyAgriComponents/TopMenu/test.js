import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { Spring, animated } from "react-spring/dist/react-spring-native.esm";

const styles = {
  flex: 1,
  margin: 0,
  borderRadius: 35,
  backgroundColor: "red",
  alignItems: "center",
  justifyContent: "center",
};

export default class App extends React.Component {
  state = { flag: true };
  toggle = () => this.setState((state) => ({ flag: !state.flag }));
  render() {
    const { flag } = this.state;
    return (
      <Spring native from={{ margin: 0 }} to={{ margin: flag ? 100 : 0 }}>
        {(props) => (
          <TouchableWithoutFeedback onPressIn={this.toggle}>
            <animated.View style={{ ...styles, ...props }}>
              <Text>It's working!</Text>
            </animated.View>
          </TouchableWithoutFeedback>
        )}
      </Spring>
    );
  }
}
