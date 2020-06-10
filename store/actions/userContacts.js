import {LOAD_CONTACTS} from './actionTypes';


export const setUserContact = (userContacts,userId) =>{
  return dispatch => {
    dispatch(loadContacts(userContacts));
      // dispatch(uiStartLoading());
      // console.log("I am trying to set constacts"+ userContacts);
      // fetch("https://beezdeez-791a4.firebaseio.com/usercontacts/"+userId+".json?", {
      //     method: 'POST',
      //     body: JSON.stringify({ 
      //       userContacts: userContacts
      //     }),
      //     })
      //     .catch(err => {
      //         console.log(err);
      //         alert("Something went wrong, please try again!");
      //         // dispatch(uiStopLoading());
      //     })
      //     .then(res => res.json())
      //     .then(parsedRes => {
      //         console.log(parsedRes);
      //         dispatch(loadContacts(userContacts));
      //         // dispatch(uiStopLoading());
      //     });
      };
};
export const loadContacts = userContacts => {
  return {
      type: LOAD_CONTACTS,
      userContacts: userContacts
  };
};