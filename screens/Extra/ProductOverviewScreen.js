import React from 'react';
import { FlatList, View , Text, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/Shop/ProductItem';

const ProductOverviewScreen = props =>{
    const products = useSelector(state => state.products.availableProducts)
    return (
        <View style={styles.screen}>
           <FlatList data={products} 
            keyExtractor={item => item.id}
            renderItem={itemdata => <ProductItem 
            image={itemdata.item.imageUrl}
            title={itemdata.item.title}
            price={itemdata.item.price}
            onViewDetail={() => {
                console.log(props)
                // props.navigation.navigate({ routeName: 'ProductDetail'});
                props.navigation.navigate('ProductDetail',{ 
                    productId: itemdata.item.id,
                    productTitle: itemdata.item.title
                });
            }}
            onAddToCart={() => {}}
        />}
        />
        </View>
    );
};

ProductOverviewScreen.navigationOptions ={
    headerTitle: "View All"
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductOverviewScreen;