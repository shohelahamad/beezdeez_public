import React from "react";
import {Button} from "react-native";
import {
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import InputToDoScreen from '../screens/TodoScreens/InputToDoScreen';
import ShowToDoScreen from '../screens/TodoScreens/ShowToDoScreen';
import ToDosScreen from '../screens/TodoScreens/ToDosScreen';


import MenueScreen from '../screens/Menu';
import AuthScreen from '../screens/StartScreens/AuthScreen';
import CitiesScreen from '../screens/CityScreens/CitiesScreen';
import CityDetailScreen from '../screens/CityScreens/CityDetailScreen';
import LoadingCityScreen from '../screens/StartScreens/LoadingCityScreen';
import SelectCityScreen from '../screens/StartScreens/SelectCityScreen';
import HelpTourScreen from '../screens/StartScreens/HelpTourScreen';
import LoadingAppScreen from '../screens/StartScreens/LoadingAppScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import EventsScreen from '../screens/DiscoverScreen';

import Example from "../screens/Example";
import WelcomeScreen from "../screens/StartScreens/WelcomeScreen";
import ProductDetailScreen from '../screens/Extra/ProductDetailScreen';
import ProductOverviewScreen from "../screens/Extra/ProductOverviewScreen";
import StartArticleListScreen from "../screens/StartArticleScreens/StartArticleListScreen";
import StartArticleDetailScreen from "../screens/StartArticleScreens/StartArticleDetailScreen";
import StartEventDetailScreen from "../screens/StartArticleScreens/StartEventDetailScreen";

const ArticleViewStack = createStackNavigator({
  StartArticleList: {
    screen: StartArticleListScreen
  },
  StartArticleDetail: {
    screen: StartArticleDetailScreen,
    navigationOptions: {
      headerRight: (
        <AntDesign name='closecircleo' size={25} color={"#fff"} style={{paddingRight: 10}} onPress={() => navigation.goBack(null)} />
     )
    }
  },
  StartEventDetail:{
    screen: StartEventDetailScreen,
    navigationOptions: {
    //   headerRight: (
    //     <AntDesign name='closecircleo' size={25} color={"#fff"} style={{paddingRight: 10}} onPress={() => navigation.goBack(null)} />
    //  )
    }
  }
});


const TodoStack = createStackNavigator({
  StartArticleList: {
    screen: ToDosScreen
  },
  InputToDo: {
    screen: InputToDoScreen
  },
  TodoDetailsScreen: {
    screen: ShowToDoScreen
  },
  StartArticleDetail: {
    screen: StartArticleDetailScreen,
    navigationOptions: {
    //   headerRight: (
    //     <AntDesign name='closecircleo' size={25} color={"#fff"} style={{paddingRight: 10}} onPress={() => navigation.goBack(null)} />
    //  )
    }
  },
  StartEventDetail:{
    screen: StartEventDetailScreen,
    navigationOptions: {
    //   headerRight: (
    //     <AntDesign name='closecircleo' size={25} color={"#fff"} style={{paddingRight: 10}} onPress={() => navigation.goBack(null)} />
    //  )
    }
  }
});



const CityTabNavigator = createBottomTabNavigator({
    Events: {screen: TodoStack, navigationOptions:{
        tabBarIcon: (tabinfo) => {
            return <MaterialCommunityIcons name='calendar-blank' size={25} color={tabinfo.tintColor} />
        }
    }},
    Todos: {screen: DiscoverScreen, navigationOptions:{
        tabBarIcon: (tabinfo) => {
            return <Ionicons name='ios-checkbox-outline' size={25} color={tabinfo.tintColor} />
        }
    }},
    Notes: {screen: EventsScreen, navigationOptions:{
        tabBarIcon: (tabinfo) => {
            return <FontAwesome name='sticky-note-o' size={25} color={tabinfo.tintColor} />
        }
    }},
    Contacts: {screen:EventsScreen, navigationOptions:{
        headertitle: 'Security',
        tabBarIcon: (tabinfo) => {
            return <AntDesign name='contacts' size={25} color={tabinfo.tintColor} />
        }
    }},
    Menu: {screen:EventsScreen, navigationOptions:{
        tabBarLabel: 'Menu',
        tabBarIcon: (tabinfo) => {
            return <MaterialIcons name='menu' size={25} color={tabinfo.tintColor} />
        }
    }},
},{
    tabBarOptions:{
        activeTintColor: "#0641A7"
    }
});


const SettingsStack = createStackNavigator({
  SettingsList: {
    screen: Example,
    navigationOptions: {
      headerTitle: "Settings List"
    }
  },
  Profile: {
    screen: Example,
    navigationOptions: {
      headerTitle: "Profile"
    }
  }
});

const ViewDetails = createStackNavigator({
  ArticleDetail: {
    screen: StartArticleDetailScreen,
    navigationOptions: {
      headerRight: (
        <AntDesign name='closecircleo' size={25} color={"#fff"} style={{paddingRight: 10}} onPress={() => navigation.goBack(null)} />
     )
    }
  }
});

const MainDrawer = createDrawerNavigator({
  MainTabs: CityTabNavigator,
  Settings: SettingsStack
});

const AppModalStack = createStackNavigator(
  {
    App: MainDrawer,
    Promotion1: {
      screen: Example
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const App = createSwitchNavigator({
  Loading: {
    screen: LoadingAppScreen
  },
  AuthScreen: {
    screen: AuthScreen
  },
  SelectCity: {
    screen: SelectCityScreen
  },
  LoadingCity: {
    screen: LoadingCityScreen
  },
  App: {
    screen: CityTabNavigator
  }
});

export default createAppContainer(App);
