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
          console.log(firebase.auth().currentUser);
        })
        .catch(error => console.log(error));
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
          console.log(firebase.auth().currentUser);
        })
        .catch(error => console.log(error));
    }
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

// export const authGetToken = () => {
//   return (dispatch, getState) => {
//     const promise = new Promise((resolve, reject) => {
//       const token = getState().auth.token;
//       const expiryDate = getState().auth.expiryDate;
//       if (!token || new Date(expiryDate) <= new Date()) {
//         let fetchedToken;
//         AsyncStorage.getItem("ap:auth:token")
//           .catch(err => reject())
//           .then(tokenFromStorage => {
//             fetchedToken = tokenFromStorage;
//             if (!tokenFromStorage) {
//               reject();
//               return;
//             }
//             return AsyncStorage.getItem("ap:auth:expiryDate");
//           })
//           .then(expiryDate => {
//             const parsedExpiryDate = new Date(parseInt(expiryDate));
//             const now = new Date();
//             if (parsedExpiryDate > now) {
//               dispatch(authSetToken(fetchedToken));
//               resolve(fetchedToken);
//             } else {
//               reject();
//             }
//           })
//           .catch(err => reject());
//       } else {
//         resolve(token);
//       }
//     });
//     return promise
//       .catch(err => {
//         return AsyncStorage.getItem("ap:auth:refreshToken")
//           .then(refreshToken => {
//             return fetch(
//               "https://securetoken.googleapis.com/v1/token?key=" + API_KEY,
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/x-www-form-urlencoded"
//                 },
//                 body: "grant_type=refresh_token&refresh_token=" + refreshToken
//               }
//             );
//           })
//           .then(res => res.json())
//           .then(parsedRes => {
//             if (parsedRes.id_token) {
//               console.log("Refresh token worked!");
//               dispatch(
//                 authStoreToken(
//                   parsedRes.id_token,
//                   parsedRes.expires_in,
//                   parsedRes.refresh_token
//                 )
//               );
//               return parsedRes.id_token;
//             } else {
//               dispatch(authClearStorage());
//             }
//           });
//       })
//       .then(token => {
//         if (!token) {
//           throw new Error();
//         } else {
//           return token;
//         }
//       });
//   };
// };

// export const authAutoSignIn = () => {
//   return dispatch => {
//     dispatch(authGetToken())
//       .then(token => {
//         startMainTabs();
//       })
//       .catch(err => console.log("Failed to fetch token!"));
//   };
// };

// export const authClearStorage = () => {
//   return dispatch => {
//     AsyncStorage.removeItem("ap:auth:token");
//     AsyncStorage.removeItem("ap:auth:expiryDate");
//     return AsyncStorage.removeItem("ap:auth:refreshToken");
//   };
// };

// export const authLogout = () => {
//   return dispatch => {
//     dispatch(authClearStorage()).then(() => {
//       App();
//     });
//     dispatch(authRemoveToken());
//   };
// };

// export const authRemoveToken = () => {
//   return {
//     type: AUTH_REMOVE_TOKEN
//   };
// };
