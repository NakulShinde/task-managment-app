
import {getTaskDetailsAPI, updateTaskDetailsAPI} from './../services/APIService'
import {tasksIsLoading, tasksHasErrored} from './TaskListActions'

export function taskDetailsData(item) {
    return {type: 'TASK_DETAILS_DATA_SUCCESS', item};
}

export function fetchTaskDetails(id) {
    return (dispatch) => {
        dispatch(tasksIsLoading(true));

        getTaskDetailsAPI(id).then((response) => {
                dispatch(tasksHasErrored(false));
                dispatch(tasksIsLoading(false));
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((item) => dispatch(taskDetailsData(item)))
            .catch(() => dispatch(tasksHasErrored(true)));
    };
}
export function updateTaskDetails(task) {
    return (dispatch) => {
        dispatch(tasksIsLoading(true));

        updateTaskDetailsAPI(task).then((response) => {
                dispatch(tasksHasErrored(false));
                dispatch(tasksIsLoading(false));    
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((item) => dispatch(taskDetailsData(task)))
            .catch(() => dispatch(tasksHasErrored(true)));
    };
}
