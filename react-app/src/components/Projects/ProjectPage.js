import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteProjectThunk, getAllProjectTasksThunk, editProjectThunk } from '../../store/project';



const ProjectPage = () => {
    const dispatch = useDispatch()

    const [showEdit, setShowEdit] = useState(false)
    const [projectName, setProjectName] = useState('')
    const [color, setColor] = useState('red')

    const history = useHistory()
    const { id } = useParams()
    const userId = useSelector(state => state.session.user.id)
    const projectsObj = useSelector(state => state?.projects)
    const projectTasks = Object.values(projectsObj).filter(i => i.project_id === +id)

    useEffect(() => {
        dispatch(getAllProjectTasksThunk(id))
    }, [dispatch, id]);

    
    const onDelete = (e) => {
        e.preventDefault()
        dispatch(deleteProjectThunk(+id))
        console.log('ondelete')
        history.push('/')
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
            <button style={{ marginLeft: '500px' }} onClick={onDelete}>Delete</button>
            <button style={{ marginLeft: '500px' }} onClick={clickEdit}>Edit</button>
            <h1 style={{ marginLeft: '500px' }}>{projectsObj[id]?.project_name}</h1>
            {projectTasks?.map(p => (
                <div style={{ marginLeft: '500px' }}>
                    {p.description}
                </div>
            ))}
            {showEdit &&
                <form style={{ marginLeft: '500px' }} onSubmit={editProject} >
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