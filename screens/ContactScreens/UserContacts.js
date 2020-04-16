// import React, { useEffect } from 'react';
// import { View, Text } from 'react-native';
// import * as Contacts from 'expo-contacts';
// import * as Permissions from "expo-permissions";

// export default function UserContacts() {
//   useEffect(() => {
//     (async () => {
//       const { status } = await Permissions.askAsync(Permissions.CONTACTS);
//       if (status === 'granted') {
//         const { data } = await Contacts.getContactsAsync({
//           fields: [Contacts.Fields.Emails],
//         });

//         if (data.length > 0) {
//           const contact = data[0];
//           console.log(contact);
//         }
//       }
//     })();
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}>
//       <Text>Contacts Module Example</Text>
//     </View>
//   );
// }
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity, Dimensions } from 'react-native';
const { height, width } = Dimensions.get("window");
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as Contacts from 'expo-contacts';
import * as Permissions from "expo-permissions";
import ContactList from '../../components/ContactList/ContactList';
import { loadContacts, selectContact, hideSelected, addContact, toggleShowHidden } from '../../store/actions/userContacts';



class UserContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // For adding a contact
      firstName: '',
      lastName: '',
      phoneNumber: ''
    };    
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          // this.props.loadContacts(data);
          console.log(data);
        }
      }
  }
  searchItemCahgnehandelar = (val) => {
    this.setState({
      searchItem: val
    });
  };
  itemSelectedHandler = key => {
    const selContact = this.props.userContacts.find(userContact => {
      return userContact.key === key;
    });
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ShowContact',
        passProps: {
          selectedPlace: selContact
        },
        options: {
          statusBar: {
            style: 'dark'
          },
          topBar: {

            title: {
              text: "Details",
              color: '#000000'
            },
            background: {
              color: '#ffffff',
              translucent: false
            }
          },
          bottomTabs: { visible: false, drawBehind: true, animate: true },

        }
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
          <FontAwesome style={styles.searchIcon} name="search" size={20} color="#969696" />
          <TextInput value={this.state.searchItem}
            onChangeText={this.searchItemCahgnehandelar}
            style={styles.searchInputField}
            placeholder={"Search For your Contact"} />
        <ContactList
          userContacts={this.props.userContacts}
          onItemSelected={this.itemSelectedHandler}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: "#E5EBE7"
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10

  },
  searchInputField: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    height: 40,
    margin: 20,
    padding: 5,
    paddingLeft: 40,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  searchIcon: {
    position: 'absolute',
    top: 30,
    left: 30,
    zIndex: 1,
  }
});
function mapDispatchToProps(dispatch) {
  return {
    loadContacts: contacts => dispatch(loadContacts(contacts)),
  };
}
const mapStateToProps = state => {
  return {
    userContacts: state.userContacts.contacts
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserContacts);