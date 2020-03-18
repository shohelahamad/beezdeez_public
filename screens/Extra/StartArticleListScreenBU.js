import React ,{ Component }from 'react';
import { FlatList, View , Text, StyleSheet, StatusBar, Image} from 'react-native';
import { connect } from 'react-redux';
import ArticleListItem from '../../components/Article/ArticleListItem/ArticleListItem';
import ArticleImageListItem from '../../components/Article/ArticleListItem/ArticleImageListItem';

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getStartArticleList } from "../../store/actions/index";
import EventListItem from '../../components/Article/EventListItem/EventListItem';


class StartArticleListScreen extends Component{
    componentWillMount(){
        this.props.onLoadStartArticleList(this.props.locationRegionCode);
    }
  render(){
    let selectedLocation = this.props.areaList.find(prod => prod.location_regio_code === this.props.locationRegionCode);
    return (
        <View style={styles.screen}>
           <StatusBar backgroundColor='blue' barStyle='light-content' />
           <View style={styles.row}>
                <View style={{ width: "10%" }}>
                        <Image
                            style={{
                                width: 35,
                                height: 35,
                                marginTop: 15,
                                marginLeft: 10
                            }}
                            resizeMode="contain"
                            source={{ uri: this.props.locationRegion.logo}}
                            />
                        </View>
                    <View style={{ width: "90%"}}>
                        <Text style={styles.headingText}>{selectedLocation.name}</Text>
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
                <View style={{flexDirection: "row", marginTop: 10, alignItems: 'center', justifyContent: 'space-between', marginRight: 10  }}>
                    <View style={{ width: "80%", flexDirection: "row" }}>
                        <Text style={{ color: "#969696" }}>{this.props.alticleId} </Text>
                        <AntDesign style={{ marginRight: 5, marginLeft: 5 }} name={"notification"} color={"#969696"} size={20} />
                        <Text numberOfLines={1} style={{ color: "#000" , fontSize: 20 }}> Neuigkeiten </Text>
                    </View>
                    <View style={{flexDirection: "row"}}>
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
           <FlatList data={this.props.productsList}
            keyExtractor={item => item.id}
            renderItem={(itemdata)=>{
                if(itemdata.item.type === 'article' && itemdata.item.imageUrl === "")
                {
                    return <ArticleListItem
                    image={itemdata.item.imageUrl}
                    title={itemdata.item.title}
                    price={itemdata.item.price}
                    onViewDetail={() => {
                        // console.log(props)
                        // props.navigation.navigate({ routeName: 'ProductDetail'});
                        this.props.navigation.navigate('StartArticleDetail',{
                            productId: itemdata.item.id,
                            productTitle: itemdata.item.title
                        });
                    }}
                    onAddToCart={() => {}}
                />
                }if(itemdata.item.type === 'event'){
                    return <EventListItem
                    image={itemdata.item.imageUrl}
                    title={itemdata.item.title}
                    price={itemdata.item.price}
                    onViewDetail={() => {
                        // console.log(props)
                        // props.navigation.navigate({ routeName: 'ProductDetail'});
                        this.props.navigation.navigate('StartArticleDetail',{
                            productId: itemdata.item.id,
                            productTitle: itemdata.item.title
                        });
                    }}
                    onAddToCart={() => {}}
                />
                }
                if(itemdata.item.type === 'article' && (itemdata.item.imageUrl != null || itemdata.item.imageUrl !== ''))
                {
                    return <ArticleImageListItem
                    image={itemdata.item.imageUrl}
                    title={itemdata.item.title}
                    price={itemdata.item.price}
                    onViewDetail={() => {
                        // console.log(props)
                        // props.navigation.navigate({ routeName: 'ProductDetail'});
                        this.props.navigation.navigate('StartArticleDetail',{
                            productId: itemdata.item.id,
                            productTitle: itemdata.item.title
                        });
                    }}
                    onAddToCart={() => {}}
                />
                }
            }}
        />
        </View>
  )};
};

StartArticleListScreen.navigationOptions ={
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
        justifyContent: 'center',
        alignItems: 'center'
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
        marginTop: 15,
        marginLeft: 10
      }
});

const mapStateToProps = state => {
    return {
      productsList: state.products.availableProducts,
      locationRegionCode: state.userLocation.location_regio_code,
      areaList: state.userLocation.areaList,
      locationRegion: state.userLocation.locationRegio
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      onLoadStartArticleList: (locationRegionCode) => dispatch(getStartArticleList(locationRegionCode))
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(StartArticleListScreen);
