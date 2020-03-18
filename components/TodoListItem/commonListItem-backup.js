import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconfa from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-check-box'

const TodoListItem = (props) => (
    <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem}>
            <View style={styles.row}>
                <View style={{ width: "90%", flexDirection: "row" }}>
                    <CheckBox style={{ marginTop: -5, marginRight: 5, marginLeft: -5 }}
                        onClick={() => {
                            // this.setState({
                            //     isChecked: !this.state.isChecked
                            // })
                        }}
                        isChecked={false}
                        leftText={"CheckBox"}
                    />
                    <Text style={{ marginLeft: 5, fontSize: 15, color: "#000000", fontWeight: "bold" }}>{props.todoTitle}</Text>
                </View>
                <View style={{ width: "10%" }}>
                    <Iconfa style={{ marginTop: 0, marginLeft: 20}} name={props.priority === "Less Important" ? "arrow-down" : "arrow-up"} color={props.priority === "Less Important" ? "green" : props.priority === "Medium" ? "#ffc107" : "red"} size={15} />

                </View>

            </View>
            <View style={styles.row}>
                <View style={{ marginLeft: 20, width: "40%", flexDirection: "row" }}>

                    <Text >{props.dueDate}</Text>
                </View>
                <View style={{ width: "50%", flexDirection: "row" }}>
                    <Icon style={{ marginRight: 5, marginLeft: 5 }} name={"calendar"} color={"#000000"} size={15} />

                    <Text >{props.eventId}</Text>
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
