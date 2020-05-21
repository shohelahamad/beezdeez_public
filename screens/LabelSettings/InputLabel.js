import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import LabelInput from '../../components/LabelInput/LabelInput';
import { connect } from 'react-redux';
import { addLabel } from '../../store/actions/index';

class InputLabel extends Component {
  labelAddedHandler = (labelTitle, labelColor)=> {
      this.props.onAddLabel(labelTitle, labelColor);
      Navigation.pop(this.props.componentId);
  }

  render () {
      return (
          <View>
              <LabelInput onLabelAdded={this.labelAddedHandler}/>
          </View>
      );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAddLabel: (labelTitle, labelColor) => 
      dispatch(addLabel(labelTitle, labelColor))
  };
};

export default connect(null, mapDispatchToProps)(InputLabel);