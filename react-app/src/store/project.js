// const GET_TASK = 'task/GET_TASK'
const GET_PROJECTS = 'project/GET_PROJECTS'
const NEW_PROJECT = 'project/NEW_PROJECT'
const GET_PROJECT_TASKS = 'project/GET_PROJECT_TASKS'
const DEL_PROJECT = 'project/DEL_PROJECT'

const newProject = project => ({
    type: NEW_PROJECT,
    payload: project 
})

const getAllProjects = projects => ({
    type: GET_PROJECTS,
    payload: projects
})

const getAllProjectTasks = tasks => ({
    type: GET_PROJECT_TASKS,
    payload: tasks
})

const deleteProject = project => ({
    type: DEL_PROJECT,
    payload: project
})

export const createProjectThunk = project => async dispatch => {
    //console.log('inside thunk')
    const res = await fetch('/api/projects/new', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project)
    });

    if (res.ok) {
        console.log('res ok')
        const data = await res.json()
        dispatch(newProject(data))
        return data
    }
}

export const getAllProjectsThunk = (userId) => async dispatch => {
    //console.log('thunk', userId)
    const res = await fetch(`/api/projects/${userId}`)

    if (res.ok) {
        console.log('res is ok')
        const data = await res.json()
        dispatch(getAllProjects(data))
        return data 
    }
}

export const getAllProjectTasksThunk = projectId => async dispatch => {
    const res = await fetch(`/api/projects/tasks/${projectId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(getAllProjectTasks(data))
        return data
    }
}

export const deleteProjectThunk = projectId => async dispatch => {
    console.log('DELETE THIES', projectId)
    const res = await fetch(`/api/projects/delete/${projectId}`, {
        method: 'DELETE',
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(deleteProject(data))
        return data
    }
}

export const editProjectThunk = project => async dispatch => {
    console.log('HERER')
    const res= await fetch(`/api/projects/edit/${project.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(newProject(data))
        return data 
    }
}

const projectReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        default:
            return state

        case NEW_PROJECT:
            newState = { ...state };
            newState[action.payload.id] = action.payload
            return newState;

        case GET_PROJECTS:
            newState = { ...state };
            //console.log(action.payload)
            action.payload.projects?.forEach(project => {
                newState[project.id] = project
            })
            return newState;

        case GET_PROJECT_TASKS:
            newState = { ...state };
            // console.log('ACTIONPAYLOAD', action.payload)
            //console.log(action.payload.project_tasks.length === 0)
            if (action.payload.project_tasks.length === 0) return state
            else {
                action.payload.project_tasks.forEach(task => {
                newState[task.id] = task
            })
            
            }
            return newState;

        case DEL_PROJECT:
            newState = { ...state };
            console.log('<<<<>>>>>', newState)
            delete newState[action.payload.id]
            console.log('<<<<>>>>>', newState)
            
            return newState;

            

    }
}
export default projectReducer