import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteProjectThunk, getAllProjectTasksThunk, editProjectThunk } from '../../store/project';
import { deleteTaskThunk, getAllTasksThunk } from '../../store/task';


const ProjectPage = () => {
    const dispatch = useDispatch()

    const [showEdit, setShowEdit] = useState(false)
    const [projectName, setProjectName] = useState('')
    const [color, setColor] = useState('red')
    // const [isInbox, setIsInbox] = useState(false)
    const [errors, setErrors] = useState([])

    const history = useHistory()
    const { id } = useParams()
    const userId = useSelector(state => state.session.user.id)
    const projectsObj = useSelector(state => state?.projects)
    const projectTasks = Object.values(projectsObj).filter(i => i.project_id === +id)
    const projTasksFiltered = Object.values(projectsObj).filter(i => i.project_id)

    useEffect(() => {
        dispatch(getAllTasksThunk(userId))
        dispatch(getAllProjectTasksThunk(id))
        console.log('project dispatch')
    }, [dispatch, id, userId]);

    useEffect(() => {
        const errors = []

        if (projectName === '') {
            errors.push('No project name')
        }
        setErrors(errors)
    }, [projectName])

    //maybe refactor line 31 and related later

    const onDelete = async (e) => {
        e.preventDefault()
        await projTasksFiltered.forEach(task => dispatch(deleteTaskThunk(task.id)))
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
        <div>
            <div>
                <button style={{ marginLeft: '500px' }} onClick={onDelete}>Delete</button>
                <button style={{ marginLeft: '500px' }} onClick={clickEdit}>Edit</button>
            </div>

            <h1 style={{ marginLeft: '500px' }}>{projectsObj[id]?.project_name}</h1>
            {projectTasks?.map(p => (
                <div style={{ marginLeft: '500px' }}>
                    <h3>{p?.task_name}</h3>
                    <p>{p?.description}</p>
                    <p>{p?.due_date}</p>
                </div>

            ))}
            {showEdit &&

                <form style={{ marginLeft: '500px' }} onSubmit={editProject} >
                    {errors.length > 0 &&
                        <div>Please enter project name</div>
                    }
                    <div>
                        <input
                            type='text'
                            name='projectName'
                            value={projectName}
                            placeholder='Project name'
                            onChange={(e) => setProjectName(e.target.value)} />
                    </div>
                    <div>
                        <label>Color: </label>
                        <select
                            name='color'
                            value={color}
                            onChange={e => setColor(e.target.value)}>
                            <option value={'red'}>Red</option>
                            <option value={'blue'}>Blue</option>
                            <option value={'yellow'}>Yellow</option>
                        </select>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            }

        </div>
    )
}

export default ProjectPage