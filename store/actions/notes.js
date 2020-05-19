import { ADD_NOTE, DELETE_NOTE, SET_NOTES } from './actionTypes'
import { uiStartLoading, uiStopLoading } from './index';
import axios from 'axios';
export const addNote = (noteHeading, noteDescribtion, catagory, eventId,userId) => {

    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://beezdeez-791a4.firebaseio.com/notes/" + userId + ".json?", {
            method: 'POST',
            body: JSON.stringify({
                noteHeading: noteHeading,
                noteDescribtion: noteDescribtion,
                catagory: catagory,
                eventId: eventId
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
                dispatch(getNotes(userId));
                dispatch(uiStopLoading());
            });
    };
};

export const deleteNote = () => {
    return {
        type: DELETE_NOTE,
        noteKey: key
    };
};
export const getNotes = (userId) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://beezdeez-791a4.firebaseio.com/notes/" + userId + "/.json?")
            .catch(err => {
                alert("Something went wrong, sorry :/");
                console.log(err);
            })
            .then(res => res.json())
            .then(parsedRes => {
                const nots = [];
                for (let key in parsedRes) {
                    nots.push({
                        ...parsedRes[key],
                        key: key
                    });
                }
                dispatch(setNotes(nots));
                dispatch(uiStopLoading());
            });
    };
};
export const setNotes = notes => {
    return {
        type: SET_NOTES,
        notes: notes
    };
};