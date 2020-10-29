import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-material-dropdown-v2'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';

class EventInput extends Component {
  state = {
    eventTitle: '',
    eventDescription: '',
    eventMembers: [],
    eventTodos: [],
    eventNotes: [],
    documentList: [],
    startDateTime: '',
    endTime: '',
    startDateTimePickerVisible: false,
    endDateTimePickerVisible: false
  }
  onSelectedTodosChange = eventTodos => {
    this.setState({ eventTodos });
  };
  onSelectedNotesChange = eventNotes => {
    this.setState({ eventNotes });
  };
  onSelectedMembersChange = eventMembers => {
    this.setState({ eventMembers });
  };
  titleCahgnehandelar = (val) => {
    this.setState({
      eventTitle: val
    });
  };
  descriptionCahgnehandelar = (val) => {
    this.setState({
      eventDescription: val
    });
  };
  goToAddTodo = () => {
    this.props.onGotoAddTodo()
  };
  goToAddNote = () => {
    this.props.onGotoAddNote()
  };
  goToAddContact = () => {
    this.props.onGotoAddContact()
  };

  eventSubmithandelar = () => {
    if (this.state.eventTitle.trim() === "") {
      return;
    }
    this.props.onEventAdded(
      this.state.eventTitle,
      this.state.eventDescription,
      this.state.eventMembers,
      this.state.eventTodos,
      this.state.eventNotes,
      this.state.documentList,
      this.state.startDateTime,
      this.state.endTime,
      
    )
  };
  showStartDateTimePicker = () =>
  this.setState({ startDateTimePickerVisible: true });

  showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

  hideStartDateTimePicker = () =>
    this.setState({ startDateTimePickerVisible: false });

  hideEndDateTimePicker = () =>
    this.setState({ endDateTimePickerVisible: false });

  handleStartDatePicked = date => {
    this.setState({
      startDateTime: moment(date).format('YYYY-MM-DD HH:mm')
    })
    console.log("A date has been picked: ", date);
    this.hideStartDateTimePicker();
  };

