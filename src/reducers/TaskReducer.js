import {PAGE_LIMIT} from "../utils/constants";

const defaultState = {
    isLoading: true,
    tasks: [],
    currentPage: 1,
    currentPageTasks: []
}

const getcurrentPageTasks = (tasks, currentPage) => {
    let highIndex = (tasks.length < PAGE_LIMIT)
        ? tasks.length
        : (currentPage + 1) * PAGE_LIMIT;

    return [...tasks.slice(currentPage * PAGE_LIMIT, highIndex)];
}

const orderByDueDate = (tasks) => {
    return tasks.sort((firstTask, secTask) => {
        return firstTask.dueDate - secTask.dueDate
    });
}
const orderByPriority = (tasks) => {
    return tasks.sort((firstTask, secTask) => {
        return secTask.priority - firstTask.priority
    });
}

const orderByDueDateAndPriority = (tasks) => {
    return orderByPriority(orderByDueDate(tasks));
}

export default function (state = defaultState, action) {
    let orderBy = null;
    switch (action.type) {
        case 'FETCH_TASKLIST_DATA':
            return Object.assign(state, {isLoading: true});
        case 'SET_TASKLIST_DATA':

            orderBy = orderByDueDateAndPriority(action.payload);

            return Object.assign({}, {
                isLoading: false,
                currentPage: 1,
                tasks: [...orderBy],
                currentPageTasks: getcurrentPageTasks(orderBy, 1)
            });
            
            case 'UPDATE_TASKLIST_DATA':
            
            orderBy = orderByDueDateAndPriority(...state.tasks);
    
            return {
                isLoading: false,
                tasks: [...orderBy]
            }
        case 'ERROR_TASKLIST_DATA':
            return {
                isLoading: false,
                error: {
                    ...action.payload
                }
            }
        case 'PAGINATION_PAGE_UPDATE':
            return Object.assign({}, {
                isLoading: false,
                currentPage: action.payload,
                tasks: [...state.tasks],
                currentPageTasks: getcurrentPageTasks(state.tasks, action.payload)
            });
        default:
            return state;
    }
}