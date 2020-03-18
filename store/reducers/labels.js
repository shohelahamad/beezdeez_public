import { ADD_TODO, SET_LABELS } from '../actions/actionTypes'
const initialState ={
    labels: [],
};
const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_LABELS:
        return {
        ...state,
        labels: action.labels
        };
        default:
            return state;
    }

};
export default reducer;