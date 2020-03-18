import React, { Component } from 'react';
import { ScrollView, Dimensions,StyleSheet,View,StatusBar, Image, Button, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ArticleList from '../../components/Article/ArticleList/ArticleList';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


const articles = [
    {
      key: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      image: '',
      title: 'Härteausgleich für Straßenausbaubeiträge ab 2014',
      type: 'article'
    },
    {
      key: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      image: '',
      title: 'Integriertes Städtisches Entwicklungskonzept',
      type: 'event'
    },
    {
      key: '58694a0f-3da1-471f-bd96-145571e29d72',
      image: '',
      title: 'Memmelsdorfer Ehrenbürger und Ortsheimatpfleger Hans',
      type: 'discover'
    },
  ];
const CitiesScreen = props =>{
    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor='blue' barStyle='light-content' />
            <View style={styles.row}>
                <View style={{ width: "10%" }}>
                        <Image
                            style={{
                                width: 35,
                                height: 35,
                                marginTop: 15
                            }}
                            resizeMode="contain"
                            source={require('../../assets/DEU_Memmelsdorf.png')}
                            />
                        </View>
                    <View style={{ width: "90%"}}>
                        <Text style={styles.headingText}> Memmelsdorfer </Text>
                    </View>                               
            </View>
            <View
                style={{
                    borderBottomColor: '#efefef',
                    borderBottomWidth: 1,
                    width: '100%',
                    marginTop: 5,
                    marginBottom: 5
                }}
                />
            <View style={styles.row}>
                <View style={{flexDirection: "row", marginTop: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: "80%", flexDirection: "row" }}>
                        <Text style={{ color: "#969696" }}>{props.alticleId} </Text>
                        <AntDesign style={{ marginRight: 5, marginLeft: 5 }} name={"notification"} color={"#969696"} size={20} />
                        <Text numberOfLines={1} style={{ color: "#000" , fontSize: 20 }}> Neuigkeiten </Text>
                    </View>
                    <View style={{flexDirection: "row" }}>
                    <Feather style={{ marginRight: 5, marginLeft: 5 }} name={"filter"} color={"#969696"} size={20} />
                    <Text style={{textDecorationLine: 'underline'}}>Filteren</Text>
                    </View>
                </View>
            </View>
            <View
                style={{
                    borderBottomColor: '#efefef',
                    borderBottomWidth: 1,
                    width: '100%',
                    marginTop: 5,
                    marginBottom: 5
                }}
                />
            <ArticleList
            articles={articles}
            />
            <ScrollView style={{ flex: 1 }}>
            </ScrollView>
        </View>
    );
};
CitiesScreen.navigationOptions ={
    headerTitle: (
        <Image
          style={{
            alignSelf: 'stretch',
            width: 40,
            height: 40,
          }}
          resizeMode="contain"
          source={require('../../assets/DEU_Memmelsdorf.png')}
        />
    ),
    headerStyle: {
        backgroundColor: 'darkgreen',
    },
    headerRight: (
       <MaterialIcons name='my-location' size={25} color={"#fff"} style={{paddingRight: 10}}/>
    ),
    headerLeft: (
        <View style={{flexDirection: 'row', paddingLeft: 10}}>
            <MaterialIcons name='search' size={25} color={"#fff"} style={{paddingRight: 10}}/>

            <MaterialCommunityIcons name='weather-partlycloudy' size={25} color={"#fff"} style={{paddingRight: 10}}/>
        </View>
    ),
    headerTintColor: '#fff',
    stateBar: '#ffffff'
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 20,
        justifyContent: 'flex-start'
    },
    row: {
        width: '100%',
        flexDirection: "row"
    },
    headingText: {
        color: '#000',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: "left",
        marginTop: 15
      }
});

export default CitiesScreen;