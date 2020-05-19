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
import { connect } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import { authStoreToken,authClearStorage } from "../../store/actions/index";


class LoadingAppScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: 'Jordan Belfort'
    }
  }
  async componentDidMount() {
    try {
      const userToken = await AsyncStorage.getItem("ap:auth:token");
      const userId = await AsyncStorage.getItem("ap:auth:userId");
      console.log('user: ', userId)
      if (userId&&userToken) {
        this.props.onAuthSetToken(userToken,userId);
        this.props.navigation.navigate('EventsScreen');
      } else {
        // goToAuth()
        this.props.navigation.navigate('AuthScreen');
      }
    } catch (err) {
      console.log('error: ', err)
      this.props.navigation.navigate('AuthScreen');
    }
  }
  // componentDidMount(){
  //   setTimeout(() => {this.props.navigation.navigate('AuthScreen')}, 1000)
  //   console.log("mounted")
  // }

  render() {
    return(
      <View style={styles.container}>
      <LinearGradient colors={['#00C7E1', '#0079C2', '#0D44B1']} style={styles.linearGradient}>

        <Image
          style={{ width: 100, height: 100, position: "absolute", top: '35%', right: "35%", borderRadius: 25 }}
          source={require('../../assets/icon.png')}
        />
        <Text style={{ position: "absolute", fontWeight: 'bold', top: "48%", left: "28%", fontSize: 40, color: "#ffffff" }}>BeezDeez</Text>
        <Text style={{ position: "absolute", top: "54%", left: "35%", fontSize: 15, color: "#ffffff" }}>Your Business Dairy</Text>
      </LinearGradient>
    </View>
    )
  }
};
const styles = StyleSheet.create({
  welcome: {
    position: "absolute",
    fontSize: 28,
    color: '#fff'
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  linearGradient: {
    flex: 1,
    width: '100%',
  }
})
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuthSetToken: (token, userId)=> dispatch(authStoreToken( token,userId) )
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoadingAppScreen);