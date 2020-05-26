import { SET_UPDATES_LABEL,SET_DELETE_LABEL, SET_LABELS } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
export const addLabel = (userId, labelTitle, labelColor) => {

    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://beezdeez-791a4.firebaseio.com/" + userId + "/labels.json", {
            method: 'POST',
            body: JSON.stringify({
                labelTitle: labelTitle,
                labelColor: labelColor
            }),
        })
            .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                // console.log(parsedRes);
                dispatch(getLabels(userId));
                dispatch(uiStopLoading());
            });
    };
};
export const getLabels = (userId) => {
    console.log("Get labels called and the user ID is" + userId)
    return dispatch => {
        fetch("https://beezdeez-791a4.firebaseio.com/" + userId + "/labels/.json")
            .catch(err => {
                alert("Something went wrong, sorry :/");
                // console.log(err);
            })
            .then(res => res.json())
            .then(parsedRes => {
                const labels = [];
                for (let key in parsedRes) {
                    labels.push({
                        ...parsedRes[key],
                        key: key
                    });
                }
                dispatch(setLabels(labels));
            });
    };
};
export const updateLabel = (userId, labelKey, labelTitle, labelColor) => {
    return dispatch => {
        fetch("https://beezdeez-791a4.firebaseio.com/" + userId + "/labels/" + labelKey + ".json?", {
            method: 'PATCH',
            body: JSON.stringify({
                labelColor: labelColor,
                labelTitle: labelTitle,
            }),
        })
            .catch(err => {
                // console.log(err);
                alert("Something went wrong, please try again!");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setUpdatedLabel(labelKey, labelTitle, labelColor));
                dispatch(uiStopLoading());
            });
    };
};
export const deleteLabel = (userId, labelKey) => {
    return dispatch => {
        fetch("https://beezdeez-791a4.firebaseio.com/" + userId + "/labels/" + labelKey + ".json?", {
            method: 'DELETE'
        })
            .catch(err => {
                alert("Something went wrong, please try again!");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                // console.log(parsedRes);
                dispatch(setDeleteLabel(labelKey));
                dispatch(uiStopLoading());
            });
    };
};
export const setUpdatedLabel = (labelKey, labelTitle, labelColor) => {
    return {
        type: SET_UPDATES_LABEL,
        labelKey: labelKey,
        labelTitle: labelTitle,
        labelColor: labelColor,
    };
};
export const setDeleteLabel = (labelKey) => {
    return {
        type: SET_DELETE_LABEL,
        labelKey: labelKey
    };
};
export const setLabels = labels => {
    return {
        type: SET_LABELS,
        labels: labels
    };
};
