import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import deviceStorage from '../../services/deviceStorage';
import LabelList from '../../components/LabelList/LabelList';
import axios from 'axios';
import { connect } from 'react-redux';
import { getLabels,deleteLabel } from '../../store/actions/labels';


class LabelSetting extends Component {
  componentDidMount() {
    this.props.onLoadLabels(this.props.userId);
  }
  labelDeleteHandler = (labelKey) => {
    Alert.alert(
      "Detete Label",
      "Are you sure you want to delete this Label?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"+labelKey),
          style: "cancel"
        },
        {
          text: "Delete", onPress: () => (
            this.props.onDeleteLabel(this.props.userId, labelKey)
          )
        }
      ],
      { cancelable: false }
    );
  }
  labelEditHandler = (labelKey) => {
    this.props.navigation.navigate('InputLabelScreen', {
      labelId: labelKey
    }
    )

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
          onItemSelected={this.itemSelectedHandler} onDeleteLabel={this.labelDeleteHandler} onEditLabel={this.labelEditHandler} />
          {this.props.isLoading? <ActivityIndicator/>: false}
      </View>
    );
  }
}
LabelSetting.navigationOptions = navData => {
  return {
    headerTitle: "Labels",
    headerRight: (
      <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { navData.navigation.navigate('InputLabelScreen') }} >
        <Text style={{ paddingRight: 15 }}> new </Text>
      </TouchableOpacity>
    )
  }
};
const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    justifyContent: "space-between",
  },
  container: {
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
    userId: state.auth.userId,
    isLoading: state.ui.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLoadLabels: (userId) => dispatch(getLabels(userId)),
    onDeleteLabel: (userId,labelKey) => dispatch(deleteLabel(userId,labelKey))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LabelSetting);

