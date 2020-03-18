import React from 'react';
import { FlatList, View , Text, StyleSheet} from 'react-native';

const DiscoverScreen = props =>{
    return (
        <View style={styles.screen}>
           <FlatList/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default DiscoverScreen;