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

export default function (state = defaultState, action) {

    switch (action.type) {
        case 'FETCH_TASKLIST_DATA':
            return Object.assign(state, {isLoading: true});
        case 'SET_TASKLIST_DATA':
            return Object.assign({}, {
                isLoading: false,
                currentPage: 1,
                tasks: [...action.payload],
                currentPageTasks: getcurrentPageTasks(action.payload, 1)
            });

        case 'UPDATE_TASKLIST_DATA':
            return {
                isLoading: false,
                tasks: [
                    ...state,
                    action.payload
                ]
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