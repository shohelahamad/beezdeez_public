import { SET_WELCOME_MSG, BASE_URL} from './actionTypes';
import axios from 'axios';

let baseUrl = BASE_URL;
let url = baseUrl+'/lokalapp.json';
let username = 'admin@example.com';
let password = 'admin2019!?';

export const getWelcomeMsg = () => {
    return dispatch => {
        axios.
            get(url, {
                auth: {
                username: username,
                password: password
                }
            }).catch(err => {
            alert("Etwas ist schief gelaufen, bitte den Kundendienst anrufen.");
            console.log(err);
        })
        .then(parsedRes => {
            // console.log(parsedRes);
            const welcomeMsg = [];
            for (let key in parsedRes) {
                welcomeMsg.push({
                    ...parsedRes[key],
                    key: key
                });
            }
            dispatch(setWelcomrMsg(welcomeMsg));
        });
    };
};
export const setWelcomrMsg = welcomeMsg => {
    return {
        type: SET_WELCOME_MSG,
        welcomeMsg: welcomeMsg
    };
};