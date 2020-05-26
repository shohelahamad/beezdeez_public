import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconfa from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';


const LabelListItem = (props) => (
    <View style={{}}>
        <View style={styles.listItem}>
            <View style={styles.row}>

                <View style={{ width: "10%" }}>
                    <Iconfa style={{ color: props.labelColor }} size={25} name={"square"} />
                </View>
                <View style={{ width: "75%", flexDirection: "column" }}>
                    <View style={styles.row}>
                        <Text numberOfLines={1} style={{ marginTop: 5 }}>{props.labelTitle} </Text>
                    </View>
                </View>
                <View style={{ width: "15%", flexDirection: "row" }}>
                    <TouchableOpacity onPress={props.onDeletePress}>
                        <MaterialIcons name="delete" style={{ color: 'red', marginRight: 10, fontSize: 25 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.onEditPress}>
                        <Icon style={{ color: "#969696", marginTop: 5 }} size={15} name={"pen"} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    </View>
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
        borderColor: '#969696',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 5
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
export default LabelListItem;
