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

export const getAllTasksThunk = (userId) => async dispatch => {
    const res = await fetch(`/api/tasks/${userId}`)
    console.log('INSIDE GET ALL TASKS THUNK', res)

    if (res.ok){
        console.log('RES IS OK')
        const data = await res.json()
        dispatch(getAllTasks(data))
        return data
    }
}

export const createTaskThunk = (task) => async dispatch => {
    const res = await fetch('/api/tasks/new', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    });


    if (res.ok){
        console.log('RES IS OK')
        const data = await res.json()
        dispatch(newTask(data))
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
        
        case NEW_TASK:
            newState = { ...state };
            newState[action.task.id] = action.task
            return newState;
            
    }
}

export default taskReducer