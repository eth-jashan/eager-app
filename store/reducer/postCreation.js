import { GET_CATEGORY } from "../actions/postCreation";

const initialState = {
  category: null
};

export default(state = initialState,action) => {
    switch(action.type){
        case GET_CATEGORY:
            return{
                ...state,
                category:action.category
            }
        default:
            return state
    }
}