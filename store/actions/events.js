import {ADD_EVENT, SET_EVENTS, DELETE_EVENT, SELECT_EVENT, DESELECT_EVENT} from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
export const addEventOld = (eventTitle, eventDescription, eventMembers, eventTodos, eventNotes, documentList, startDateTime, endTime) =>{
    return {
        type: ADD_EVENT,
        eventTitle: eventTitle,
        eventDescription: eventDescription,
        eventMembers: eventMembers,
        eventTodos: eventTodos,
        eventNotes: eventNotes,
        documentList: documentList,
        startDateTime: startDateTime,
        endTime: endTime
    };
};
export const addEvent = (eventTitle, eventDescription, eventMembers, eventTodos, eventNotes, documentList, startDateTime, endTime) =>{
   
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://beezdeez-791a4.firebaseio.com/events.json", {
            method: 'POST',
            body: JSON.stringify({ 
            eventTitle: eventTitle,
            eventDescription: eventDescription,
            eventMembers: eventMembers,
            eventTodos: eventTodos,
            eventNotes: eventNotes,
            documentList: documentList,
            startDateTime: startDateTime,
            endTime: endTime
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
                dispatch(getEvents());
                dispatch(uiStopLoading());
            });
        };
};
export const getEvents = () => {
    return dispatch => {
        fetch("https://beezdeez-791a4.firebaseio.com/events/.json")
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
            const events = [];
            for (let key in parsedRes) {
                events.push({
                    ...parsedRes[key],
                    key: key
                });
            }
            dispatch(setEvents(events));
        });
    };
};
export const setEvents = events => {
    return {
        type: SET_EVENTS,
        events: events
    };
};
export const deleteEvent = () =>{
    return{
        type: DELETE_EVENT
    };
};

export const selectEvent = (key) =>{
    return{
        type: SELECT_EVENT,
        eventKey: key
    };
};
export const deselectEvent = () =>{
    return{
        type: DESELECT_EVENT
    };
};