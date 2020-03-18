import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';
import Iconfa from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-check-box';



class LabelInput extends Component {
  constructor(prop) {
    super(prop);

    this.state = {
      selectedCheckbox: {}, // keep selected item in state, by default its empty meaning nothing is selected
      checkboxValue: [
        {
          label: "Option1",
          value: 1
        },
        {
          label: "Option2",
          value: 2
        },
        {
          label: "Option3",
          value: 3
        },
        {
          label: "Option4",
          value: 4
        },
        {
          label: "Option5",
          value: 5
        }
      ]
    };
  }

  CheckMe = selectedCheckbox => {
    this.setState({ selectedCheckbox }); // update selected item
  };

  render() {
    const { checkboxValue, selectedCheckbox } = this.state;

    return (
      <View style={styles.listItem}>
        <View >
          <View >
            <View style={{ flexDirection: "row" }}>
              {checkboxValue.map((option, indexInArray) => {
                return (
                  <CheckBox
                    key={option.value}
                    isChecked={option.value === selectedCheckbox.value} // for current element
                    onClick={(value, index) => this.CheckMe(option)} // pass index of toggled element
                    label={option.label}
                    styleLabel={{ fontSize: 17 }}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listItem: {
      width: "95%",
      backgroundColor: "#fff",
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      marginLeft: "2.5%",
      marginBottom: 2,
      borderColor: '#fff',
      flexDirection: 'column',
      alignItems: 'center',
  },
  placeImage: {
      marginRight: 8,
      height: 30,
      width: 30
  },
  row: {
      flex: 1,
      flexDirection: "row",
      // justifyContent: "space-between",
  }
});
export default LabelInput;

