import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  AsyncStorage,
  Dimensions
} from "react-native";
const { height, width } = Dimensions.get("window");
import { ListItem, Avatar } from 'react-native-elements';
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

import InputNoteScreen from '../screens/NoteScreens/InputNoteScreen';
import ShowNoteScreen from '../screens/NoteScreens/ShowNoteScreen';
import NotesScreen from '../screens/NoteScreens/NotesScreen';

import ContactsScreen from '../screens/ContactScreens/UserContacts';

import InputLabelScreen from '../screens/LabelSettings/InputLabel';
import LabelSettingScreen from '../screens/LabelSettings/LabelSetting';



import MenueScreen from '../screens/Menu';
import AuthScreen from '../screens/StartScreens/AuthScreen';
import CitiesScreen from '../screens/CityScreens/CitiesScreen';
import CityDetailScreen from '../screens/CityScreens/CityDetailScreen';
import LoadingCityScreen from '../screens/StartScreens/LoadingCityScreen';
import SelectCityScreen from '../screens/StartScreens/SelectCityScreen';
import HelpTourScreen from '../screens/StartScreens/HelpTourScreen';
import LoadingAppScreen from '../screens/StartScreens/LoadingAppScreen';
import InputEventScreen from '../screens/EventScreens/InputEventScreen';
import EventsScreen from '../screens/EventScreens/EventsScreen';

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
        <AntDesign name='closecircleo' size={25} color={"#fff"} style={{ paddingRight: 10 }} onPress={() => navigation.goBack(null)} />
      )
    }
  },
  StartEventDetail: {
    screen: StartEventDetailScreen,
    navigationOptions: {
      //   headerRight: (
      //     <AntDesign name='closecircleo' size={25} color={"#fff"} style={{paddingRight: 10}} onPress={() => navigation.goBack(null)} />
      //  )
    }
  }
});

const EventStack = createStackNavigator({
  EventsScreen: {
    screen: EventsScreen
  },
  InputEvent: {
    screen: InputEventScreen
  },
  EventDetailsScreen: {
    screen: ShowToDoScreen
  },
  
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
  }
});

const NoteStack = createStackNavigator({
  notetList: {
    screen: NotesScreen
  },
  InputNote: {
    screen: InputNoteScreen
  },
  NoteDetailsScreen: {
    screen: ShowNoteScreen
  },
  LabelScreen: {
    screen: LabelSettingScreen
  },
  InputLabelScreen: {
    screen: InputLabelScreen
  },
  labelDetailsScreen: {
    screen: ShowNoteScreen
  }
});
const ContactsStack = createStackNavigator({
  contacstList: {
    screen: ContactsScreen
  },
  InputContact: {
    screen: InputNoteScreen
  },
  ContactDetailsScreen: {
    screen: ShowNoteScreen
  }
});



const CityTabNavigator = createBottomTabNavigator({
  Events: {
    screen: EventStack, navigationOptions: {
      tabBarIcon: (tabinfo) => {
        return <MaterialCommunityIcons name='calendar-blank' size={25} color={tabinfo.tintColor} />
      }
    }
  },
  Todos: {
    screen: TodoStack, navigationOptions: {
      tabBarIcon: (tabinfo) => {
        return <Ionicons name='ios-checkbox-outline' size={25} color={tabinfo.tintColor} />
      }
    }
  },
  Notes: {
    screen: NoteStack, navigationOptions: {
      tabBarIcon: (tabinfo) => {
        return <FontAwesome name='sticky-note-o' size={25} color={tabinfo.tintColor} />
      }
    }
  },
  Contacts: {
    screen: ContactsStack, navigationOptions: {
      headertitle: 'Security',
      tabBarIcon: (tabinfo) => {
        return <AntDesign name='contacts' size={25} color={tabinfo.tintColor} />
      }
    }
  }
}, {
  tabBarOptions: {
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
        <AntDesign name='closecircleo' size={25} color={"#fff"} style={{ paddingRight: 10 }} onPress={() => navigation.goBack(null)} />
      )
    }
  }
});
const CustomDrawerContentComponent = (props) => (

  <View>
    <FontAwesome name="times-circle" style={{ color: '#000000', fontSize: 25, top: 30, position: 'absolute', right: 25  }} onPress={() => {
      props.navigation.toggleDrawer()
    }} />
    <View style={{ justifyContent: 'center', marginTop: 50, alignItems: 'center'}}>
      <Avatar
        size="xlarge"
        rounded
        title="CR"
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
        source={{
          uri:
            '../assets/avatar-default-icon.png',
        }}
        placeholderStyle={{ backgroundColor: '#000000' }}
      />
    </View>
    <ListItem
      title="logout"
      leftIcon={{ name: 'logout', type: 'antdesign' }}
      bottomDivider
      chevron
      onPress={() => (
        AsyncStorage.removeItem("ap:auth:token"),
        AsyncStorage.removeItem("ap:auth:userId"),
        props.navigation.navigate({ routeName: 'AuthScreen' })
      )}
    />
    <ListItem
      title="Label Setting"
      leftIcon={{ name: 'logout', type: 'antdesign' }}
      bottomDivider
      chevron
      onPress={() => (
        AsyncStorage.removeItem("ap:auth:token"),
        AsyncStorage.removeItem("ap:auth:userId"),
        props.navigation.navigate({ routeName: 'LabelScreen' })
      )}
    />
  </View>

);
const MainDrawer = createDrawerNavigator({
  MainTabs: CityTabNavigator,
  Settings: SettingsStack,
},
  {
    initialRouteName: 'MainTabs',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerWidth: width,
  });

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
    screen: MainDrawer
  }
});

export default createAppContainer(App);
