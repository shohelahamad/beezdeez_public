import {ADD_NOTE, DELETE_NOTE, SET_NOTES} from './actionTypes'
import { uiStartLoading, uiStopLoading } from './index';
import axios from 'axios';
export const addNote = (noteHeading, noteDescribtion, catagory, eventId) =>{

    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://beezdeez-791a4.firebaseio.com/notes.json", {
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
                dispatch(getNotes());
                dispatch(uiStopLoading());
            });
        };
    };

export const deleteNote = () =>{
    return{
        type: DELETE_NOTE,
        noteKey: key
    };
};
export const getNotes = () => {
    return dispatch => {
        fetch("https://beezdeez-791a4.firebaseio.com/notes/.json")
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
            const notes = [];
            for (let key in parsedRes) {
                notes.push({
                    ...parsedRes[key],
                    key: key
                });
            }
            dispatch(setNotes(notes));
        });
    };
};
export const setNotes = notes => {
    return {
        type: SET_NOTES,
        notes: notes
    };
};