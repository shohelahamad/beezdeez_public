import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';

import ProductOverviewScreen from '../screens/Extra/ProductOverviewScreen';
import ProductDetailScreen from '../screens/Extra/ProductDetailScreen';


const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen
},{
    defaultNavigationOptions: {
        headerStyle:{
            backgroundColor: Colors.primary        }
    },
    headerTintColor: 'white',
});

export default createAppContainer(ProductsNavigator)