  handleEndDatePicked = date => {
    this.setState({
      endTime: moment(date).format('hh:mm A')
    })
    console.log("A date has been picked: ", date);
    this.hideEndDateTimePicker();
  }
  render() {
    const { eventTodos } = this.state;
    const { eventNotes } = this.state;
    const { eventMembers } = this.state;
    return (
      <ScrollView style={styles.inputContainer}>
        <TextInput value={this.state.eventTitle}
          onChangeText={this.titleCahgnehandelar}
          style={styles.titleText} placeholder={"Event name"} />

        <View style={styles.row}>
          <View style={{ width: "20%", flexDirection: "row", marginTop: 15 }}>
            <Text style={{ color: "#969696", fontSize: 15, fontWeight: "bold" }} >Start</Text>
          </View>
          <View style={{ width: "80%", flexDirection: "row", marginTop: 5, justifyContent: "flex-end" }}>
            <TextInput value={this.state.startDateTime}
              style={styles.inputField}
              onFocus={this.showStartDateTimePicker}
              placeholder={"Choose Start Date and Time"}
            />
            <View >
              <DateTimePicker
                isVisible={this.state.startDateTimePickerVisible}
                onConfirm={this.handleStartDatePicked}
                onCancel={this.hideStartDateTimePicker}
                mode={'datetime'}
              />
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ width: "20%", flexDirection: "row", marginTop: 15 }}>
            <Text style={{ color: "#969696", fontSize: 15, fontWeight: "bold" }} >End</Text>
          </View>
          <View style={{ width: "80%", flexDirection: "row", marginTop: 5, justifyContent: "flex-end" }}>
            <TextInput value={this.state.endTime}
              style={styles.inputField}
              onFocus={this.showEndDateTimePicker}
              placeholder={"Choose End Time"}
            />
            <View >
              <DateTimePicker
                isVisible={this.state.endDateTimePickerVisible}
                onConfirm={this.handleEndDatePicked}
                onCancel={this.hideEndDateTimePicker}
                mode={'time'}
              />
            </View>
          </View>
        </View>
        <MultiSelect
          hideTags
          items={this.props.contacts}
          uniqueKey="id"
          ref={(component) => { this.multiSelectMembers = component }}
          onSelectedItemsChange={this.onSelectedMembersChange}
          selectedItems={eventMembers}
          selectText="Members"
          searchInputPlaceholderText="Search Members..."
          onChangeInput={ (text)=> console.log(text)}
          tagRemoveIconColor="#0641A7"
          tagBorderColor="#0641A7"
          tagTextColor="#0641A7"
          selectedItemTextColor="#0641A7"
          selectedItemIconColor="#0641A7"
          itemTextColor="#000"
          displayKey="firstName"
          searchInputStyle={{ color: '#0641A7' }}
          submitButtonColor="#0641A7"
          submitButtonText="Done Select"
        />
        <View>
            {/* { this.multiselect ? this.multiSelect.getSelectedItemsExt(selectedItems): null } */}
            {this.multiSelectMembers && this.multiSelectMembers.getSelectedItemsExt(eventMembers)}
        </View>
        {/* <View style={styles.row}>
          <View style={{ width: "92%", flexDirection: "row", marginTop: 5, marginBottom: 5 , marginLeft: 0 }}>

            <Text style={{ color: "#969696", fontSize: 15 }} > Member </Text>
          </View>
          <View style={{ width: "8%", flexDirection: "row", marginTop: 5 }}>
            <Icon style={{ marginRight: 5, marginLeft: 5 }} name={"plus"} color={"#969696"} size={15} />
          </View>

        </View> */}
        <View style={{ marginBottom: 20, marginTop: 10 }}>
          <TouchableOpacity onPress={(this.goToAddContact)}>
            <Text style={styles.linkColor}>Add Member</Text>
          </TouchableOpacity>
        </View>
        <Text>Description</Text>
        <TextInput value={this.state.eventDescription}
          onChangeText={this.descriptionCahgnehandelar}
          style={styles.inputField}
          placeholder={"Your Description"} />
        <MultiSelect
          hideTags
          items={this.props.todos}
          uniqueKey="key"
          ref={(component) => { this.multiSelectTodos = component }}
          onSelectedItemsChange={this.onSelectedTodosChange}
          selectedItems={eventTodos}
          selectText="Todos"
          searchInputPlaceholderText="Search Todos..."
          onChangeInput={ (text)=> console.log(text)}
          tagRemoveIconColor="#0641A7"
          tagBorderColor="#0641A7"
          tagTextColor="#0641A7"
          selectedItemTextColor="#0641A7"
          selectedItemIconColor="#0641A7"
          itemTextColor="#000"
          displayKey="todoTitle"
          searchInputStyle={{ color: '#0641A7' }}
          submitButtonColor="#0641A7"
          submitButtonText="Done Select"
        />
        <View>
            {/* { this.multiselect ? this.multiSelect.getSelectedItemsExt(selectedItems): null } */}
            {this.multiSelectTodos && this.multiSelectTodos.getSelectedItemsExt(eventTodos)}
        </View>
        {/* <View style={styles.row}>
          <View style={{ width: "92%", flexDirection: "row", marginTop: 5, marginBottom: 15 }}>

            <Text style={{ color: "#969696", fontSize: 15 }} > ToDos </Text>
          </View>
          <View style={{ width: "8%", flexDirection: "row", marginTop: 5 }}>
            <Icon style={{ marginRight: 5, marginLeft: 5 }} name={"plus"} color={"#969696"} size={15} />
          </View>

        </View> */}
        <View>
          <TouchableOpacity onPress={(this.goToAddTodo)}>
            <View style={styles.fileInputButton}>
              <Icon style={{ marginRight: 5, marginLeft: 5 }} name={"plus"} color={"#969696"} size={15} />
              <Text style={styles.fileInputbuttonText}> Create a new Todo </Text>
            </View>
          </TouchableOpacity>
        </View>
        <MultiSelect
          hideTags
          items={this.props.notes}
          uniqueKey="key"
          ref={(component) => { this.multiSelectNotes = component }}
          onSelectedItemsChange={this.onSelectedNotesChange}
          selectedItems={eventNotes}
          selectText="Notes"
          searchInputPlaceholderText="Search Notes..."
          onChangeInput={ (text)=> console.log(text)}
          tagRemoveIconColor="#0641A7"
          tagBorderColor="#0641A7"
          tagTextColor="#0641A7"
          selectedItemTextColor="#0641A7"
          selectedItemIconColor="#0641A7"
          itemTextColor="#000"
          displayKey="noteHeading"
          searchInputStyle={{ color: '#0641A7' }}
          submitButtonColor="#0641A7"
          submitButtonText="Done Select"
        />
        <View>
            {/* { this.multiselect ? this.multiSelect.getSelectedItemsExt(selectedItems): null } */}
            {this.multiSelectNotes && this.multiSelectNotes.getSelectedItemsExt(eventNotes)}
        </View>
        {/* <View style={styles.row}>
          <View style={{ width: "92%", flexDirection: "row", marginTop: 5, marginBottom: 15 }}>

            <Text style={{ color: "#969696", fontSize: 15 }} > Notes </Text>
          </View>
          <View style={{ width: "8%", flexDirection: "row", marginTop: 5 }}>
            <Icon style={{ marginRight: 5, marginLeft: 5 }} name={"plus"} color={"#969696"} size={15} />
          </View>

        </View> */}
        <View>
          <TouchableOpacity onPress={(this.goToAddNote)}>
            <View style={styles.fileInputButton}>
              <Icon style={{ marginRight: 5, marginLeft: 5 }} name={"plus"} color={"#969696"} size={15} />
              <Text style={styles.fileInputbuttonText}> Create a new Note </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={{ width: "92%", flexDirection: "row", marginTop: 5, marginBottom: 15 }}>

            <Text style={{ color: "#969696", fontSize: 15 }} > Documents </Text>
          </View>
          <View style={{ width: "8%", flexDirection: "row", marginTop: 5 }}>
            <Icon style={{ marginRight: 5, marginLeft: 5 }} name={"plus"} color={"#969696"} size={15} />
          </View>

        </View>
        <View style={{ marginBottom: 15 }}>
          <TouchableOpacity >
            <View style={styles.fileInputButton}>
              <Icon style={{ marginRight: 5, marginLeft: 5 }} name={"plus"} color={"#969696"} size={15} />
              <Text style={styles.fileInputbuttonText}> Add a file</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={(this.eventSubmithandelar)}>
            <View style={styles.loginButton}>
              <Text style={styles.buttonText}> Add </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
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
  listItemDone: {
    width: "95%",
    backgroundColor: "#f4f5f6",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: "2.5%",
    marginBottom: 2,
    borderColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    // textDecorationLine: 'line-through',
    // textDecorationStyle: 'solid'
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
  },
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
  fileInputButton: {
    width: "100%",
    backgroundColor: "#efefef",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',

  },
  buttonText: {
    color: '#fff',
  },
  fileInputbuttonText: {
    color: '#969696',
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
  datePlaceholder: {
    fontSize: 20,
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
export default EventInput;