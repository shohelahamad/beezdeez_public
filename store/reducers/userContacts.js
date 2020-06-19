import { LOAD_CONTACTS, DELETE_CONTACT } from '../actions/actionTypes'
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
        case DELETE_CONTACT:
            return {
                ...state,
                userContacts: state.userContacts.filter(userContact => {
                    return userContact.id !== action.contactKey;
                })
            };
        default:
            return state;
    }

};
export default reducer;