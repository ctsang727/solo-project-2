const GET_TASK = 'task/GET_TASK'
const GET_TASKS = 'tasks/GET_TASKS'
const NEW_TASK = 'tasks/NEW_TASK'
const DEL_TASK = 'task/DEL_TASK'
const EDIT_TASK = 'task/EDIT_TASK'

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

const editTask = task => ({
    type: EDIT_TASK,
    task
})

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
    console.log('INSIDE GET ALL TASKS THUNK', res)

    if (res.ok) {
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


    if (res.ok) {
        console.log('RES IS OK')
        const data = await res.json()
        dispatch(newTask(data))
        return data
    }
}

export const editTaskThunk = (task) => async dispatch => {
    const res = await fetch('/api/tasks/edit', {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(editTask(data))
        return data
    }
}

export const deleteTaskThunk = taskId => async dispatch => {
    console.log('top of delete thunk')
    const res = await fetch(`/api/tasks/delete/${taskId}`, {
        method: 'DELETE',
        
    })
    
    if (res.ok) {
        console.log('delete res is ok')
        const data = await res.json();
        dispatch(deleteTask(data));
        return data
    }
}

const taskReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        default:
            return state

        case GET_TASKS:
            newState = { ...state };
            action.tasks.tasks?.filter(task => {
                newState[task.id] = task;
            })

            return newState;

        case GET_TASK:
            let thisState = {};
            thisState[action.task.id] = action.task
            return thisState

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
            console.log("NEWSTATESTSTST", newState)
            console.log('NEXT NEWSTATETET', newState[action.taskId.tasks])
            delete newState[action.taskId.tasks];
            return newState;
            //return { todos: state.todos.filter((todo) => todo.id !== action.payload)}
        
    }

}

export default taskReducer