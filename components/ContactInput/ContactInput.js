import React, { Component } from 'react'
import { StyleSheet,ScrollView, View, TextInput, Text, TouchableOpacity, Dimensions} from 'react-native';
const { height, width } = Dimensions.get("window");
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconfa from 'react-native-vector-icons/FontAwesome';

class ContactInput extends Component {
  state = {
    firstName: '',
    lastName: '',
    // companyName: '',
    phoneNumber: '',
    // email: '',
    // address: '',
  }
  firstNameCahgnehandelar = (val) => {
    this.setState({
      firstName: val
    });
  };
  lastNameCahgnehandelar = (val) => {
    this.setState({
      lastName: val
    });
  };
  // companyNameCahgnehandelar = (val) => {
  //   this.setState({
  //     companyName: val
  //   });
  // };
  phoneNumberCahgnehandelar = (val) => {
    this.setState({
      phoneNumber: val
    });
  };
  // addressCahgnehandelar = (val) => {
  //   this.setState({
  //     address: val
  //   });
  // };
  // emailCahgnehandelar = (val) => {
  //   this.setState({
  //     email: val
  //   });
  // };
 


  contactSubmithandelar = () => {
    if (this.state.firstName.trim() === "") {
      return;
    }
    this.props.onContactAdded(
      this.state.firstName, 
      this.state.lastName, 
      // this.state.companyName,
      this.state.phoneNumber,
      // this.state.email,
      // this.state.address
      )
  };
  
  render() {
    return (
      <ScrollView style={styles.inputContainer}>
        <View style={{ height: 150}}>
        <TouchableOpacity style={{ width: 120, 
            height: 120, 
            position: "absolute", 
            left: width / 2 - 150/2, 
            top: 0, 
            backgroundColor: "#efefef",
            borderRadius: 120/2
            }} 
            >
            <Iconfa style={{marginTop: 20, marginLeft: 35}}name={"plus"} color={"#000000"} size={20}/>
            <Iconfa style={{marginTop: -5, marginLeft: 35}}name={"camera"} color={"#000000"} size={50}/>
          </TouchableOpacity>
        </View>
        

        <Text>First Name</Text>
        <TextInput value={this.state.eventId}
          onChangeText={this.firstNameCahgnehandelar}
          style={styles.inputField}
          placeholder={"First Name"} />

        <Text>Last Name</Text>
        <TextInput value={this.state.eventId}
          onChangeText={this.lastNameCahgnehandelar}
          style={styles.inputField}
          placeholder={"Last Name"} />

        {/* <Text>Company</Text>
        <TextInput value={this.state.eventId}
          onChangeText={this.companyNameCahgnehandelar}
          style={styles.inputField}
          placeholder={"Company Name"} /> */}
        <Text>Mobile</Text>
        <TextInput value={this.state.eventId}
          onChangeText={this.phoneNumberCahgnehandelar}
          style={styles.inputField}
          placeholder={"Add Mobile Number"} />
        {/* <Text>E-Mail</Text>
        <TextInput value={this.state.eventId}
          onChangeText={this.emailCahgnehandelar}
          style={styles.inputField}
          placeholder={"Add E-Mail"} />
        <Text>Address</Text>
        <TextInput value={this.state.eventId}
          onChangeText={this.addressCahgnehandelar}
          style={styles.inputField}
          placeholder={"Address"} /> */}

        <View>
          <TouchableOpacity onPress={(this.contactSubmithandelar)}>
            <View style={styles.loginButton}>
              <Text style={styles.buttonText}> Add </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center"
  },
  placeInput: {
    width: "65%"
  },
  placeButton: {
    width: "35%"
  },
  inputContainer: {
    width: "100%",
    // justifyContent: "space-between",
    padding: 20
  },
  emailField: {
    borderBottomWidth: 1,
    marginBottom: 10,
    borderBottomColor: "#efefef",
    height: 120,
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
    marginBottom: 15,
    height: 40,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#0641A7",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    justifyContent: "center",

  },
  buttonText: {
    color: '#fff',
  },
  headerText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 5,
    marginBottom: 25,
  },
  titleText: {
    fontSize: 30,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderBottomColor: "#efefef",
    paddingLeft: 40
  },
  rememberMeContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  signUpContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  linkColor: {
    color: '#007bff'
  }
});
export default ContactInput;

