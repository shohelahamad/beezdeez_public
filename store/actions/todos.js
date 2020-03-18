import {ADD_TODO,SET_TODOS, DELETE_TODO, DONE_TODO, UPDATE_TODO_DUEDATE, UPDATE_TODO_PRIORITY} from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
export const addTodo = (todoTitle,todoDescribtion,priority,dueDate,eventId,isDone,userId,token) =>{
   
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://beezdeez-791a4.firebaseio.com/todos/"+userId+".json?auth="+ token, {
            method: 'POST',
            body: JSON.stringify({ 
            todoTitle: todoTitle,
            todoDescribtion: todoDescribtion,
            priority: priority,
            dueDate: dueDate,
            eventId: eventId,
            isDone: isDone
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
                dispatch(getTodos(userId,token));
                dispatch(uiStopLoading());
            });
        };
};
export const getTodos = (userId,token) => {
    return dispatch => {
        fetch("https://beezdeez-791a4.firebaseio.com/todos/"+userId+"/.json?auth="+ token)
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
            const todos = [];
            for (let key in parsedRes) {
                todos.push({
                    ...parsedRes[key],
                    key: key
                });
            }
            dispatch(setTodos(todos));
        });
    };
};
export const setTodos = todos => {
    return {
        type: SET_TODOS,
        todos: todos
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