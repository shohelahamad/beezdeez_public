import { LOAD_CONTACTS } from '../actions/actionTypes'
const initialState ={
    userContacts: [],
};
const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case LOAD_CONTACTS:
        return {
        ...state,
        userContacts: action.userContacts
        };
        default:
            return state;
    }

};
export default reducer;