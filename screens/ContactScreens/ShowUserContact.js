import React, { Component } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Alert,
    Dimensions,
    Image
} from 'react-native';
const { height, width } = Dimensions.get("window");
import { connect } from "react-redux";
import { Dropdown } from 'react-native-material-dropdown';
import * as Contacts from 'expo-contacts';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { setDeleteContact } from "../../store/actions/userContacts";



class ShowUserContact extends Component {
    componentDidMount() {
        this.props.navigation.setParams({ deleteConfirm: this.deleteConfirm });
    }
    async _onDeleteContact(ID){
        await Contacts.removeContactAsync(ID);
        this.props.onDeleteContact(ID);
        this.props.navigation.navigate('contacstList')
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
                        this._onDeleteContact(this.itemKey)
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
                    <Image
                        style={{ height: 120, width: 120, borderRadius: 120 / 2 }}
                        source={
                            this.selContact.imageAvailable ? { uri: this.selContact.image.uri } : require('../../assets/person-male.png')
                        }
                    />
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
                <View
                    style={{
                        borderBottomColor: '#969696',
                        borderBottomWidth: 1,
                        width: width * 0.95,
                        marginTop: 10,
                        marginBottom: 10
                    }}
                />
                <View style={styles.row, { marginBottom: height * 0.03 }}>
                    <Text style={{ color: '#969696' }}>Mobile</Text>
                    <Text style={{ color: 'blue' }}>{this.selContact.phoneNumbers ? this.selContact.phoneNumbers[0].number: "No Phone number added"}</Text>
                </View>
                <View
                    style={{
                        borderBottomColor: '#969696',
                        borderBottomWidth: 1,
                        width: width * 0.95,
                        marginTop: 10,
                        marginBottom: 10
                    }}
                />
                <View style={styles.row, { marginBottom: height * 0.03 }}>
                    <Text style={{ color: '#969696' }}>E-mail</Text>
                    <Text style={{ color: 'blue' }}>{this.selContact.emails ? this.selContact.emails[0].email : "E-mail address not added"}</Text>
                </View>
                <View
                    style={{
                        borderBottomColor: '#969696',
                        borderBottomWidth: 1,
                        width: width * 0.95,
                        marginTop: 10,
                        marginBottom: 10
                    }}
                />
                <View style={styles.row, { marginBottom: height * 0.03 }}>
                    <Text style={{ color: '#969696' }}>Address</Text>
                    <Text style={{ color: 'blue' }}>{this.selContact.addresses ? this.selContact.addresses[0].street + " , " + this.selContact.addresses[0].postalCode+ " , "+ this.selContact.addresses[0].region  : "Address not added"}</Text>
                </View>
                <View
                    style={{
                        borderBottomColor: '#969696',
                        borderBottomWidth: 1,
                        width: width * 0.95,
                        marginTop: 10,
                        marginBottom: 10
                    }}
                />
                <View style={styles.row, { marginBottom: height * 0.03 }}>
                    <Text style={{ color: '#969696' }}>Company</Text>
                    <Text style={{ color: 'blue' }}>{this.selContact.company ? this.selContact.company  : "Company name not added"}</Text>
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
        onDeleteContact: (key) => dispatch(setDeleteContact(key))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowUserContact);
