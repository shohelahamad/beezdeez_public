import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import LabelInput from '../../components/LabelInput/LabelInput';
import { connect } from 'react-redux';
import { addLabel, updateLabel } from '../../store/actions/labels';
import { ColorPicker } from 'react-native-color-picker'

class InputLabel extends Component {
  labelAddedHandler = (labelTitle, labelColor) => {
    itemKey = this.props.navigation.getParam('labelId');
    if (itemKey) {
      this.props.onUpdateLabel(this.props.userId, itemKey, labelTitle, labelColor);
      this.props.navigation.goBack();
    } else {
      this.props.onAddLabel(this.props.userId, labelTitle, labelColor);
      this.props.navigation.goBack();
    }
  }

  render() {
    itemKey = this.props.navigation.getParam('labelId');
    selLabel = {}
    if (itemKey) {
      selLabel = this.props.labels.find(label => {
        return label.key === itemKey;
      });
    }
    return (
      <View>
        {selLabel?  <LabelInput editLabel={selLabel} onLabelAdded={this.labelAddedHandler} /> :  <LabelInput onLabelAdded={this.labelAddedHandler} />}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    labels: state.labels.labels
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddLabel: (userId, labelTitle, labelColor) =>
      dispatch(addLabel(userId, labelTitle, labelColor)),
    onUpdateLabel: (userId,labelKey, labelTitle, labelColor) =>
      dispatch(updateLabel(userId, labelKey, labelTitle, labelColor))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputLabel);