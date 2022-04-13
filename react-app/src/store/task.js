const GET_TASK = 'task/GET_TASK'
const GET_TASKS = 'tasks/GET_TASKS'
const NEW_TASK = 'tasks/NEW_TASK'
const DEL_TASK = 'task/DEL_TASK'

const getTask = task => ({
    type: GET_TASK,
    task
})

const newTask = task => ({
    type: NEW_TASK,
    task 
})

const getAllTasks = tasks => ({
    type: GET_TASKS,
    tasks
})

export const getAllTasksThunk = () => async dispatch => {
    const res = await fetch('/api/tasks')
    console.log('INSIDE GET ALL TASKS THUNK', res)

    if (res.ok){
        console.log('RES IS OK')
        const data = await res.json()
        dispatch(getAllTasks(data))
        return data
    }
}

const taskReducer = (state = {}, action) => {
    let newState;
    switch (action.type){
        default:
            return state
        
        case GET_TASKS:
            newState = { ...state };
            action.tasks.tasks?.forEach(task => {
                newState[task.id] = task; 
              })
           
            return newState;
    }
}

export default taskReducer