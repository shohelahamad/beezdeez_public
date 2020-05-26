import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Dimensions } from 'react-native';
const { height, width } = Dimensions.get("window");
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
        },
        {
          label: "Option7",
          value: "#F44336"
        },
        {
          label: "Option8",
          value: "#E91E63"
        },
        {
          label: "Option9",
          value: "#9C27B0"
        },
        {
          label: "Option10",
          value: "#673AB7"
        },
        {
          label: "Option11",
          value: "#3F51B5"
        },
        {
          label: "Option12",
          value: "#2196F3"
        },
        {
          label: "Option13",
          value: "#03A9F4"
        },
        {
          label: "Option14",
          value: "#00BCD4"
        },
        {
          label: "Option15",
          value: "#009688"
        },
        {
          label: "Option16",
          value: "#4CAF50"
        },
        {
          label: "Option17",
          value: "#8BC34A"
        },
        {
          label: "Option18",
          value: "#CDDC39"
        },
        {
          label: "Option19",
          value: "#FFEB3B"
        },
        {
          label: "Option20",
          value: "#FFC107"
        },
        {
          label: "Option21",
          value: "#FF9800"
        },
        {
          label: "Option22",
          value: "#FF5722"
        },
        {
          label: "Option23",
          value: "#795548"
        },
        {
          label: "Option24",
          value: "#9E9E9E"
        },
        {
          label: "Option25",
          value: "#607D8B"
        }
      ]
    };
  }
  componentDidMount() {
    if (this.props.editLabel) {
      this.setState({
        labelTitle: this.props.editLabel.labelTitle,
        labelColor: this.props.editLabel.labelColor,
        selectedCheckbox: { label: "Option26", value: this.props.editLabel.labelColor}
      });
    }
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
    this.setState({ selectedCheckbox });
    this.setState({ labelColor: selectedCheckbox.value }); // update selected item
    // update selected item
  };
  render() {
    const { checkboxValue, selectedCheckbox } = this.state;
    return (
      <View style={styles.inputContainer}>
        <TextInput value={this.state.labelTitle}
          onChangeText={this.titleCahgnehandelar}
          style={styles.titleText} placeholder={"Label name"} />
        <Text style={{ marginBottom: 10 }}>Choose Color</Text>
        <View style={{ width: width * 0.95, height: height*0.3}}>
          <View style={{ flexDirection: "row", alignContent: "stretch", flexWrap: 'wrap' }}>
            {checkboxValue.map((option, indexInArray) => {
              return (<CheckBox style={{ marginTop: 0, marginRight: 7, marginLeft: 0 }}
                checkedImage={<Iconfa style={{}} size={40} name="check-square" color={option.value} />}
                unCheckedImage={<Icon style={{}} size={40} name="square" color={option.value} />}
                key={option.value}
                isChecked={option.value === selectedCheckbox.value}
                onClick={(value, index) => this.CheckMe(option)}
              />
              );
            })}
          </View>
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

