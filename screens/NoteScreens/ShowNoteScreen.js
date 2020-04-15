import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import { Dropdown } from 'react-native-material-dropdown';
import Icon from "react-native-vector-icons/FontAwesome";
import Iconfa from "react-native-vector-icons/FontAwesome5";


class ShowNote extends Component {
  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  };
  doneSelectedHandler = () => {
    this.props.onDdoneTodo(this.props.selectedPlace.key);
    this.props.selectedPlace.isDone = !this.props.selectedPlace.isDone;
  };
  updateToDoDueDate = (newDueDate) => {
    this.props.onNewDate(this.props.selectedPlace.key, newDueDate);
    this.props.selectedPlace.dueDate = newDueDate;
  };
  updateToDoPriority = (newPriority) => {
    this.props.onNewPriority(this.props.selectedPlace.key, newPriority);
  };
  _handleDatePicked = (date) => {
    this.setState({
      isDateTimePickerVisible: false,
      dueDate: moment(date).format('MMMM Do YYYY, HH:mm')
    })
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.noteHeading}>{this.props.selectedPlace.noteHeading}</Text>
        </View>
        <View
          style={{
            borderBottomColor: '#efefef',
            borderBottomWidth: 2,
            marginTop: 20
          }}
        />
        <Text style={{ marginTop: 10, marginBottom: 5, color: "#969696", fontSize: 15 }}>Description</Text>

        <View style={{ maxHeight: "40%" }}>
          <ScrollView style={{ flexGrow: 0 }}>
            <Text style={{}}>{this.props.selectedPlace.noteDescribtion}</Text>
          </ScrollView>
        </View>


        <View
          style={{
            borderBottomColor: '#efefef',
            borderBottomWidth: 2,
            marginTop: 20
          }}
        />
        <Text style={{ marginTop: 10, marginBottom: 5, color: "#969696", fontSize: 15 }}>Catagory</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 35, marginRight: 8 }}>
            <Icon style={{ marginTop: 10, color: this.props.selectedPlace.catagory.labelColor }} size={25}
              name={"square"} />
          </View>
          <View style={{ flex: 1, marginTop: -15 }}>
            <Dropdown
              fontSize={20}
              labelExtractor={({labelTitle})=> labelTitle}
              valueExtractor={({key})=> key}
              style={{ paddingBottom: 10, height: 30 }}
              value={this.props.labels.find(label => {
                return label.key === this.props.selectedPlace.catagory.key;
              }).labelTitle}
              // onChangeText={this.updateToDoPriority}
              data={this.props.labels}
              // pickerStyle={{width: 20, height: 20}}
              baseColor={"#969696"}
            />
          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#efefef',
            borderBottomWidth: 2,
            marginTop: -10
          }}
        />
        <Text style={{ marginTop: 10, marginBottom: 5, color: "#969696", fontSize: 15 }}>Form</Text>
        <View style={styles.row}>
          <View style={{ width: "93%", flexDirection: "row" }}>

            <Iconfa style={{ marginTop: 10 }} size={30} name="calendar" color="#0641A7" />

            <Text style={{ marginTop: 15, marginLeft: 15, marginBottom: 5, color: "#000000", fontSize: 20 }}>{this.props.selectedPlace.eventId}</Text>
          </View>
          <View style={{ width: "7%" }}>
            <Icon style={{ marginTop: 10 }} size={25} name="times" color="#969696" />
          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#efefef',
            borderBottomWidth: 2,
            marginTop: 20
          }}
        />
        {/* <View>
          <TouchableOpacity onPress={this.placeDeletedHandler}>
            <View style={styles.deleteButton}>
              <Icon size={30} name="trash" color="red" />
            </View>
          </TouchableOpacity>
        </View> */}
        {/* <Text style={styles.placeName}>{this.props.selectedPlace.todoTitle}</Text>
          <Text style={styles.placeName}>{this.props.selectedPlace.todoDescribtion}</Text>
          <Text style={styles.placeName}>{this.props.selectedPlace.priority}</Text>
          <Text style={styles.placeName}>{this.props.selectedPlace.dueDate}</Text>
          <Text style={styles.placeName}>{this.props.selectedPlace.eventId}</Text> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    padding: 10
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  noteHeading: {
    fontWeight: "bold",
    fontSize: 28,
    marginLeft: 0,
    flex: 1
  },
  deleteButton: {
    alignItems: "center"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-between",
  }
});
const mapStateToProps = state => {
  return {
    notes: state.notes.notes,
    labels: state.labels.labels
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onDdoneTodo: key => dispatch(doneTodo(key)),
    onNewDate: (key, newDueDate) => dispatch(updateDueDate(key, newDueDate)),
    onNewPriority: (key, newDueDate) => dispatch(updatePriority(key, newDueDate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowNote);
