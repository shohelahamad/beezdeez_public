import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import NoteInput from '../../components/NoteInput/NoteInput';
import { connect } from 'react-redux';
import { addNote,updateNote} from '../../store/actions/notes';

class InputNote extends Component {
  noteAddedHandler = (noteHeading, noteDescribtion, catagory,eventId)=> {
    itemKey = this.props.navigation.getParam('noteId');
    if(itemKey){
      this.props.onUpdateNote(this.props.userId,itemKey,noteHeading, noteDescribtion, catagory,eventId);
      this.props.navigation.goBack();
    }else{
      this.props.onAddNote(noteHeading, noteDescribtion, catagory,eventId, this.props.userId);
      this.props.navigation.navigate('notetList');
    }
  }
  goToSettings = ()=> {
    this.props.navigation.navigate('InputLabelScreen');
  }
  render() {
    itemKey = this.props.navigation.getParam('noteId');
    console.log(itemKey);
    selNote={}
    if(itemKey){
      selNote = this.props.notes.find(note => {
        return note.key === itemKey;
      });
      console.log(selNote);
    }
    return (
      <View style={styles.container}>
        {selNote ? <NoteInput editNote={selNote} onNoteAdded={this.noteAddedHandler} onGotoSetting={this.goToSettings}/> : <NoteInput onNoteAdded={this.noteAddedHandler} onGotoSetting={this.goToSettings}/>}        
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
    userId: state.auth.userId,
    notes: state.notes.notes
  };
};
const mapDispatchToProps = dispatch => {
  return {
      onAddNote: (noteHeading, noteDescribtion, catagory,eventId,userId) => 
      dispatch(addNote(noteHeading, noteDescribtion, catagory,eventId, userId)),
      onUpdateNote: (userId,itemKey,noteHeading, noteDescribtion, catagory,eventId) => 
      dispatch(updateNote(userId,itemKey,noteHeading, noteDescribtion, catagory,eventId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputNote);