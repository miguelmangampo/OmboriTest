import { 
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_ERROR
} from '../common/constants';
import { getUsers } from '../services/UsersService'

export const loadUsers = (pageNo = 1, users = []) => {
    return async(dispatch) => {
        dispatch({ type: GET_USERS });
        try {
            let result = await getUsers(pageNo);
            let totalPages = result ? result.total_pages: 0;
            let userList = result ? result.data : [];
            users = users.concat(userList);

            dispatch({ type: GET_USERS_SUCCESS, users, totalPages, pageNo });
        } catch (error) {
            dispatch({ type: GET_USERS_ERROR, error });
        }
    }
}