import React  from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import CitiesScreen from '../screens/CityScreens/CitiesScreen';
import MenueScreen from '../screens/Menu';
import CityDetailScreen from '../screens/CityScreens/CityDetailScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import EventsScreen from '../screens/DiscoverScreen';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const CityNavigator = createStackNavigator({
    Menus: {
        screen: MenueScreen
     },
    Cities: CitiesScreen,    
    CityDetail: CityDetailScreen
});

const CityTabNavigator = createBottomTabNavigator({
    Start: {screen: CityNavigator, navigationOptions:{
        tabBarIcon: (tabinfo) => {
            return <Ionicons name='ios-home' size={25} color={tabinfo.tintColor} />
        }
    }},
    Entdecken: {screen: DiscoverScreen, navigationOptions:{
        tabBarIcon: (tabinfo) => {
            return <MaterialIcons name='location-on' size={25} color={tabinfo.tintColor} />
        }
    }},
    Events: {screen: EventsScreen, navigationOptions:{
        tabBarIcon: (tabinfo) => {
            return <MaterialIcons name='event' size={25} color={tabinfo.tintColor} />
        }
    }},
    Verwaltung: {screen:EventsScreen, navigationOptions:{
        headertitle: 'Security',
        tabBarIcon: (tabinfo) => {
            return <MaterialCommunityIcons name='security' size={25} color={tabinfo.tintColor} />
        }
    }},
    Menu: {screen:EventsScreen, navigationOptions:{
        tabBarLabel: 'Menü',
        tabBarIcon: (tabinfo) => {
            return <MaterialIcons name='menu' size={25} color={tabinfo.tintColor} />
        }
    }},
},{
    tabBarOptions:{
        activeTintColor: 'darkgreen'
    }
});
CityTabNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible;
    if (navigation.state.routes.length > 1) {
      navigation.state.routes.map(route => {
        if (route.routeName === "Start") {
          tabBarVisible = false;
        } else {
          tabBarVisible = true;
        }
      });
    }
  
    return {
      tabBarVisible
    };
  };
export default createAppContainer(CityTabNavigator);
