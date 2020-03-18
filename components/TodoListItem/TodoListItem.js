import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconfa from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-check-box'

const TodoListItem = (props) => (
    <TouchableOpacity onPress={props.onItemPressed} style={{textDecorationLine: props.isDone ? 'line-through' : 'none'}}>
        <View style={ props.isDone ? styles.listItemDone : styles.listItem }>
            <View style={styles.row}>
                <View style={{ width: "90%", flexDirection: "row" }}>
                    <CheckBox style={{ marginTop: 0, marginRight: 5, marginLeft: 0}}
                        onClick={props.onDoneTodo}
                        isChecked={props.isDone}
                        checkedImage={<Iconfa style={{}} size={20} name="check-square" color="#969696" />}
                        unCheckedImage={<Icon style={{}} size={20} name="square" color="#000000" />}
                    />
                    <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 15, color: "#000000", fontWeight: "bold" }}>{props.todoTitle}</Text>
                </View>
                <View style={{ width: "10%" }}>
                    <Iconfa style={{ marginTop: 0, marginLeft: 20}} name={props.priority === "Less Important" ? "arrow-down" : "arrow-up"} color={props.priority === "Less Important" ? "green" : props.priority === "Medium" ? "#ffc107" : "red"} size={15} />

                </View>

            </View>
            <View style={styles.row}>
                <View style={{ marginLeft: 20, width: "40%", flexDirection: "row", marginTop: 5 }}>

                    <Text style={{ color: "red"}} >{props.dueDate}</Text>
                </View>
                <View style={{ width: "50%", flexDirection: "row", marginTop: 5 }}>
                    <Icon style={{ marginRight: 5, marginLeft: 5 }} name={"calendar"} color={"#969696"} size={15} />

                    <Text style={{ color: "#969696"}} >{props.eventId}</Text>
                </View>

            </View>

            {/* <Text >{props.todoDescribtion}</Text>
            <Text >{props.priority}</Text>
            <Text >{props.dueDate}</Text>
            <Text >{props.eventId}</Text> */}

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
    listItemDone: {
        width: "95%",
        backgroundColor: "#f4f5f6",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: "2.5%",
        marginBottom: 2,
        borderColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        // textDecorationLine: 'line-through',
        // textDecorationStyle: 'solid'
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
export default TodoListItem;
