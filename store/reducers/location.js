import { SET_AREA_LIST, SET_LOCATION, SET_LOCATION_REGIO_CODE, SET_LOCATION_REGIO } from '../actions/actionTypes'
const initialState ={
    areaList: [],
    userLocation: [],
    location_regio_code: '',
    locationRegio: []

};
const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_LOCATION:
        return {
        ...state,
        userLocation: action.userLocation
        };
        case SET_AREA_LIST:
        return {
        ...state,
        areaList: action.areaList
        };
        case SET_LOCATION_REGIO_CODE:
        return {
        ...state,
        location_regio_code: action.location_regio_code
        };
        case SET_LOCATION_REGIO:
        return {
        ...state,
        locationRegio: action.locationRegio
        };
        default:
            return state;
    }

};
export default reducer;