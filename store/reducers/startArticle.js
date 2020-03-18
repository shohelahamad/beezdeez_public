import { SET_START_ARTICLE_LIST } from '../actions/actionTypes'
const initialState ={
    startArticleList: [],
};
const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_START_ARTICLE_LIST:
        return {
        ...state,
        startArticleList: action.articleList
        };
        default:
            return state;
    }

};
export default reducer;