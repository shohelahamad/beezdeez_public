import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity, Dimensions, Platform, FlatList } from 'react-native';
const { height, width } = Dimensions.get("window");
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as Contacts from 'expo-contacts';
import * as Permissions from "expo-permissions";
import ContactList from '../../components/ContactList/ContactList';
import { setUserContact } from '../../store/actions/userContacts';
import { Ionicons } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';





class UserContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // For adding a contact
      firstName: '',
      lastName: '',
      phoneNumber: '',
      userContacts: [],
      searchedContacts: []
    };
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails,Contacts.Fields.PhoneNumbers,Contacts.Fields.Image],
      });

      if (data.length > 0) {
        this.props.setContacts(data, this.props.userId);
        console.log(data);
        this.setState({
          userContacts: data,
          searchedContacts: data
        });
      }
    }
  }
  searchItemCahgnehandelar = (val) => {
    this.setState({
      searchItem: val
    });
  };
  itemSelectedHandler = key => {
    console.log(key);

    const selContact = this.state.userContacts.find(userContact => {
      return userContact.id === key;
    });
    this.props.navigation.navigate('ContactDetailsScreen', {
      itemKey: selContact.id
    });
  };
  searchFilterFunction = text => {    
    const newData = this.state.userContacts.filter(item => {      
      const itemData = `${item.name.toUpperCase()}   
      ${item.firstName.toUpperCase()} ${item.lastName.toUpperCase()}`;
      
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });
    text == "" ? this.setState({ searchedContacts: this.state.userContacts }):
    this.setState({ searchedContacts: newData });  
  };
  keyExtractor = (item, index) => index.toString()
  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={item.subtitle}
      leftAvatar={item.imageAvailable ? { source: {uri: item.image.uri}} : {
        source:require('../../assets/person-male.png') }}
      // leftAvatar={item.imageAvailable ? { source: {uri: item.image.uri}} : {source: {uri: item.name}}}
      bottomDivider
      chevron
      onPress={() =>this.itemSelectedHandler(item.id)}
    />
  )
  render() {
    return (
      <View style={styles.container}>
        <FontAwesome style={styles.searchIcon} name="search" size={20} color="#969696" />
        <TextInput value={this.state.searchItem}
          onChangeText={text => this.searchFilterFunction(text)}
          style={styles.searchInputField}
          placeholder={"Search For your Contact"} />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.searchedContacts}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
UserContacts.navigationOptions = navData => {
  return {
    headerTitle: "Contacts",
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
    }} />,
    headerRight: (

      <View style={{ flexDirection: "row" }}>
        <AntDesign name="adduser" style={{ color: '#ffffff', fontSize: 25, paddingRight: 10 }} onPress={() => {
          navData.navigation.navigate('InputContact');
        }} />
      </View>
    )

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
    setContacts: (contacts, userId) => dispatch(setUserContact(contacts, userId))
  };
};
const mapStateToProps = state => {
  return {
    contacts: state.userContacts.contacts,
    userId: state.auth.userId,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserContacts);