import {getTasksListAPI, postponeTaskAPI, resolveTaskAPI} from './../services/APIService'

export const changeCurrentPage = (newPage) => {
    return {type: 'CHANGE_CURRENT_PAGE', newPage}
}

export function tasksHasErrored(bool) {
    return {type: 'TASKS_HAS_ERRORED', hasErrored: bool};
}

export function tasksIsLoading(bool) {
    return {type: 'TASKS_IS_LOADING', isLoading: bool};
}

export function tasksFetchSuccess(items) {
    return {type: 'TASKS_FETCH_DATA_SUCCESS', items};
}

export function fetchTasksData() {
    return (dispatch) => {
        dispatch(tasksIsLoading(true));

        getTasksListAPI().then((response) => {
                dispatch(tasksIsLoading(false));
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(tasksFetchSuccess(items)))
            .catch(() => dispatch(tasksHasErrored(true)));
    };
}

export function postponeTask(taskId){
    return (dispatch) => {
        dispatch(tasksIsLoading(true));

        postponeTaskAPI(taskId).then((response) => {
                dispatch(tasksIsLoading(false));
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then(() => dispatch(fetchTasksData()))
            .catch(() => dispatch(tasksHasErrored(true)));
    };
}
export function resolveTask(taskId){
    return (dispatch) => {
        dispatch(tasksIsLoading(true));

        resolveTaskAPI(taskId).then((response) => {
                dispatch(tasksIsLoading(false));
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then(() => dispatch(fetchTasksData()))
            .catch(() => dispatch(tasksHasErrored(true)));
    };
}