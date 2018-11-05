
export const getTasksListAPI = () => {
    return fetch('/task/list')
}

export const postponeTaskAPI = (taskId, minute) => {
    let URL = `/task/${taskId}/postpone`
    return fetch(URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(1)
    })
}
export const resolveTaskAPI = (taskId) => {
    let URL = `/task/${taskId}/resolve`
    return fetch(URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    })
}

export const getTaskDetailsAPI = (taskId) => {
    let URL = `/task/${taskId}`
    return fetch(URL)
}

export const updateTaskDetailsAPI = (task) => {
    let URL = `/task/${task.uuid}`
    return fetch(URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(task)
    })
}

export const addTaskDetailsAPI = (taskId) => {
    let URL = `/task/${taskId}`
    return fetch(URL)
}

