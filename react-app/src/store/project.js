// const GET_TASK = 'task/GET_TASK'
// const GET_TASKS = 'tasks/GET_TASKS'
const NEW_PROJECT = 'tasks/NEW_PROJECT'
// const DEL_TASK = 'task/DEL_TASK'

const newProject = project => ({
    type: NEW_PROJECT,
    payload: project 
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

const projectReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        default:
            return state

        case NEW_PROJECT:
            newState = { ...state };
            newState[action.payload.id] = action.payload
            return newState;

    }
}
export default projectReducer