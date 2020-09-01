import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./ui";
import NavigatorService from "../../components/UI/NavStart/NavigatorService";
// import App from "../../../App";
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';


// const API_KEY = "AIzaSyCnX8rTPN4YtEZiX5FMYkqQtXJNLu80GPU";

// export const authSetToken = (JWT_TOKEN) =>{
//     return {
//         type: AUTH_SET_TOKEN,
//         token: JWT_TOKEN,
//     };
// };



export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    if (authMode === 'signup') {
      firebase
        .auth()
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then(() => {
          dispatch(
            authStoreToken(
              'userToken',
              firebase.auth().currentUser.uid
            )
          );
          dispatch(uiStopLoading());
        })
        .catch(error => {
          alert(error);
          dispatch(uiStopLoading());
        });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then(parsedRes => {
          dispatch(
            authStoreToken(
              'userToken',
              firebase.auth().currentUser.uid
            )
          );
          dispatch(uiStopLoading());
          // console.log(firebase.auth().currentUser);
        })
        .catch(error => {
          alert(error);
          dispatch(uiStopLoading());
        });
    }
  };
};
export const tryResetPassword = (email) => {
  return dispatch => {
    dispatch(uiStartLoading());
    firebase.auth().sendPasswordResetEmail(email)
    .then(function (user) {
      dispatch(uiStopLoading());
      alert('Please check your email and go back to login screen.')
    }).catch(function (e) {
      alert(e)
      dispatch(uiStopLoading());
    })

  };
};

export const authStoreToken = (token, userId) => {
  return dispatch => {
    dispatch(authSetToken(token, userId));
    AsyncStorage.setItem("ap:auth:token", token);
    AsyncStorage.setItem("ap:auth:userId", userId);
  };
};

export const authSetToken = (token, userId) => {
  return {
    type: AUTH_SET_TOKEN,
    token: token,
    userId: userId
  };
};