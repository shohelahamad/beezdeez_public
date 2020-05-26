import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import MultiSelect from 'react-native-multiple-select';



class NoteInput extends Component {
  state = {
    noteHeading: '',
    noteDescribtion: '',
    catagory: {},
    eventId: []
  }
  componentDidMount() {
    if (this.props.editNote) {
      console.log(this.props.editNote)
      this.setState({
        noteHeading: this.props.editNote.noteHeading,
        noteDescribtion: this.props.editNote.noteDescribtion,
        catagory: this.props.editNote.catagory,
        eventId: this.props.editNote.eventId,
      });
    }
  }
  onSelectedEventChange = eventId => {
    this.setState({ eventId });
  };
  noteHeadingCahgnehandelar = (val) => {
    this.setState({
      noteHeading: val
    });
  };
  describtionCahgnehandelar = (val) => {
    this.setState({
      noteDescribtion: val
    });
  };
  catagoryDataHandelar = (key, index, va2) => {
    var selected = this.props.labels.find(function (element) {
      return element.key === key;
    });
    this.setState({
      catagory: selected
    });
    // console.log(key,selected)
  };

  noteSubmithandelar = () => {
    if (this.state.noteHeading.trim() === "") {
      return;
    }
    this.props.onNoteAdded(
      this.state.noteHeading,
      this.state.noteDescribtion,
      this.state.catagory,
      this.state.eventId
    )
  };
  goTosettings = () => {
    this.props.onGotoSetting()
  };
  render() {
    const { eventId } = this.state;
    return (
      <View style={styles.inputContainer}>
        <TextInput value={this.state.noteHeading}
          onChangeText={this.noteHeadingCahgnehandelar}
          multiline={true}
          numberOfLines={3}
          style={styles.titleText} placeholder={"Headline"} />

        <Text>Description</Text>
        <TextInput value={this.state.noteDescribtion}
          onChangeText={this.describtionCahgnehandelar}
          multiline={true}
          numberOfLines={20}
          style={styles.emailField} placeholder={"Your Description"} />


        <View style={styles.row}>
          <Text style={{ marginBottom: -25 }}>Category</Text>
          <TouchableOpacity onPress={(this.goTosettings)}>
            <Text style={styles.linkColor}>Label Setting</Text>
          </TouchableOpacity>

        </View>

        <Dropdown
          placeholder='Choose a catagory'
          data={this.props.labels}
          labelExtractor={({ labelTitle }) => labelTitle}
          valueExtractor={({ key }) => key}
          value={this.state.catagory.labelTitle}
          onChangeText={(key, index, labels) => { this.catagoryDataHandelar(key, index, labels) }}
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
          <TouchableOpacity onPress={(this.noteSubmithandelar)}>
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
  placeInput: {
    width: "65%"
  },
  placeButton: {
    width: "35%"
  },
  inputContainer: {
    flex: 1,
    width: "100%",
    padding: 20,
    flexDirection: "column"
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
    paddingBottom: 30
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
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkColor: {
    color: '#007bff'
  }
});
const mapStateToProps = state => {
  return {
    labels: state.labels.labels,
    events: state.events.events
  };
};
export default connect(mapStateToProps, null)(NoteInput);

