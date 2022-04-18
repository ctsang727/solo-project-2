// const GET_TASK = 'task/GET_TASK'
const GET_PROJECTS = 'tasks/GET_PROJECTS'
const NEW_PROJECT = 'tasks/NEW_PROJECT'
// const DEL_TASK = 'task/DEL_TASK'

const newProject = project => ({
    type: NEW_PROJECT,
    payload: project 
})

const getAllProjects = projects => ({
    type: GET_PROJECTS,
    payload: projects
})

export const createProjectThunk = project => async dispatch => {
    console.log('inside thunk')
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
    const res = await fetch(`api/projects/${userId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(getAllProjects(data))
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
            console.log(action.payload)
            action.payload.projects.forEach(project => {
                newState[project.id] = project
            })
            return newState;
            

    }
}
export default projectReducer