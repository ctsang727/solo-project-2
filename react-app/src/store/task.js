//add ending / to api fetch routes -Paul
//fixes some heroku bugs maybe
const GET_TASK = 'task/GET_TASK'
const GET_TASKS = 'tasks/GET_TASKS'
const GET_TODAY_TASKS = 'tasks/GET_TODAY_TASKS'
const NEW_TASK = 'tasks/NEW_TASK'
const DEL_TASK = 'task/DEL_TASK'
const CLEAR_ALL_TASKS = 'task/CLEAR_ALL_TASKS'
//const GET_UPCOMING = 'task/GET_UPCOMING'
// const EDIT_TASK = 'task/EDIT_TASK'

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

export const clearTasks = () => ({
    type: CLEAR_ALL_TASKS
})

export const getTodayTasks = today_tasks => ({
    type: GET_TODAY_TASKS,
    payload: today_tasks
})

// export const getUpcoming = upcoming => ({
//     type: GET_UPCOMING,
//     payload: upcoming 
// })

// const editTask = task => ({
//     type: EDIT_TASK,
//     task
// })

const deleteTask = taskId => ({
    type: DEL_TASK,
    taskId
})

export const getTaskThunk = (taskId) => async dispatch => {
    const res = await fetch(`/api/tasks/specific/${taskId}`)
    console.log('ABOVE THE IF STATEMENT \n\n\n\n\n\n')
    if (res.ok) {
        const data = await res.json()
        dispatch(getTask(data))
        return data
    }
}

export const getAllTasksThunk = (userId) => async dispatch => {
    console.log('first', userId)
    const res = await fetch(`/api/tasks/${userId}`)
    

    if (res.ok) {
        //console.log('RES', res)
        const data = await res.json()
        //console.log('GET ALL DATA \n\n\n\n\n', data)
        dispatch(getAllTasks(data))
        return data
    }
}

export const getTodayTasksThunk = (userId) => async dispatch => {
    const res = await fetch(`/api/tasks/today/${userId}`)

    if (res.ok) {
        console.log('res ok', res)
        const data = await res.json()
        dispatch(getTodayTasks(data))
        return data
    }
}

// export const getUpcomingThunk = (userId) => async dispatch => {
//     const res = await fetch(`/api/tasks/upcoming/${userId}`)

//     if (res.ok) {
//         console.log('res ok', res)
//         const data = await res.json()
//         dispatch(getUpcoming(data))
//         return data
//     }
// }

export const createTaskThunk = (task) => async dispatch => {
    console.log('THUNK TASK', JSON.stringify(task))
    const res = await fetch('/api/tasks/new', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    });


    if (res.ok) {
        const data = await res.json()
        dispatch(newTask(data))
        return data
    }
}

export const editTaskThunk = (task) => async dispatch => {
    console.log('EDIT THUNK', task)
    const res = await fetch(`/api/tasks/edit/${task.taskId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(newTask(data))
        return data
    }
}

export const deleteTaskThunk = taskId => async dispatch => {
    const res = await fetch(`/api/tasks/delete/${taskId}`, {
        method: 'DELETE',
        
    })
    
    if (res.ok) {
        const data = await res.json();
        console.log('DATA DELETE TASK THUNK', data)
        dispatch(deleteTask(data));
        return data
    }
}

// reducer based off last group project
const taskReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        

        case GET_TASKS:
            newState = { ...state };
            // console.log('NS', newState)
            // console.log('AT', action.tasks)
            // console.log('ATT', action.tasks.tasks)


            action.tasks.tasks?.forEach(task => {
                console.log('task.id')
                newState[task.id] = task;
                
            })
            // console.log('NNSS', newState)

            return newState;

        case GET_TASK:
            // return {...state,
            // action.task }
            // console.log('first state', state)
            // let thisState = {}
            newState = {...state}
            newState[action.task.id] = action.task 
            return newState

        case GET_TODAY_TASKS:
            let state2={} 
            let newState2 = {}
            newState2 = { ...state2 };
            action.payload.tasks?.forEach(task => {
                newState2[task.id] = task
            })
            return newState2
        
        // case GET_UPCOMING:
        //     let state3={}
        //     let newState3 = {}
        //     newState3 = {...state3}
        //     action.payload.upcoming?.forEach(task => {
        //         newState3[task.id] = task
        //     })
        //     return newState3

        case CLEAR_ALL_TASKS:
            return {}
             

        // case EDIT_TASK:
        //     newState = {...state};
        //     newState[action.task.id] = action.task;
        //     return newState

        case NEW_TASK:
            newState = { ...state };
            newState[action.task.id] = action.task
            return newState;
        
        case DEL_TASK:
            newState = { ...state };
            console.log('!!!!!!', action.taskId)
            delete newState[action.taskId.id];
            return newState;

        default:
            return state
        
    }

}

export default taskReducer
