
export const getTasksList = () => {
    return fetch('/task/list').then(response => {
        if(response.status !== 200){
            let err = {
                error: true,
                statusText: response.statusText,
                status: response.status 
            }
            return err;
        }
        return response.json()
    })
}
