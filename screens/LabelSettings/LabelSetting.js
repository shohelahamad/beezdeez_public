import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import deviceStorage from '../../services/deviceStorage';
import LabelList from '../../components/LabelList/LabelList';
import axios from 'axios';
import { connect } from 'react-redux';
import { getLabels } from '../../store/actions/labels';


class LabelSetting extends Component {
  componentDidMount(){
    this.props.onLoadLabels(this.props.userId);
  }
  itemSelectedHandler = key => {
    const selTodo = this.props.labels.find(label => {
      return label.key === key;
    });
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ShowLabel',
        passProps: {
          selectedPlace: selTodo
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
        <LabelList 
        labels={this.props.labels}
        onItemSelected={this.itemSelectedHandler}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    justifyContent: "space-between",
  },
  container:{
    flex: 1,
    backgroundColor: "#ffffff"
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
    
  }
});
const mapStateToProps = state => {
  return {
    labels: state.labels.labels,
    userId: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLoadLabels: (userId) => dispatch(getLabels(userId))
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(LabelSetting);

