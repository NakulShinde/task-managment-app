import {combineReducers} from 'redux';
import {tasksIsLoading, tasksHasErrored, tasksSuccess, currentPage} from './TaskReducer'

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const AllReducers = combineReducers({
    tasksIsLoading: tasksIsLoading,
    tasksSuccess: tasksSuccess,
    tasksHasErrored: tasksHasErrored,
    currentPage: currentPage
});

export default AllReducers;