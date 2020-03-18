import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TouchableHighlight, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconfa from 'react-native-vector-icons/FontAwesome5';

const ContactListItem = (props) => (
    <TouchableOpacity onPress={props.onItemPressed} style={{}}>



        <View style={styles.listItem}>
            <View style={styles.row}>

                <View style={{ width: "20%" }}>
                    <View
                        style={[styles.profileImgContainer, { borderColor: 'green', borderWidth: 1 }]}
                    >
                        <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnN-1yD4W7elCW6bh1KHwsq4OOeI7GCUbnLw4DY_xoxocuixlkUQ" }} style={styles.profileImg} />
                    </View>
                </View>
                <View style={{ width: "80%", flexDirection: "column" }}>
                    <View style={styles.nameRow}>
                        <Text style={styles.nameText}>{props.firstName} </Text>
                        <Text style={styles.nameText}>{props.lastName} </Text>
                    </View>
                </View>
            </View>


        </View>
    </TouchableOpacity>
);
const styles = StyleSheet.create({
    listItem: {
        width: "95%",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: "2.5%",
        marginBottom: 2,
        borderColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center'
    },
    placeImage: {
        marginRight: 8,
        height: 30,
        width: 30
    },
    nameText:{
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 15
    },
    row: {
        flex: 1,
        flexDirection: "row",
    },
    nameRow: {
        flex: 1,
        flexDirection: "row",
        // borderBottomColor: 'gray',
        // borderBottomWidth: 1,
    },
    profileImgContainer: {
        marginLeft: 0,
        height: 50,
        width: 50,
        borderRadius: 25,
        overflow: 'hidden'
    },
    profileImg: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
});
export default ContactListItem;
