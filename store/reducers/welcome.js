import { SET_WELCOME_MSG } from '../actions/actionTypes'
const initialState ={
    welcomeMsg: [],
};
const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_WELCOME_MSG:
        return {
        ...state,
        welcomeMsg: action.welcomeMsg[0]
        };
        default:
            return state;
    }

};
export default reducer;