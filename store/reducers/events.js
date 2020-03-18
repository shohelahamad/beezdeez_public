import { ADD_EVENT, SET_EVENTS, DELETE_EVENT, SELECT_EVENT, DESELECT_EVENT } from '../actions/actionTypes'
const initialState ={
    events: [],
    selectedEvent: null
};
const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case ADD_EVENT:
            return {
                ...state,
                events: state.events.concat({
                key: Math.random().toString(),
                eventTitle: action.eventTitle,
                eventDescription: action.eventDescription,
                eventMembers: action.eventMembers,
                eventTodos: action.eventTodos,
                eventNotes: action.eventNotes,
                documentList: action.documentList,
                startDateTime: action.startDateTime,
                endTime: action.endTime
                })
            };
        case SET_EVENTS:
        return {
        ...state,
        events: action.events
        };
        case DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter(event => {
                return event.key !== state.selectedEvent.key;
                }),
                selectedEvent: null
            };
        case SELECT_EVENT:
            return {
                ...state,
                selectedEvent: state.events.find( event =>{
                return event.key === action.eventKey;
                })
            };
        case DESELECT_EVENT:
            return {
                ...state,
                selectedEvent: null
            };
        default:
            return state;
    }

};
export default reducer;