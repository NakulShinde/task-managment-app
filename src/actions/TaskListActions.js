export const fetchTasksList = () => {
    return {type: 'FETCH_TASKLIST_DATA', payload: {}}
};

export const setTasksList = (data) => {
    return {type: 'SET_TASKLIST_DATA', payload: data}
};

export const updateTasksList = (data) => {
    return {type: 'UPDATE_TASKLIST_DATA', payload: data}
};

export const errorTasksList = (errorData) => {
    return {type: 'ERROR_TASKLIST_DATA', payload: errorData}
};

export const setPaginationPage = (newPage) => {
    return {type: 'PAGINATION_PAGE_UPDATE', payload: newPage}
}
