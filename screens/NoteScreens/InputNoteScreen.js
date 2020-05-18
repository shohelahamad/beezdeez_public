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
    this.props.onAddNote(noteHeading, noteDescribtion, catagory,eventId);
    Navigation.pop(this.props.componentId);
  }
  goToSettings = ()=> {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'LabelSetting',
        options: {
          statusBar: {
            style: 'dark'
          },
          topBar: {
            
            title: {
              text: 'Label Setting',
              color: '#000000'
            },
            background: {
              color: '#ffffff',
              translucent: false
            }
          },
          bottomTabs: { visible: false, drawBehind: true, animate: true },
          
        }
      }
    });
    // alert("hi");
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
const mapDispatchToProps = dispatch => {
  return {
      onAddNote: (noteHeading, noteDescribtion, catagory,eventId) => 
      dispatch(addNote(noteHeading, noteDescribtion, catagory,eventId))
  };
};

export default connect(null, mapDispatchToProps)(InputNote);