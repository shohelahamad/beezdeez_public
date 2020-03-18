import { SET_START_ARTICLE_LIST, BASE_URL} from './actionTypes';
import axios from 'axios';

let baseUrl = BASE_URL;
let url = baseUrl+'/news.json?';
let username = 'admin@example.com';
let password = 'admin2019!?';

export const getStartArticleList = (locationRegionCode) => {
    let reqUrl = url +'location_regio_code='+locationRegionCode+'&n_dummy_articles=5&n_dummy_events=5';
    return dispatch => {
        axios.
            get(reqUrl, {
                auth: {
                username: username,
                password: password
                }
            }).catch(err => {
            alert("Etwas ist schief gelaufen, bitte den Kundendienst anrufen.");
            console.log(err);
        })
        .then(parsedRes => {
            console.log(parsedRes);
            const articleList = [];
            for (let key in parsedRes.data) {
                articleList.push({
                    ...parsedRes.data[key],
                    key: key
                });
            }
            dispatch(setStartArticleList(articleList));
        });
        console.log("I am called on load"+ locationRegionCode);
    };
};
export const setStartArticleList = articleList => {
    return {
        type: SET_START_ARTICLE_LIST,
        articleList: articleList
    };
};