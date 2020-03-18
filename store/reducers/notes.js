import { ADD_NOTE, DELETE_NOTE, SET_NOTES} from '../actions/actionTypes';

const initialState ={
    notes: [],
};

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_NOTES:
        return {
        ...state,
        notes: action.notes
        };
        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => {
                return note.key !== state.selectedNote.key;
                })
            };
        default:
            return state;
    }

};
export default reducer;