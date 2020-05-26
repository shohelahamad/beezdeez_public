import { SET_LABELS, SET_DELETE_LABEL, SET_UPDATES_LABEL } from '../actions/actionTypes'
const initialState = {
    labels: [],
};
const reducer = (state = initialState, action) => {
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
        case SET_UPDATES_LABEL:
            return {
                ...state,
                labels: state.labels.map(label => {
                    return label.key === action.labelKey ? {
                        ...label, labelTitle: action.labelTitle,
                        labelColor: action.labelColor,
                    } : label
                }),
                selectedlabel: null
            };
        default:
            return state;
    }

};
export default reducer;