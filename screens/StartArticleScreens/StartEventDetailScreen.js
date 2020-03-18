import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import HTML from 'react-native-render-html';

import Colors from '../../constants/Colors';

const StartEventDetailScreen = props => {
  const itemKey = props.navigation.getParam('itemKey');
  const selectedItem = useSelector(state =>
    state.startArticleList.startArticleList.find(prod => prod.key === itemKey)
  );
  let ImageView = (
    <View></View>
  );
  if (JSON.parse(selectedItem.images_data).length>0) {
    ImageView  = <Image style={styles.image} source={{ uri: JSON.parse(selectedItem.images_data)[0].orig}} />
  }
  return (
    <ScrollView>
      {ImageView}
      <View style={{ padding: 10}}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{width: '30%', backgroundColor: 'orange', borderRadius: 10, marginRight: '2.5%', maxHeight: 180, alignItems: 'center'}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginTop: 10 }} >{selectedItem.month}</Text>
          <Text style={{ fontSize: 50, fontWeight: 'bold', marginBottom: 10 }} >{selectedItem.day}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10}} >{selectedItem.year}</Text>
            {/* <View style={{width: '100%', borderColor: '#fff' , backgroundColor: 'orange', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderWidth: 10, height: 10, alignItems: 'center'}}></View> */}
          </View>
          <View style={{width: '65%'}}>
          <View style={{flexDirection: 'row', flex: 1}}>
              <Text style={{ marginTop: 10, fontSize: 30, fontWeight: 'bold', marginBottom: 10 }} >{selectedItem.title}</Text>
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
              <Text style={{ color: "#969696" , marginBottom: 10, fontSize: 14}}>{selectedItem.header}</Text>
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
        <View style={{flexDirection: 'row', flex: 1, marginTop: 10}}>
            <MaterialIcons name='event' size={25} color="#969696" />
            <TouchableOpacity><Text style={{ color: "#969696" , marginBottom: 10, fontSize: 20, textDecorationLine: 'underline', marginLeft: 10}}>Hinzufügen</Text></TouchableOpacity>
        </View>

        {/* <View style={{flexDirection: 'row', flex: 1}}>
          <Text style={{ color: "#969696" , fontSize: 14}}>{selectedItem.subtitle}</Text>
        </View> */}
        <View style={{flexDirection: 'row', flex: 1 , marginTop: 10}}>
          <HTML html={selectedItem.body} tagsStyles={{p:{fontSize:20}}} imagesMaxWidth={Dimensions.get('window').width} />
        </View>
        <View style={{flexDirection: 'row', flex: 1 , marginTop: 15}}>
          <Text style={{ color: "#000000" , fontSize: 22, fontWeight: 'bold'}}>Veranstaltungsort</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1 , marginTop: 10}}>
          <HTML html={selectedItem.location} tagsStyles={{p:{fontSize:20}}} imagesMaxWidth={Dimensions.get('window').width} />
        </View>        
      </View>
    </ScrollView>
  );
};

StartEventDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
};
StartEventDetailScreen.navigationOptions ={
    // headerTitle: (
    //     <Image
    //       style={{
    //         alignSelf: 'stretch',
    //         width: 40,
    //         height: 40,
    //       }}
    //       resizeMode="contain"
    //       source={require('../../assets/DEU_Memmelsdorf.png')}
    //     />
    // ),
    headerStyle: {
        backgroundColor: 'darkgreen',
    },
    headerTintColor: '#fff',
    stateBar: '#ffffff'
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});

export default StartEventDetailScreen;
