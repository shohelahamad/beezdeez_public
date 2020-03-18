import React from "react";
import { TextInput, StyleSheet } from "react-native";

const defaultInput = props => (
  <TextInput
    underlineColorAndroid="transparent"
    {...props}
    style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : props.valid && props.touched ? styles.valid : null ]}
  />
);

const styles = StyleSheet.create({
  invalid: {
    // backgroundColor: '#f9c0c0',
    borderBottomColor: "red"
  },
  valid: {
    // backgroundColor: '#f9c0c0',
    borderBottomColor: "green"
  }
});

export default defaultInput;
