import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { connect } from "react-redux";
import { Dropdown } from 'react-native-material-dropdown-v2'
import Icon from "react-native-vector-icons/FontAwesome";
import Iconfa from "react-native-vector-icons/FontAwesome5";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { deleteNote } from "../../store/actions/notes";



class ShowNote extends Component {
  componentDidMount() {
    this.props.navigation.setParams({ deleteConfirm: this.deleteConfirm });
  }
  itemKey = this.props.navigation.getParam('itemKey');
  selNote = this.props.notes.find(note => {
    return note.key === this.itemKey;
  });
  deleteConfirm = () => {
    Alert.alert(
      "Detete Note",
      "Are you sure you want to delete this Note?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Delete", onPress: () => (
            this.props.onDeleteNote(this.props.userId, this.itemKey),
            this.props.navigation.navigate('notetList')
          )
        }
      ],
      { cancelable: false }
    );
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
          <Text style={styles.noteHeading}>{this.selNote.noteHeading}</Text>
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
            <Text style={{}}>{this.selNote.noteDescribtion}</Text>
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
            <Icon style={{ marginTop: 10, color: this.selNote.catagory.labelColor }} size={25}
              name={"square"} />
          </View>
          <View style={{ flex: 1, marginTop: -15 }}>
            <Dropdown
              fontSize={20}
              labelExtractor={({ labelTitle }) => labelTitle}
              valueExtractor={({ key }) => key}
              style={{ paddingBottom: 10, height: 30 }}
              value={this.props.labels.find(label => {
                return label.key === this.selNote.catagory.key;
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

            <Text style={{ marginTop: 15, marginLeft: 15, marginBottom: 5, color: "#000000", fontSize: 20 }}>{this.selNote.eventId}</Text>
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
      </ScrollView>
    );
  }
}
ShowNote.navigationOptions = navData => {
  return {
    headerTitle: "Details",
    headerRight: (

      <View style={{ flexDirection: "row" }}>
        <MaterialIcons name="delete" style={{ color: 'red', fontSize: 25, paddingRight: 10 }} onPress={navData.navigation.getParam('deleteConfirm')} />
        <Feather name="edit" style={{ color: '#0637a5', fontSize: 25, paddingRight: 10 }} onPress={() => {
          navData.navigation.navigate('InputNote',
            {
              noteId: navData.navigation.getParam('itemKey')
            }
          );
        }} />
      </View>
    )
  }
};
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
    userId: state.auth.userId,
    labels: state.labels.labels
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onDdoneTodo: key => dispatch(doneTodo(key)),
    onNewDate: (key, newDueDate) => dispatch(updateDueDate(key, newDueDate)),
    onNewPriority: (key, newDueDate) => dispatch(updatePriority(key, newDueDate)),
    onDeleteNote: (userId, key) => dispatch(deleteNote(userId, key))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowNote);
