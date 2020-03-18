import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName,todoTitle,todoDescribtion,priority,dueDate,eventId) => {
    return {
        type: ADD_PLACE,
        placeName: placeName,
        todoTitle: todoTitle,
        todoDescribtion: todoDescribtion,
        priority: priority,
        dueDate: dueDate,
        eventId: eventId
    };
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
