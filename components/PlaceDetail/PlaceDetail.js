import React from 'react'
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
const placeDetail = props => {
    let modalContent = null;
    if(props.selectedPlace){
        modalContent = (
            <View>
                <Image source={props.selectedPlace.image} style={styles.placeImage} />
                <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
            </View>
        );
    }
    return(
    <Modal onRequestClose={props.onModalClose} visible={props.selectedPlace !== null} animationType="slide">
        <View style={styles.modalContainer}>
            {modalContent}
            <View>
                <TouchableOpacity onPress={props.onItemDeleted}>
                    <View style={styles.deleteIcon}>
                        <Icon size={30} name="ios-trash" color="red"/>
                    </View>
                </TouchableOpacity>
                {/* <Button title="Delete" color="orange" onPress={props.onItemDeleted}/> */}
                <Button title="Close" color="green" onPress={props.onModalClose}/>
            </View>
        </View>
    </Modal>
    );
    
};
const styles = StyleSheet.create({
    modalContainer:{
        margin: 22,
    },
    placeImage:{
        width: "100%",
        height: 200
    },
    placeName:{
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center"
    },
    deleteIcon:{
        alignItems: "center"
    }
});
export default placeDetail;