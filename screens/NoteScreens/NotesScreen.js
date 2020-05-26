import React, { Component } from 'react'
import { StyleSheet, View, StatusBar, TextInput, Button, Text, TouchableOpacity, Dimensions, Platform, ActivityIndicator} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFa from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-material-dropdown';
import NoteList from '../../components/NoteList/NoteList';
import { connect } from 'react-redux';
import { getNotes } from "../../store/actions/notes"
import { Ionicons } from '@expo/vector-icons';
import { getLabels } from '../../store/actions/labels';



import { Header } from 'react-navigation-stack';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get("window");
class Notes extends Component {
  componentDidMount(){
    this.props.onLoadNotes(this.props.userId, this.props.token);
    this.props.onLoadLabels(this.props.userId);
  }
  itemSelectedHandler = key => {
    const selNote = this.props.notes.find(note => {
      return note.key === key;
    });
    this.props.navigation.navigate('NoteDetailsScreen', {
      itemKey: selNote.key,
      selectedPlace: selNote
    });
  };
  render() {
    let priorityData = [{
      value: 'Important'
    }, {
      value: 'Medium'
    }, {
      value: 'Less Important'
    }];
    let listToView =(
      <NoteList
          notes={this.props.notes}
          onItemSelected={this.itemSelectedHandler}
          onDoneSelected={this.doneSelectedHandler}
        />
    );
    if(this.props.notes.length === 0)
    {
      listToView = (
        <View><Text style={{ color: 'red'}}>There is no content Please add one</Text></View>
      );
    }
    if(this.props.isLoading){
      listToView = <ActivityIndicator/>
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.headerContainer}>
          <IconFa style={{ marginTop: 5, marginLeft: 5 }} name={"sticky-note"} color={"#0641A7"} size={30} />
          <Dropdown
            pickerStyle={{ marginTop: Header.HEIGHT }}
            fontSize={25}
            baseColor={"#fff"}
            containerStyle={{ width: "80%", marginLeft: "2.5%", borderBottomColor: "#ffffff", marginTop: "-7.5%" }}
            placeholder='Prioritize your ToDo'
            value={"All"}
            data={priorityData}
            onChangeText={this.priorityDataHandelar}
          />
          <Icon style={{ marginTop: 5, marginRight: 5 }} name={"caret-down"} color={"#000000"} size={30} />
        </View>
        {listToView}

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

            <Icon style={{ marginTop: 20, marginLeft: 46 }} name={"plus"} color={"#ffffff"} size={30} />
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
  container: {
    flex: 1,
    backgroundColor: "#E5EBE7"
  },
  headerContainer: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "2.5%"

  }
});
const mapStateToProps = state => {
  return {
    notes: state.notes.notes,
    userId: state.auth.userId,
    token: state.auth.token,
    isLoading: state.ui.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLoadNotes: (userId, token) => dispatch(getNotes(userId, token)),
    onLoadLabels: (userId) => dispatch(getLabels(userId)),
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Notes);
