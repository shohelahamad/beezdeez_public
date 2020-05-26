import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import LabelInput from '../../components/LabelInput/LabelInput';
import { connect } from 'react-redux';
import { addLabel } from '../../store/actions/labels';
import { ColorPicker } from 'react-native-color-picker'

class InputLabel extends Component {
  labelAddedHandler = (labelTitle, labelColor) => {
    this.props.onAddLabel(this.props.userId,labelTitle, labelColor);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View>
        <LabelInput onLabelAdded={this.labelAddedHandler}/>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userId: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddLabel: (userId,labelTitle, labelColor) =>
      dispatch(addLabel(userId,labelTitle, labelColor))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputLabel);