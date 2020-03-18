import React from 'react';
import { View , Text, StyleSheet, Button} from 'react-native';

const MenuScreen = props =>{
    return (
        <View style={styles.screen}>
            <Text>Menu Screen</Text>
            {/* <Button title="Go to City" onPress={() =>{
                props.navigation.replace({routeName: 'Cities'})
            }}/> */}
            <Button title="Go to City" onPress={() =>{
                props.navigation.replace('Cities')
            }}/>
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

export default MenuScreen;