import {ADD_LABEL,SET_LABELS} from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
export const addLabel = (userId,labelTitle, labelColor) =>{
   
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://beezdeez-791a4.firebaseio.com/"+userId+"/labels.json", {
            method: 'POST',
            body: JSON.stringify({ 
            labelTitle: labelTitle,
            labelColor: labelColor
            }),
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(getLabels());
                dispatch(uiStopLoading());
            });
        };
};
export const getLabels = (userId) => {
    return dispatch => {
        fetch("https://beezdeez-791a4.firebaseio.com/"+userId+"/labels/.json")
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
            const labels = [];
            for (let key in parsedRes) {
                labels.push({
                    ...parsedRes[key],
                    key: key
                });
            }
            dispatch(setLabels(labels));
        });
    };
};
export const setLabels = labels => {
    return {
        type: SET_LABELS,
        labels: labels
    };
};
