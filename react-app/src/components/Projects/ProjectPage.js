import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteProjectThunk, getAllProjectTasksThunk, editProjectThunk } from '../../store/project';
import { deleteTaskThunk, getAllTasksThunk } from '../../store/task';
import './ProjectPage.css'
import TaskList from '../Tasks';



const ProjectPage = () => {
    const dispatch = useDispatch()

    const [showEdit, setShowEdit] = useState(false)

    const [errors, setErrors] = useState([])

    const history = useHistory()
    const { id } = useParams()
    const userId = useSelector(state => state.session.user.id)
    const projectsObj = useSelector(state => state.projects)
    console.log(id)
    console.log(projectsObj[+id]?.project_name)
    console.log(projectsObj[+id]?.color)
    const projectTasks = Object.values(projectsObj).filter(i => i.project_id === +id)
    const [projectName, setProjectName] = useState(projectsObj[+id]?.project_name)
    

    const [color, setColor] = useState(projectsObj[+id]?.color)


    const compare = (a, b) => {
        const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const taskAMonth = a.due_date.split(' ').slice(1, 4)[1]
        const taskBMonth = b.due_date.split(' ').slice(1, 4)[1]
        const founda = monthName.find(month => month === taskAMonth)
        const foundb = monthName.find(month => month === taskBMonth)
        const foundIdxA = monthName.indexOf(founda)
        const foundIdxB = monthName.indexOf(foundb)

        if (foundIdxA < foundIdxB) {
            return -1;
        }
        if (foundIdxA > foundIdxB) {
            return 1;
        }

        // names must be equal
        else {
            const dateNumA = a.due_date.split(' ').slice(0, 4)[1]
            const dateNumB = b.due_date.split(' ').slice(0, 4)[1]

            if (dateNumA < dateNumB) {
                return -1;
            }
            if (dateNumA > dateNumB) {
                return 1;
            }
            else {
                return 0
            }
        }
    }
    projectTasks.sort(compare)

    

    useEffect(() => {
        console.log('dispatch')
        dispatch(getAllTasksThunk(userId))
        dispatch(getAllProjectTasksThunk(id))

    }, [dispatch, id, userId]);

    useEffect(() => {
        const errors = []

        if (projectName?.replace(/\s+/g, '').length === 0) {
            errors.push('No project name')
        }
        setErrors(errors)
    }, [projectName])

    const onDelete = async (e) => {
        e.preventDefault()
        await projectTasks.forEach(task => dispatch(deleteTaskThunk(task.id)))
        await dispatch(deleteProjectThunk(+id))
        await dispatch(getAllTasksThunk(userId))
        history.push('/app')
    }

    const clickEdit = () => {
        setShowEdit(!showEdit)
    }



    const editProject = (e) => {
        e.preventDefault()
        const editProject = {
            id,
            projectName,
            userId,
            color
        }
        setShowEdit(!showEdit)
        return dispatch(editProjectThunk(editProject))
    }


    return (
        <div className='main-page'>
            {!showEdit &&
                <div>
                    <h1>{projectsObj[id]?.project_name}</h1>

                    <div id='project-page-buttons'>
                        <button onClick={onDelete}>Delete Project</button>
                        <button onClick={clickEdit}>Edit Project</button>
                    </div>

                </div>


            }
            {showEdit &&
                <><form onSubmit={editProject} >
                    {errors.length > 0 &&
                        <div>Please enter project name</div>
                    }
                    <div id='project-change-name'>
                        <input
                            type='text'
                            name='projectName'
                            value={projectName}
                            placeholder='Project name'
                            onChange={(e) => setProjectName(e.target.value)}>
                        </input>
                    </div>

                    <div>
                        <label>Color: </label>
                        <select
                            name='color'
                            value={color}
                            onChange={(e)=> setColor(e.target.value)}>
                            <option value={'red'}>Red</option>
                            <option value={'blue'}>Blue</option>
                            <option value={'yellow'}>Yellow</option>
                            <option value={'white'}>None</option>
                        </select>
                    </div>
                    {errors.length === 0 &&
                        <button id='project-edit-submit' type='submit'>Submit</button>
                    }

                    <button id='project-edit-cancel' onClick={() => setShowEdit(!showEdit)}>Cancel</button>
                </form>
                </>}


            <div id='tasks-container'>
                {/* tasklist component but with projectTasks */}
                <TaskList condition={'project'} projectId={id}/>
                
            </div>
        </div>
    )
}

export default ProjectPage