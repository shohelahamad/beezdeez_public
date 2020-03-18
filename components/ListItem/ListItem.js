import React from 'react'
import { View , Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
const ListItem = (props) => (
    <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem}>
            <Image source={props.placeImage} style={styles.placeImage}/>
            <Text >{props.todoDescribtion}</Text>
            <Text >{props.priority}</Text>
            <Text >{props.dueDate}</Text>
            <Text >{props.eventId}</Text>
            <Text >{props.todoTitle}</Text>
        </View>
    </TouchableOpacity>
);
const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    placeImage: {
        marginRight: 8,
        height: 30,
        width: 30
    }
});
export default ListItem;
