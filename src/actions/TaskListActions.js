import {getTasksList} from './../services/APIService'

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

        getTasksList().then((response) => {
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