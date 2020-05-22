import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconfa from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-check-box';

const NoteListItem = (props) => (
    <TouchableOpacity onPress={props.onItemPressed} style={{}}>
        <View style={styles.listItem}>
            <View style={styles.row}>

                <View style={{ width: "10%" }}>
                    <Iconfa style={{color: props.catagory.labelColor}} size={25} name={"square"} />
                </View>
                <View style={{ width: "90%", flexDirection: "column" }}>
                    <View style={styles.row}>
                        <Text numberOfLines={1} style={{ fontSize: 15, color: "#000000", fontWeight: "bold" }}>{props.noteHeading} </Text>
                    </View>
                    <View style={styles.row}>
                        <Text numberOfLines={1} style={{ marginTop: 10 }}>{props.noteDescribtion} </Text>
                    </View>
                </View>
            </View>
            <View style={styles.row}>

                <View style={{ width: "10%" }}>
                </View>
                <View style={{ width: "90%", flexDirection: "row", marginTop: 10 }}>
                    <View style={{ width: "82%", flexDirection: "row" }}>
                        <Text style={{ color: "#969696" }}>{props.catagory.labelTitle} </Text>
                        <Icon style={{ marginRight: 5, marginLeft: 5 }} name={"calendar"} color={"#969696"} size={15} />
                        <Text numberOfLines={1} style={{ color: "#969696" }}>{props.eventId} </Text>
                    </View>
                    <View style={{ width: "18%", flexDirection: "row" }}>
                        <Text style={{ color: "#969696" }}>12.12.19</Text>
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
        alignItems: 'center',
    },
    placeImage: {
        marginRight: 8,
        height: 30,
        width: 30
    },
    row: {
        flex: 1,
        flexDirection: "row",
        // justifyContent: "space-between",
    }
});
export default NoteListItem;
