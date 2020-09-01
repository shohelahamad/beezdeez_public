import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import validate from "../../utility/validation";
import deviceStorage from '../../services/deviceStorage';
import axios from 'axios';

import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import { MaterialIcons } from '@expo/vector-icons';

import { connect } from "react-redux";
import { tryResetPassword } from "../../store/actions/auth";
import { uiStartLoading, uiStopLoading } from "../../store/actions/ui";



class ForgotPasswordScreen extends Component {
  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      }
    }
  };
  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
    this.resetPassword = this.resetPassword.bind(this);
  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }
  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  resetPassword() {
    this.props.onResetPassword(this.state.controls.email.value);
  }

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };



  render() {
    let submitButton = (
      <ButtonWithBackground
        color="#0641A7"
        onPress={this.resetPassword}
        disabled={
          (
          !this.state.controls.email.valid )
        }
      >
        <Text style={[this.state.controls.email.valid ? styles.buttonText : null]}>Reset Password</Text>
      </ButtonWithBackground>
    );
    if (this.props.isLoading) {
      submitButton = <View style={styles.button}>
        <ActivityIndicator color={"#ffffff"} />
      </View>
    }
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}>BeezDeez- Your Business Dairy</Text>
        <Text style={styles.headerText}>Reset your password</Text>

        <Text>Email</Text>
        <View style={styles.inputFieldaContainer}>
          <DefaultInput
            placeholder=""
            style={styles.emailField}
            value={this.state.controls.email.value}
            onChangeText={val => this.updateInputState("email", val)}
            valid={this.state.controls.email.valid}
            touched={this.state.controls.email.touched}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <MaterialIcons style={styles.inputIcon} name={"check-circle"} size={15} color={this.state.controls.email.valid ? "green" : "#fff"} />
        </View>
        {submitButton}
        <View style={styles.signUpContainer}>
          <TouchableOpacity onPress={this.switchAuthModeHandler}>
            <Text style={styles.linkColor} onPress={() => this.props.navigation.navigate('AuthScreen')}>Go back to login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
    marginTop: "20%"
  },
  emailField: {
    borderBottomWidth: 1,
    marginBottom: 10,
    borderBottomColor: "#efefef",
    height: 40,
  },
  passwordField: {
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
  button: {
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
    color: '#ffffff',
  },
  headerText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: 5,
    marginBottom: 25,
  },
  titleText: {
    marginTop: 25,
  },
  rememberMeContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  inputFieldaContainer: {
    width: "100%"
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
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "45%"
  },
  portraitPasswordWrapper: {
    width: "100%"
  },
  inputIcon: {
    position: "absolute",
    right: 5,
    top: 15
  }
});
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    isLoading: state.ui.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onStartingLoading: () => dispatch(uiStartLoading()),
    onResetPassword: (email) => dispatch(tryResetPassword(email)),
    onAuthSetToken: (token, userId) => dispatch(authStoreToken(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);

