import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Button } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';


class PlaceInput extends Component {
  state = {
    todoTitle: '',
    todoDescribtion: '',
    priority: '',
    dueDate: '',
    eventId: '',
    isDateTimePickerVisible: false,
  }
  eventIdCahgnehandelar = (val) => {
    this.setState({
      eventId: val
    });
  };
  titleCahgnehandelar = (val) => {
    this.setState({
      todoTitle: val
    });
  };
  describtionCahgnehandelar = (val) => {
    this.setState({
      todoDescribtion: val
    });
  };
  priorityDataHandelar = (val) => {
    this.setState({
      priority: val
    });
  };

  todoSubmithandelar = () => {
    if (this.state.placename.trim() === "") {
      return;
    }
    this.props.onPlaceAdded(
      this.state.todoTitle, 
      this.state.todoDescribtion, 
      this.state.priority,
      this.state.dueDate,
      this.state.eventId,
      )
  };
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({
      isDateTimePickerVisible: false,
      dueDate: moment(date).format('MMMM Do YYYY, HH:mm')
    })
  };
  render() {
    let priorityData = [{
      value: 'Important'
    }, {
      value: 'Medium'
    }, {
      value: 'Less Important'
    }];
    return (




      <View style={styles.inputContainer}>



        <TextInput value={this.state.todoTitle}
          onChangeText={this.titleCahgnehandelar}
          style={styles.titleText} placeholder={"New ToDo"} />

        <Text>Description</Text>
        <TextInput value={this.state.todoDescribtion}
          onChangeText={this.describtionCahgnehandelar}
          multiline={true}
          numberOfLines={20}
          style={styles.emailField} placeholder={"Your Description"} />




        <Text>Due Date</Text>
        <TextInput value={this.state.dueDate}
          style={styles.inputField}
          onFocus={this._showDateTimePicker}
          placeholder={"Choose Due Date"}
        />
        <View >
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            mode={'datetime'}
          />
        </View>
        <Text style={{ marginBottom: -25 }}>Priority</Text>
        <Dropdown
          placeholder='Prioritize your ToDo'
          data={priorityData}
          onChangeText={this.priorityDataHandelar}
        />
        <Text>From</Text>
        <TextInput value={this.state.eventId}
          onChangeText={this.eventIdCahgnehandelar}
          style={styles.inputField}
          placeholder={" Link to an event"} />
        <View>
          <TouchableOpacity onPress={(this.todoSubmithandelar)}>
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
    borderBottomColor: "#efefef",
    paddingLeft: 40
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
export default PlaceInput;

