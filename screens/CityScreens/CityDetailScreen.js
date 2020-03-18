import React from 'react';
import { View , Text, StyleSheet, Button} from 'react-native';

const CityDetailScreen = props =>{
    return (
        <View style={styles.screen}>
            <Text>City Details Screen</Text>
            <Button title="Go Back" onPress={() =>{
                props.navigation.popToTop();
            }}/>
            {/* <Button title="Go Back" onPress={() =>{
                props.navigation.goBack();
            }}/> */}
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

export default CityDetailScreen;