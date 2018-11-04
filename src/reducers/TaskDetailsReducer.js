
export function taskDetailsData(state = [], action) {

    switch (action.type) {
        case 'TASK_DETAILS_DATA_SUCCESS':
            return {...action.item};
        default:
            return state;
    }
}