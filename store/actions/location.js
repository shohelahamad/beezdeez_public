import { SET_LOCATION, GET_AREA_LIST, SET_AREA_LIST, SET_LOCATION_REGIO_CODE, SET_LOCATION_REGIO, BASE_URL} from './actionTypes';
import axios from 'axios';

let baseUrl = BASE_URL;
let urlgetAreaList = baseUrl+'/orte.json?';
let urlgetRegio = baseUrl+'/loading.json?';
let username = 'admin@example.com';
let password = 'admin2019!?';

export const getAreaList = (userLocation) => {
    return dispatch => {
        dispatch(setLocation(userLocation));
        console.log(urlgetAreaList+"lat="+userLocation.coords.latitude+"&log="+userLocation.coords.longitude+"&offset=0&limit=10");
        axios.
            get(urlgetAreaList+"lat="+userLocation.coords.latitude+"&log="+userLocation.coords.longitude+"&offset=0&limit=10", {
                auth: {
                username: username,
                password: password
                }
            }).catch(err => {
            // alert("Etwas ist schief gelaufen, bitte den Kundendienst anrufen.");
            console.log(err);
        })
        .then(parsedRes => {
            // console.log(parsedRes);
            const areaList = [];
            for (let key in parsedRes) {
                areaList.push({
                    ...parsedRes[key],
                    key: key
                });
            }
            dispatch(setAreaList(areaList));
        });
    };
};
export const getLocationRegio = (location_regio_code) => {
    return dispatch => {
        axios.
            get(urlgetRegio+"location_regio_code="+location_regio_code, {
                auth: {
                username: username,
                password: password
                }
            }).catch(err => {
            // alert("Etwas ist schief gelaufen, bitte den Kundendienst anrufen.");
            console.log(err);
        })
        .then(parsedRes => {
            // console.log(parsedRes);
            const locationRegio = [];
            for (let key in parsedRes) {
                locationRegio.push({
                    ...parsedRes[key],
                    key: key
                });
            }
            dispatch(setLocationRegio(locationRegio));
            dispatch(setSelectedlocation_regio_code(location_regio_code));
            
        });
    };
};
export const setLocationRegio = locationRegio => {
    return {
        type: SET_LOCATION_REGIO,
        locationRegio: locationRegio[0]
    };
};
export const setAreaList = areaList => {
    return {
        type: SET_AREA_LIST,
        areaList: areaList[0].hits
    };
};
export const setSelectedlocation_regio_code = (location_regio_code) => {
    return {
        type: SET_LOCATION_REGIO_CODE,
        location_regio_code: location_regio_code
    };
};
export const setLocation = (userLocation) => {
    console.log(userLocation);
    return {
        type: SET_LOCATION,
        userLocation: userLocation
    };
};