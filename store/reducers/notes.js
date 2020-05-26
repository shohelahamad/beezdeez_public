import { SET_DELETE_NOTE, DELETE_NOTE, SET_NOTES, SET_UPDATES_NOTE } from '../actions/actionTypes';

const initialState = {
    notes: [],
};

const reducer = (state = initialState, action) => {
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
        case SET_UPDATES_NOTE:
            return {
                ...state,
                notes: state.notes.map(note => {
                    return note.key === action.noteKey ? {
                        ...note, noteHeading: action.noteHeading, noteDescribtion: action.noteDescribtion,
                        eventId: action.eventId
                    } : note
                })
            };
            case SET_DELETE_NOTE:
                return {
                    ...state,
                    notes: state.notes.filter(note => {
                    return note.key !== action.noteKey;
                    })
                };
        default:
            return state;
    }

};
export default reducer;