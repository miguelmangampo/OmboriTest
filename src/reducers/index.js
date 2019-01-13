import { combineReducers } from 'redux';
import UsersReducer from './UsersReducer';

// Combine all the reducers
const rootReducer = combineReducers({
    UsersReducer
})
 
export default rootReducer;