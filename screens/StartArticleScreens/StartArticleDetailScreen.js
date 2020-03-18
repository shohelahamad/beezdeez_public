import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Dimensions
} from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import HTML from 'react-native-render-html';

import Colors from '../../constants/Colors';

const StartArticleDetailScreen = props => {
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
          <Text style={{ color: "#969696" , marginTop: 10, fontSize: 15}}>{selectedItem.header}</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
        <Text style={{ marginTop: 10, fontSize: 30, fontWeight: 'bold', marginBottom: 10 }} >{selectedItem.title}</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Text style={{ color: "#969696" , fontSize: 14}}>{selectedItem.subtitle}</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1 , marginTop: 10}}>
          <HTML html={selectedItem.body} tagsStyles={{p:{fontSize:20}}} imagesMaxWidth={Dimensions.get('window').width} />
        </View>
             
      </View>
    </ScrollView>
  );
};

StartArticleDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
};
StartArticleDetailScreen.navigationOptions ={
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

export default StartArticleDetailScreen;
