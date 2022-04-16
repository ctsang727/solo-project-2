//add ending / to api fetch routes -Paul
//fixes some heroku bugs maybe
const GET_TASK = 'task/GET_TASK'
const GET_TASKS = 'tasks/GET_TASKS'
const NEW_TASK = 'tasks/NEW_TASK'
const DEL_TASK = 'task/DEL_TASK'
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

    if (res.ok) {
        const data = await res.json()
        dispatch(getTask(data))
        return data
    }
}

export const getAllTasksThunk = (userId) => async dispatch => {
    const res = await fetch(`/api/tasks/${userId}`)

    if (res.ok) {
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

            action.tasks.tasks?.forEach(task => {
                newState[task.id] = task;
            })

            return newState;

        case GET_TASK:
            // return {...state,
            // action.task }
            // console.log('first state', state)
            // let thisState = {}
            newState = {...state}
            console.log('NEWSTATE REDUCER', newState)
            console.log('ACTION?TASK?ID', action.task.id)
            newState[action.task.id] = action.task 
            console.log('ANYTHING1234568789')
            console.log('NEXTACTIONTASKIDTHING', newState[action.task.id])
            console.log('last??????', action.task)
            console.log('newState', newState)
            return newState
             

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
            delete newState[action.taskId.id];
            return newState;

        default:
            return state
        
    }

}

export default taskReducer

//reducer based off first solo project
// const initialState = {
//     tasks: {}
// }
// const taskReducer = (state = initialState, action) => {
//     switch(action.type) {  
//         case GET_TASKS:
//           const allTasks = {};
//           console.log(initialState)
//           //console.log('ACTION', action)
//           action.tasks.tasks.forEach(task => {
//             allTasks[task.id] = task; 
//           })
//           console.log('ALL TASKS', allTasks)
//           console.log({...state, tasks: allTasks})
//           return allTasks

//         case GET_TASK:
//           // newState[action.business.id] = action.business
//           // return newState
//           return {

//             ...state,
//             [action.task.id]: action.task
            
//           };
//         case NEW_TASK:
//           let newState;
//           newState={...state}
//           newState[action.task.id] = action.task;
//           return newState;
        
//         case EDIT_TASK:
//           return {
//             ...state,
//             [action.task.id]: action.task,
//           };

//         case DEL_TASK:
//           let removeState = {...state}
//           delete removeState[action.taskId.id]
//           return removeState



//         default:
//             return state;
//     }

// }


