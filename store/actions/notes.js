import { SET_UPDATES_NOTE, DELETE_NOTE, SET_NOTES, SET_DELETE_NOTE } from './actionTypes'
import { uiStartLoading, uiStopLoading } from './index';
import axios from 'axios';
export const addNote = (noteHeading, noteDescribtion, catagory, eventId, userId) => {

    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://beezdeez-791a4.firebaseio.com/" + userId + "/notes.json?", {
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
export const getNotes = (userId) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://beezdeez-791a4.firebaseio.com/" + userId + "/notes/.json?")
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
export const updateNote = (userId, noteKey, noteHeading, noteDescribtion, catagory, eventId) => {
    return dispatch => {
        fetch("https://beezdeez-791a4.firebaseio.com/" + userId + "/notes/" + noteKey + ".json?", {
            method: 'PATCH',
            body: JSON.stringify({
                noteHeading: noteHeading,
                noteDescribtion: noteDescribtion,
                catagory: catagory,
                eventId: eventId
            }),
        })
            .catch(err => {
                // console.log(err);
                alert("Something went wrong, please try again!");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                // console.log(parsedRes);
                dispatch(setUpdatedNote(noteKey, noteHeading, noteDescribtion, catagory, eventId));
                dispatch(uiStopLoading());
            });
    };
};
export const deleteNote = (userId,noteKey) => {
    console.log(userId,noteKey, "In the action")
    return dispatch => {
        fetch("https://beezdeez-791a4.firebaseio.com/" + userId + "/notes/" + noteKey + ".json?", {
            method: 'DELETE'
        })
            .catch(err => {
                // console.log(err);
                alert("Something went wrong, please try again!");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(setDeleteNote(noteKey));
                dispatch(uiStopLoading());
            });
    };
};
export const setUpdatedNote = (noteKey, noteHeading, noteDescribtion, catagory, eventId) => {
    return {
        type: SET_UPDATES_NOTE,
        noteKey: noteKey,
        noteHeading: noteHeading,
        noteDescribtion: noteDescribtion,
        catagory: catagory,
        eventId: eventId
    };
};
export const setNotes = notes => {
    return {
        type: SET_NOTES,
        notes: notes
    };
};
export const setDeleteNote = (noteKey) => {
    return {
        type: SET_DELETE_NOTE,
        noteKey: noteKey
    };
};