import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
const { height, width } = Dimensions.get("window");
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as Contacts from 'expo-contacts';
import * as Permissions from "expo-permissions";
import ContactList from '../../components/ContactList/ContactList';
import { setUserContact } from '../../store/actions/userContacts';
import { Ionicons } from '@expo/vector-icons';




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
          this.props.setContacts(data,this.props.userId);
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
UserContacts.navigationOptions = navData => {
  return {
    headerTitle: "Notes",
    headerTintColor: 'white',
    headerBackground: (
      <LinearGradient
        colors={['#0637a5', '#0fadd5']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    ),
    ...Platform.select({
      android: {
        headerForceInset: { top: 'never', bottom: 'never' },
        // headerStyle: {
        //   height: 90
        // },
      },
      ios: {
        // headerStyle: {
        //   height: 60
        // }
      }
    }),
    headerTitleStyle: { color: '#fff', fontSize: width * 0.06, textAlign: 'center' },
    headerLeft: <Ionicons name="ios-menu" style={{ color: '#ffffff', fontSize: 35, paddingLeft: 10 }} onPress={() => {
      navData.navigation.toggleDrawer()
    }} />

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
const mapDispatchToProps = dispatch => {
  return {
    setContacts: (contacts,userId) => dispatch(setUserContact(contacts,userId))
  };
};
const mapStateToProps = state => {
  return {
    userContacts: state.userContacts.contacts,
    userId: state.auth.userId,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserContacts);