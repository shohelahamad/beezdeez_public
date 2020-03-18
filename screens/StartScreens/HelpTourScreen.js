import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  Image
} from 'react-native';
import Swiper from 'react-native-swiper';
import { AntDesign } from '@expo/vector-icons';
import { getWelcomeMsg } from "../../store/actions/index";
import { connect } from 'react-redux';

class HelpTourScreen extends Component{
  componentWillMount(){
    this.props.onLoadWelcomeMsg();
  }
  render(){  
    return (
    <View style={styles.container}>
      <Image
        style={{
          alignSelf: 'center',
          width: 150,
          height: 150,
          marginBottom: 30
        }}
        resizeMode="contain"
        source={require('../../assets/logo-linus.png')}
      />
      <View style={{height: '60%'}}>
        <View><Text style={styles.titleText}>hi</Text></View>
        <Swiper style={styles.wrapper} activeDotColor="#969696" dotColor="#efefef" dotStyle={{ height: 15, width: 15, borderRadius: 10}} activeDotStyle={{ height: 15, width: 15, borderRadius: 10}}>
            <View style={styles.slide1}>
            <Text style={styles.bodyText}>sld 1</Text>
            <Text style={styles.bodyText}>sld 2</Text>
            </View>
        </Swiper>
      </View>
      
      <TouchableOpacity
          onPress={() => this.props.navigation.navigate('StartArticleList')}
          style={{
            backgroundColor: "#fff",
            padding: 10,
            margin: 10,
            position: "absolute",
            bottom: '10%',
            // top: 0,
            right: '13%'
          }}><View style={{flex: 1, flexDirection: 'row'}}><AntDesign name="arrowright" size={20}/><Text style={{ fontSize: 16, textDecorationLine: 'underline'}}>Some info</Text></View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('StartArticleList')}
          style={{
            backgroundColor: "#fff",
            padding: 10,
            margin: 10,
            position: "absolute",
            bottom: 0,
          }}><View style={{flex: 1, flexDirection: 'row'}}><Text style={{ fontSize: 16, textDecorationLine: 'underline'}}>Other info</Text></View>
        </TouchableOpacity>
  </View>
  )};
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    slide1: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      slide2: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      slide3: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      titleText: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: "center"
      },
      bodyText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'normal',
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10
      }
  });
const mapStateToProps = state => {
  return {
    welcomeMsg: state.welcomeMsg.welcomeMsg
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLoadWelcomeMsg: () => dispatch(getWelcomeMsg())
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(HelpTourScreen);
