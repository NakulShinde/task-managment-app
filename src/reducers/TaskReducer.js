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
    let orderBy
    switch (action.type) {
        case 'TASKS_FETCH_DATA_SUCCESS':

            orderBy = orderByDueDateAndPriority(action.items);
            return [...orderBy];

        case 'TASKS_RECEIVED_WEB_SOCKET':
            orderBy = orderByDueDateAndPriority([
                ...state,
                action.item
            ]);

            return [...orderBy];
        default:
            return state;
    }
}