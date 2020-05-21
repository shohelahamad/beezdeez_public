import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity} from 'react-native';
import Iconfa from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-check-box';

class LabelInput extends Component {

constructor(prop) {
  super(prop);

  this.state = {
    selectedCheckbox: {},
    labelTitle: '',
    labelColor: '',
    checkboxValue: [
      {
        label: "Option1",
        value: "#EC2E05"
      },
      {
        label: "Option2",
        value: "#2EC6B5"
      },
      {
        label: "Option3",
        value: "#AE8BD0"
      },
      {
        label: "Option4",
        value: "#AE8B0A"
      },
      {
        label: "Option5",
        value: "#587520"
      },
      {
        label: "Option6",
        value: "#1FA9DA"
      }
    ]
  };
}
labelSubmithandelar = () => {
  if (this.state.labelTitle.trim() === "") {
    return;
  }
  this.props.onLabelAdded(
    this.state.labelTitle, 
    this.state.labelColor
    )
};
titleCahgnehandelar = (val) => {
  this.setState({
    labelTitle: val
  });
};

CheckMe = selectedCheckbox => {
  this.setState({ selectedCheckbox});
  this.setState({ labelColor: selectedCheckbox.value}); // update selected item
   // update selected item
};
render() {
  const { checkboxValue, selectedCheckbox } = this.state;
  return (
    <View style={styles.inputContainer}>
      <TextInput value={this.state.labelTitle}
        onChangeText={this.titleCahgnehandelar}
        style={styles.titleText} placeholder={"Label name"} />
      <Text style={{marginBottom: 10}}>Choose Color</Text>
      <View style={{ flexDirection: "row" }}>
            {checkboxValue.map((option, indexInArray) => {
              return (<CheckBox style={{ marginTop: 0, marginRight: 7, marginLeft: 0}}
                  checkedImage={<Iconfa style={{}} size={40} name="check-square" color={option.value} />}
                  unCheckedImage={<Icon style={{}} size={40} name="square" color={option.value}/>}
                  key={option.value}
                  isChecked={option.value === selectedCheckbox.value}
                  onClick={(value, index) => this.CheckMe(option)}
            />
              );
            })}
          </View>
      <View>
        <TouchableOpacity onPress={(this.labelSubmithandelar)}>
          <View style={styles.loginButton}>
            <Text style={styles.buttonText}> Add </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
}
const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center"
  },
  placeInput: {
    width: "65%"
  },
  placeButton: {
    width: "35%"
  },
  inputContainer: {
    width: "100%",
    // justifyContent: "space-between",
    padding: 20
  },
  emailField: {
    borderBottomWidth: 1,
    marginBottom: 10,
    borderBottomColor: "#efefef",
    height: 120,
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
    marginBottom: 15,
    height: 40,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#0641A7",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    justifyContent: "center",

  },
  buttonText: {
    color: '#fff',
  },
  headerText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 5,
    marginBottom: 25,
  },
  titleText: {
    fontSize: 30,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderBottomColor: "#efefef"
  },
  rememberMeContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  signUpContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  linkColor: {
    color: '#007bff'
  }
});
export default LabelInput;

