import React, {useRef, useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Animated } from "react-native";
import Constants from 'expo-constants';
import { useSelector } from 'react-redux';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const LoadingCityScreen = ({ navigation }) => {
  const locationRegio = useSelector(state => state.userLocation.locationRegio)
  let uiColors = JSON.parse(locationRegio.colors);
  let animation = useRef(new Animated.Value(0));
  const [progress, setProgress] = useState(0);
  useInterval(() => {
    if(progress < 100) {
      console.log(locationRegio.logo);
      setProgress(progress + 90);
    }
    else{
      navigation.navigate('App');
    }
  }, 1000);

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 100
    }).start();
  },[progress])

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  })
  return (
    <View
      style={{flex: 1,
        justifyContent: 'center',
        padding: 20, backgroundColor: uiColors.bgr_color}}>
        <Image
          style={{
            alignSelf: 'stretch',
            width: 150,
            height: 150,
            marginBottom: 20
          }}
          resizeMode="contain"
          source={{ uri: locationRegio.logo }}
        />
        <Text style={styles.titleText}>{locationRegio.welcome_top}</Text>
        <Text style={styles.bodyText}>{locationRegio.welcome_bottom}</Text>
        <View style={styles.progressBar}>
          <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: uiColors.progress_bar_color, borderRadius: 15, width }}/>
        </View>
        {/* <Text>
          {`${progress}%`}
        </Text> */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('App')}
          style={{
            backgroundColor: "yellow",
            padding: 8,
            marginTop: 30,
            borderRadius: 15
          }}>
        </TouchableOpacity> */}
        <Text style={styles.dataLoadingText}>{locationRegio.loading_caption}</Text>
        </View>
  );
};
const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'darkgreen'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  progressBar: {
    flexDirection: 'row',
    height: 15,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#969696',
    borderWidth: 1,
    borderRadius: 15
  },
  dataLoadingText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: "center"
  },
  titleText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: "left"
  },
  bodyText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'normal',
    textAlign: "left",
    marginTop: 10
  }
})
export default LoadingCityScreen;
