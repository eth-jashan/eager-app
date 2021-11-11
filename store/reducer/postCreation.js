import { GET_ALL_POST, GET_CATEGORY, GET_PROFILE_DETAILS } from "../actions/postCreation";

const initialState = {
  category: null,
  allCategories:null,
  userdetails:{},
  posts: [],
};

export default(state = initialState, action) => {
    switch(action.type){
        case GET_CATEGORY:
            return {
              ...state,
              category: action.category,
              allCategories: action.allCat,
            };
        case GET_PROFILE_DETAILS:
          return {
            ...state,
            userdetails: action.details,
          };
        case GET_ALL_POST:
          return {
            ...state,
            posts: action.posts
          };
        default:
            return state;
    }
}