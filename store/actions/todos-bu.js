import {ADD_TODO, DELETE_TODO, DONE_TODO, UPDATE_TODO_DUEDATE, UPDATE_TODO_PRIORITY} from './actionTypes'
export const addTodo = (todoTitle,todoDescribtion,priority,dueDate,eventId,isDone) =>{
    return {
        type: ADD_TODO,
        todoTitle: todoTitle,
        todoDescribtion: todoDescribtion,
        priority: priority,
        dueDate: dueDate,
        eventId: eventId,
        isDone: isDone
    };
};
export const doneTodo = (key) =>{
    return {
        type: DONE_TODO,
        todoKey: key
    };
};
export const updateDueDate = (key,newDueDate) =>{
    return {
        type: UPDATE_TODO_DUEDATE,
        todoKey: key,
        newDueDate: newDueDate
    };
};
export const updatePriority = (key,newPriority) =>{
    return {
        type: UPDATE_TODO_PRIORITY,
        todoKey: key,
        newPriority: newPriority
    };
};
export const deleteTodo = () =>{
    return{
        type: DELETE_TODO,
        placeKey: key
    };
};