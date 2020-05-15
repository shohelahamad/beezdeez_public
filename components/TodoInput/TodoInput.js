import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Button } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MultiSelect from 'react-native-multiple-select';

class TodoInput extends Component {
  state = {
    isDone: false,
    todoTitle: '',
    todoDescribtion: '',
    priority: '',
    dueDate: '',
    eventId: [],
  }
  componentDidMount(){
    if (this.props.editTodo) {
      console.log(this.props.editTodo)
      this.setState({
        isDone: this.props.editTodo.isDone,
        todoTitle: this.props.editTodo.todoTitle,
        todoDescribtion: this.props.editTodo.todoDescribtion,
        priority: this.props.editTodo.priority,
        dueDate: this.props.editTodo.dueDate,
        eventId: this.props.editTodo.eventId,
      });
    }
  }
  onSelectedEventChange = eventId => {
    this.setState({ eventId });
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
    if (this.state.todoTitle.trim() === "") {
      return;
    }
    this.props.onTodoAdded(
      this.state.todoTitle,
      this.state.todoDescribtion,
      this.state.priority,
      this.state.dueDate,
      this.state.eventId,
      this.state.isDone
    )
  };
  _handleDatePicked = (date) => {
    console.log(moment(date));
    this.setState({
      dueDate: moment(date).format('YYYY-MM-DD HH:mm')
    })
  };

  render() {
    const { eventId } = this.state;
    let priorityData = [{
      value: 'Important'
    }, {
      value: 'Medium'
    }, {
      value: 'Less Important'
    }];
    return (

      <View style={styles.inputContainer}>


        <Icon name={"check-square"} color={"#000000"} size={30} style={{ marginBottom: -30 }} />
        <TextInput value={this.state.todoTitle}
          onChangeText={this.titleCahgnehandelar}
          // value={this.props.editTodo.title ? this.props.editTodo.title: null }
          style={styles.titleText} placeholder={"New ToDo"} />

        <Text>Description</Text>
        <TextInput value={this.state.todoDescribtion}
          onChangeText={this.describtionCahgnehandelar}
          multiline={true}
          numberOfLines={20}
          style={styles.emailField} placeholder={"Your Description"} />
        <Text>Due Date</Text>
        <DatePicker
          style={{ width: "100%" }}
          date={this.state.dueDate}
          placeholder="Chose Due Date"
          mode="datetime"
          format="YYYY-MM-DD HH:mm"
          // minDate="2016-05-01"
          // maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
              , borderBottomWidth: 1,
              borderBottomColor: "#efefef",
              marginBottom: 15, borderColor: '#ffffff',
            },
            placeholderText: {
              // marginLeft: 0
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(datetime) => { this._handleDatePicked(datetime) }}
        // onDateChange={(date) => {this.setState({dueDate: date})}}
        />
        <View>
        </View>

        <View >
        </View>
        <Text style={{ marginBottom: -25 }}>Priority</Text>
        <Dropdown
          placeholder='Prioritize your ToDo'
          data={priorityData}
          value={this.state.priority}
          onChangeText={this.priorityDataHandelar}
        />
        <Text>From</Text>
        <MultiSelect
          hideTags
          items={this.props.events}
          uniqueKey="key"
          single
          ref={(component) => { this.multiSelectEvent = component }}
          onSelectedItemsChange={this.onSelectedEventChange}
          selectedItems={eventId}
          selectText="Link to an event"
          searchInputPlaceholderText="Search Event..."
          onChangeInput={(text) => console.log(text)}
          tagRemoveIconColor="#0641A7"
          tagBorderColor="#0641A7"
          tagTextColor="#0641A7"
          selectedItemTextColor="#0641A7"
          selectedItemIconColor="#0641A7"
          itemTextColor="#000"
          displayKey="eventTitle"
          searchInputStyle={{ color: '#0641A7' }}
          submitButtonColor="#0641A7"
          submitButtonText="Done Select"
        />
        <View>
          {/* { this.multiselect ? this.multiSelect.getSelectedItemsExt(selectedItems): null } */}
          {this.multiSelectEvent && this.multiSelectEvent.getSelectedItemsExt(eventId)}
        </View>
        <View>
          <TouchableOpacity onPress={(this.todoSubmithandelar)}>
            <View style={styles.loginButton}>
            {this.props.editTodo ?
              <Text style={styles.buttonText}> Save </Text> : <Text style={styles.buttonText}> Add </Text>  }
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
export default TodoInput;

