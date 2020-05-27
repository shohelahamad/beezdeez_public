import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
} from 'react-native';
import ContactInput from '../../components/ContactInput/ContactInput';
import { connect } from 'react-redux';
import { loadContacts, selectContact, hideSelected, addContact, toggleShowHidden } from '../../store/actions/userContacts';
import * as Contacts from 'expo-contacts';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';


class InputUserContact extends Component {
    state = {
        image: null,
      };
    componentDidMount() {
        this.getPermissionAsync();
        console.log('hi');
    }

    contactAddedHandler = (firstName, lastName, phoneNumber) => {

        if (firstName && lastName && phoneNumber) {
            const contact = {
                [Contacts.Fields.FirstName]: firstName,
                [Contacts.Fields.LastName]: lastName,
                [Contacts.Fields.Company]: 'ALPHAJUMP',
                [Contacts.Fields.PHONE_NUMBERS]: phoneNumber,
                [Contacts.Fields.EMAILS]: 'shohelahamad@gmail.com',
                [Contacts.Fields.ADDRESSES]: 'Am alten hospital 9',
                [Contacts.Fields.IMAGE]: 'IT',
            };
            Contacts.addContactAsync(contact);
            // this.props.addContact(firstName, lastName, phoneNumber);
            // this._textInput1.setNativeProps({text: ''});
            // this._textInput2.setNativeProps({text: ''});
            // this._textInput3.setNativeProps({text: ''});
        }
        //   Navigation.pop(this.props.componentId);
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
            this.uploadImageToFirebase(result.uri);
        }
    };
    uploadImageToFirebase = async(uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child(this.props.userId).child(uri.split('/')[(uri.split('/').length)-1]);
        return ref.put(blob);
      }

    render() {
        return (
            <View>
                <ContactInput onContactAdded={this.contactAddedHandler} onImageUpload={this._pickImage} imageThum={this.state.image}/>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
      userId: state.auth.userId
    };
  };
const mapDispatchToProps = dispatch => {
    return {
        addContact: (first, last, phone) => dispatch(addContact(first, last, phone)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputUserContact);