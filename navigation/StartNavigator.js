import React  from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import WelcomeScreen from '../screens/StartScreens/WelcomeScreen';
import HelpTourScreen from '../screens/StartScreens/HelpTourScreen';
import SelectCityScreen from '../screens/StartScreens/SelectCityScreen';


const WelcomeNavigator = createStackNavigator({
    Welcome: {
        screen: WelcomeScreen
     },
    HelpTour: HelpTourScreen,    
    SelectCity: SelectCityScreen
});

export default createAppContainer(WelcomeNavigator);
