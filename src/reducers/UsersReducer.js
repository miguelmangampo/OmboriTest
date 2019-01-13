
import { 
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_ERROR
} from '../common/constants';

const initialState = {
    users: [],
    loading: false,
    currentPage: 1,
    error: null,
    totalPages: 1
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                loading: true
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                currentPage: action.pageNo,
                users: action.users,
                totalPages: action.totalPages
            }
        case GET_USERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}