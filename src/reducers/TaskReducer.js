
import {orderByDueDateAndPriority} from './../utils/index'

export function tasksHasErrored(state = false, action) {
    switch (action.type) {
        case 'TASKS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function tasksIsLoading(state = false, action) {
    switch (action.type) {
        case 'TASKS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function currentPage(state = 1, action) {
    switch (action.type) {
        case 'CHANGE_CURRENT_PAGE':
            return action.newPage;
        default:
            return state;
    }
}

export function tasksSuccess(state = [], action) {

    switch (action.type) {
        case 'TASKS_FETCH_DATA_SUCCESS':

            let orderBy = orderByDueDateAndPriority(action.items);
            return [...orderBy];
        default:
            return state;
    }
}