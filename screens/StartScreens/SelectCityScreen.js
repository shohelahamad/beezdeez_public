import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  Image
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { getAreaList } from "../../store/actions/index";
import { getLocationRegio, getStartArticleList } from "../../store/actions/index";
import { Dropdown } from 'react-native-material-dropdown-v2'



class SelectCityScreen extends Component{
  state ={
    location: {},
    erroreMessage: '',
    selectedArea: {},
  }
  _areaListDataHandelar = (location_regio_code,index) => {
    // var selected = this.props.areaList.find(function(element) {
    //   return element.key === key;
    // });
    // this.setState({
    //   selectedArea: selected
    // });
    this.props.onGetSelectedlocation_regio(location_regio_code);
    // this.props.onLoadStartArticleList(location_regio_code);
    console.log(location_regio_code,index)
  };
  _getLocation = async() =>{
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status !== 'granted'){
      console.log('Permission Not granted');
      this.setState({
        erroreMessage: 'Permission Not granted'
      })
    }
    const location = await Location.getCurrentPositionAsync();
    this.setState({
      location
    });
    this.props.onGetAreaList(location);
  }
  render(){  
    let areaItems = [
      { label: '', value: '0', key: 1 }]
    if(this.props.areaList != null){
      areaItems=[];
      this.props.areaList.map( item =>{
        areaItems.push({label:item.name, value: item.location_regio_code, key: item.location_regio_code});
      })
    }
    return (  
    <View style={styles.container}>
        <View style={{height: '30%' , marginTop: '40%'}}>
            <View style={{marginTop: '5%'}}>
                <Text style={styles.titleText}>{this.props.welcomeMsg.headline}</Text>
                <Text style={styles.bodyText}>{this.props.welcomeMsg.content}</Text>
            </View>
        </View>
        <View>
        <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value,index) => this._areaListDataHandelar(value,index)}
            placeholder={{
                label: 'Wählen Sie Ihren Standort'
            }}
            items={areaItems}
        />
        
        {/* <Dropdown
          placeholder='Wählen Sie Ihren Standort'
          data={this.props.areaList}
          labelExtractor={({name})=> name}
          valueExtractor={({key})=> key}
        /> */}
        <MaterialIcons onPress={() => this._getLocation()} 
          name='my-location' 
          size={25} 
          style={{position: 'absolute', top: '18%', right: '3%'}}/>
        </View>
        <Text style={styles.linkText}>{this.props.welcomeMsg.add_ort_nearby}</Text>
      <TouchableOpacity
          onPress={() => this.props.navigation.navigate('LoadingCity')}
          style={{
            backgroundColor: "#fff",
            padding: 10,
            margin: 10,
            position: "absolute",
            bottom: '30%',
            // top: 0,
            right: '5%'
          }}><View style={{flex: 1, flexDirection: 'row'}}><AntDesign name="arrowright" size={20}/><Text style={{ fontSize: 16, textDecorationLine: 'underline'}}>{this.props.welcomeMsg.link_caption}</Text></View>
        </TouchableOpacity>
  </View>
  );
};
};
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 30,
      color: 'black',
      paddingRight: 30,
      paddingLeft: 30,
      backgroundColor: '#efefef'
    },
});
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      flexDirection: "column",
      paddingLeft: 20,
      paddingRight: 20
    },
    titleText: {
    color: '#000',
    fontSize: 35,
    fontWeight: 'bold',
    },
    bodyText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: "left",
    paddingRight: 10,
    marginTop: 10
    },
    linkText: {
    color: '#969696',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: 'normal',
    textAlign: "left",
    paddingRight: 10,
    marginTop: 10
    }
  });
const mapDispatchToProps = dispatch => {
  return {
    onGetAreaList: (userLocation) => dispatch(getAreaList(userLocation)),
    onGetSelectedlocation_regio: (location_regio_code) => dispatch(getLocationRegio(location_regio_code)),
    onLoadStartArticleList: (locationRegionCode) => dispatch(getStartArticleList(locationRegionCode))
  };
};
const mapStateToProps = state => {
  return {
    welcomeMsg: state.welcomeMsg.welcomeMsg,
    areaList: state.userLocation.areaList,
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(SelectCityScreen);