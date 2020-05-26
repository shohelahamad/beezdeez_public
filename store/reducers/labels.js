import { SET_LABELS, SET_DELETE_LABEL } from '../actions/actionTypes'
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
        case SET_DELETE_LABEL:
            return {
                ...state,
                labels: state.labels.filter(label => {
                return label.key !== action.labelKey;
                })
            };
        default:
            return state;
    }

};
export default reducer;