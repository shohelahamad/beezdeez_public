import { ADD_TODO, DELETE_TODO, DONE_TODO, UPDATE_TODO_DUEDATE, UPDATE_TODO_PRIORITY, SET_TODOS } from '../actions/actionTypes'
const initialState ={
    todos: [],
};
const reducer = (state = initialState, action) =>{
    switch (action.type) {
        // case ADD_TODO:
        // return {
        //     ...state,
        //     todos: state.todos.concat({
        //       key: Math.random().toString(),
        //       name: action.placeName,
        //       todoTitle: action.todoTitle,
        //       todoDescribtion: action.todoDescribtion,
        //       priority: action.priority,
        //       dueDate: action.dueDate,
        //       eventId: action.eventId,
        //       isDone: action.isDone
        //     })
        //   };
        case SET_TODOS:
        return {
        ...state,
        todos: action.todos
        };
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => {
                return todo.key !== state.selectedTodo.key;
                }),
                selectedTodo: null
            };
        case DONE_TODO:
        return {
            ...state,
            todos: state.todos.map(todo =>{
                return todo.key === action.todoKey?{...todo,isDone : action.isDone} : todo
            }),
            selectedTodo: null
        };
        case UPDATE_TODO_DUEDATE:
        return {
            ...state,
            todos: state.todos.map(todo =>{
                return todo.key === action.todoKey?{...todo,dueDate : action.newDueDate} : todo
            }),
        };
        case UPDATE_TODO_PRIORITY:
        return {
            ...state,
            todos: state.todos.map(todo =>{
                return todo.key === action.todoKey?{...todo,priority : action.newPriority} : todo
            }),
        };
        // return state.todos.map(todo =>(todo.key === action.todoKey?{...todo,isDone : !todo.isDone} : todo))
        default:
            return state;
    }

};
export default reducer;