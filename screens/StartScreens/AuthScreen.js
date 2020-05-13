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
import { tryAuth } from "../../store/actions/auth";
import { uiStartLoading, uiStopLoading } from "../../store/actions/ui";



class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
    authMode: "login",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
      }
    }
  };
  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
    this.loginUser = this.loginUser.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }
  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      };
    });
  };
  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  loginUser() {
    // this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.authMode );
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onAuth( authData, this.state.authMode );
  }
  onLoginFail() {
    this.setState({
      error: 'Login Failed',
      loading: false
    });
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
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                  prevState.controls.confirmPassword.value,
                  prevState.controls.confirmPassword.validationRules,
                  connectedValue
                )
                : prevState.controls.confirmPassword.valid
          },
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
    let forgotPasswordControl = null;
    let confirmPasswordControl = null;
    let submitButton = (
      <ButtonWithBackground
        color="#0641A7"
        onPress={this.loginUser}
        disabled={
          (!this.state.controls.confirmPassword.valid &&
            this.state.authMode === "signup") ||
          !this.state.controls.email.valid ||
          !this.state.controls.password.valid
        }
      >
        <Text style={[this.state.controls.email.valid
          && this.state.controls.password.valid
          && (this.state.controls.confirmPassword.valid || this.state.authMode === "login") ? styles.buttonText : null]}>{this.state.authMode === "login" ? "Login" : "Sign Up"}</Text>
      </ButtonWithBackground>
    );
    if (this.props.isLoading) {
      submitButton = <View style={styles.button}>
        <ActivityIndicator color={"#ffffff"} />
      </View>
    }
    if (this.state.authMode === "login") {
      forgotPasswordControl = (
        <View style={styles.rememberMeContainer}>
          <Text> </Text>
          <Text style={styles.linkColor}>Forgot Password?</Text>
        </View>
      );
    }
    if (this.state.authMode === "signup") {
      confirmPasswordControl = (
        <View
          style={
            this.state.viewMode === "portrait"
              ? styles.portraitPasswordWrapper
              : styles.landscapePasswordWrapper
          }
        >
          <Text>Confirm Password</Text>
          <View style={styles.inputFieldaContainer}>
            <DefaultInput
              placeholder=""
              style={styles.passwordField}
              value={this.state.controls.confirmPassword.value}
              onChangeText={val => this.updateInputState("confirmPassword", val)}
              valid={this.state.controls.confirmPassword.valid}
              touched={this.state.controls.confirmPassword.touched}
              secureTextEntry
            />
            <MaterialIcons style={styles.inputIcon} name={"check-circle"} size={15} color={this.state.controls.confirmPassword.valid ? "green" : "#fff"} />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}>BeezDeez- Your Business Dairy</Text>
        <Text style={styles.headerText}>Glad to see you!</Text>

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
        <Text>Password</Text>
        <View style={styles.inputFieldaContainer}>
          <DefaultInput
            placeholder=""
            style={styles.passwordField}
            value={this.state.controls.password.value}
            onChangeText={val => this.updateInputState("password", val)}
            valid={this.state.controls.password.valid}
            touched={this.state.controls.password.touched}
            secureTextEntry
          />
          <MaterialIcons style={styles.inputIcon} name={"check-circle"} size={15} color={this.state.controls.password.valid ? "green" : "#fff"} />
        </View>
        {confirmPasswordControl}

        {forgotPasswordControl}

        {submitButton}
        <View style={styles.signUpContainer}>
          <Text>{this.state.authMode === "login" ? "New User? " : "Already an User? "}</Text>
          <TouchableOpacity onPress={this.switchAuthModeHandler}>
            <Text style={styles.linkColor}>{this.state.authMode === "login" ? "Sign Up" : "Login"}</Text>
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
    fontSize: 40,
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
    onAuth: (authData, authDatas) => dispatch(tryAuth(authData,authDatas )),
    onAuthSetToken: (token, userId) => dispatch(authStoreToken(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

