import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NoteList from '../../components/NoteList/NoteList';
import { connect } from 'react-redux';
import { getNotes } from "../../store/actions/index"
import { Ionicons } from '@expo/vector-icons';


import { Header } from 'react-navigation-stack';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get("window");
class Notes extends Component {
  componentDidMount(){
    this.props.onLoadNotes();
  }
  itemSelectedHandler = key => {
    const selNote = this.props.notes.find(note => {
      return note.key === key;
    });
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ShowNote',
        passProps: {
          selectedPlace: selNote
        },
        options: {
          statusBar: {
            style: 'dark'
          },
          topBar: {
            
            title: {
              text: "Details",
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
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <FontAwesome style={{marginTop: 5, marginLeft: 5}}name={"sticky-note"} color={"#0641A7"} size={30}/>
          <Text style={ {fontSize: 20, marginTop: 5, fontWeight: "bold"}}> Today </Text>
          <FontAwesome style={{marginTop: 5, marginRight: 5}}name={"caret-down"} color={"#000000"} size={30}/>
        </View>
        <NoteList
          notes={this.props.notes}
          onItemSelected={this.itemSelectedHandler}
        />
        <LinearGradient
          colors={['#0637a5', '#0fadd5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: 120,
            height: 120,
            position: "absolute",
            left: width / 2 - 120 / 2,
            bottom: -60,
            backgroundColor: "#0641A7",
            borderRadius: 120 / 2
          }}
        >
          <TouchableOpacity
            onPress={() => { this.props.navigation.navigate('InputNote') }}
          >

            <FontAwesome style={{ marginTop: 20, marginLeft: 46 }} name={"plus"} color={"#ffffff"} size={30} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}
Notes.navigationOptions = navData => {
  return {
    headerTitle: "Notes",
    headerTintColor: 'white',
    headerBackground: (
      <LinearGradient
        colors={['#0637a5', '#0fadd5']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    ),
    ...Platform.select({
      android: {
        headerForceInset: { top: 'never', bottom: 'never' },
        // headerStyle: {
        //   height: 90
        // },
      },
      ios: {
        // headerStyle: {
        //   height: 60
        // }
      }
    }),
    headerTitleStyle: { color: '#fff', fontSize: width * 0.06, textAlign: 'center' },
    headerLeft: <Ionicons name="ios-menu" style={{ color: '#ffffff', fontSize: 35, paddingLeft: 10 }} onPress={() => {
      navData.navigation.toggleDrawer()
    }} />

  }
}
const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    justifyContent: "space-between",
  },
  container:{
    flex: 1,
    backgroundColor: "#E5EBE7"
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
    
  }
});
const mapStateToProps = state => {
  return {
    notes: state.notes.notes
  };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     onDdoneTodo: key => dispatch(doneTodo(key))
//   };
// };
const mapDispatchToProps = dispatch => {
  return {
    onLoadNotes: () => dispatch(getNotes())
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Notes);
