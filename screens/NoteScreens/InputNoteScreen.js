import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import NoteInput from '../../components/NoteInput/NoteInput';
import { connect } from 'react-redux';
import { addNote } from '../../store/actions/notes';

class InputNote extends Component {
  noteAddedHandler = (noteHeading, noteDescribtion, catagory,eventId)=> {
    this.props.onAddNote(noteHeading, noteDescribtion, catagory,eventId, this.props.userId);
    this.props.navigation.navigate('notetList');
  }
  goToSettings = ()=> {
    this.props.navigation.navigate('InputLabelScreen');
  }
  render() {
    return (
      <View style={styles.container}>
        <NoteInput onNoteAdded={this.noteAddedHandler} onGotoSetting={this.goToSettings}/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
const mapStateToProps = state => {
  return {
    userId: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
      onAddNote: (noteHeading, noteDescribtion, catagory,eventId,userId) => 
      dispatch(addNote(noteHeading, noteDescribtion, catagory,eventId, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputNote);