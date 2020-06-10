import React, { Component } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Alert,
    Dimensions
} from 'react-native';
const { height, width } = Dimensions.get("window");
import { connect } from "react-redux";
import { Dropdown } from 'react-native-material-dropdown';
import Icon from "react-native-vector-icons/FontAwesome";
import Iconfa from "react-native-vector-icons/FontAwesome5";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { deleteNote } from "../../store/actions/notes";



class ShowUserContact extends Component {
    componentDidMount() {
        this.props.navigation.setParams({ deleteConfirm: this.deleteConfirm });
    }
    itemKey = this.props.navigation.getParam('itemKey');
    selContact = this.props.userContacts.find(userContact => {
        return userContact.id === this.itemKey;
    });
    deleteConfirm = () => {
        Alert.alert(
            "Detete Contact",
            "Are you sure you want to delete this Contact?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Delete", onPress: () => (
                        this.props.onDeleteNote(this.props.userId, this.itemKey),
                        this.props.navigation.navigate('notetList')
                    )
                }
            ],
            { cancelable: false }
        );
    };
    _handleDatePicked = (date) => {
        this.setState({
            isDateTimePickerVisible: false,
            dueDate: moment(date).format('MMMM Do YYYY, HH:mm')
        })
    };
    _handleCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`)
    }
    _handleEmail = (email) => {
        Linking.openURL(`mailto:${email}`)
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View onPress={this.props.onImageUpload} style={{
                    width: 120,
                    height: 120,
                    left: width / 2 - 150 / 2,
                    top: 0,
                    backgroundColor: "#efefef",
                    borderRadius: 120 / 2
                }}
                >
                    <Iconfa style={{ marginTop: 20, marginLeft: 35 }} name={"plus"} color={"#000000"} size={20} />
                    <Iconfa style={{ marginTop: -5, marginLeft: 35 }} name={"camera"} color={"#000000"} size={50} />
                </View>
                <View style={styles.row, { marginBottom: height * 0.03 }}>
                    <Text style={styles.noteHeading}>{this.selContact.name}</Text>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={this.props.onImageUpload} style={{
                        width: 50,
                        height: 50,
                        top: 0,
                        backgroundColor: "#0637a5",
                        borderRadius: 50 / 2,
                        marginRight: 15,
                        left: width * 0.5 - 80
                    }}
                    >
                        {this.selContact.phoneNumbers ? <MaterialIcons name="call" style={{ color: '#ffffff', fontSize: 25, marginTop: 12, marginLeft: 12 }} onPress={() => this._handleCall(this.selContact.phoneNumbers[0].digits)} /> : <MaterialIcons name="call" style={{ color: '#969696', fontSize: 25, marginTop: 12, marginLeft: 12 }} />}</TouchableOpacity>

                    <TouchableOpacity onPress={this.props.onImageUpload} style={{
                        width: 50,
                        height: 50,
                        top: 0,
                        backgroundColor: "#0637a5",
                        borderRadius: 50 / 2,
                        left: width * 0.5 - 65
                    }}
                    >
                        {this.selContact.emails ? <MaterialIcons name="mail" style={{ color: '#ffffff', fontSize: 25, marginTop: 12, marginLeft: 12 }} onPress={() => this._handleEmail(this.selContact.emails[0].email)} /> : <MaterialIcons name="mail" style={{ color: '#969696', fontSize: 25, marginTop: 12, marginLeft: 12 }} />}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}
ShowUserContact.navigationOptions = navData => {
    return {
        headerTitle: "Details",
        headerRight: (

            <View style={{ flexDirection: "row" }}>
                <MaterialIcons name="delete" style={{ color: 'red', fontSize: 25, paddingRight: 10 }} onPress={navData.navigation.getParam('deleteConfirm')} />
                <Feather name="edit" style={{ color: '#0637a5', fontSize: 25, paddingRight: 10 }} onPress={() => {
                    navData.navigation.navigate('InputNote',
                        {
                            noteId: navData.navigation.getParam('itemKey')
                        }
                    );
                }} />
            </View>
        )
    }
};
const styles = StyleSheet.create({
    container: {
        marginTop: 22,
        padding: 10
    },
    placeImage: {
        width: "100%",
        height: 200
    },
    noteHeading: {
        fontWeight: "bold",
        fontSize: width * 0.05,
        marginLeft: 0,
        flex: 1,
        textAlign: 'center',
        marginTop: height * 0.02
    },
    deleteButton: {
        alignItems: "center"
    },
    row: {
        flex: 1,
        flexDirection: "row",
        // justifyContent: "space-between",
    }
});
const mapStateToProps = state => {
    return {
        todos: state.todos.todos,
        userContacts: state.userContacts.userContacts,
        userId: state.auth.userId,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onDdoneTodo: key => dispatch(doneTodo(key)),
        onNewDate: (key, newDueDate) => dispatch(updateDueDate(key, newDueDate)),
        onNewPriority: (key, newDueDate) => dispatch(updatePriority(key, newDueDate)),
        onDeleteNote: (userId, key) => dispatch(deleteNote(userId, key))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowUserContact);
