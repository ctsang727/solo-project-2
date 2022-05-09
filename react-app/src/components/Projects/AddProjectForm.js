import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProjectThunk } from '../../store/project';
import { hideModal} from '../../store/modal';
import './AddProjectForm.css'

const AddProjectForm = () => {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id)


    const [projectName, setProjectName] = useState('')
    const [color, setColor] = useState('none')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const errors = []

        if (projectName.replace(/\s+/g, '').length === 0) {
            errors.push('No project name')
        }
        setErrors(errors)
    }, [projectName])

    const createProject = e => {
        e.preventDefault()
        console.log('submit good')
        const newProject = {
            userId,
            projectName,
            color,
        }
        dispatch(hideModal())
        return dispatch(createProjectThunk(newProject))

    }

    const closeModal = () => {
        dispatch(hideModal());
       // dispatch(getTaskThunk())
       
    }


    return (
        <>
            <form onSubmit={createProject}>
                {errors.length > 0 &&
                    <div> *Please enter project name </div>
                }
                <div>
                    <label>Project name (required): </label>
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
                        <option value={'none'}>None</option>
                    </select>
                </div>
                <div id='project-buttons'>
                    {errors.length > 0 &&
                        <>
                            <div id='add-project-cant-click'>Add Project</div>
                            <button onClick={closeModal}>Cancel</button>
                        </>
                    }
                    {errors.length === 0 &&
                        <>
                            <div id='add-project-clickable' onClick={createProject}>Add Project</div>
                            <button type='none' onClick={closeModal}>Cancel</button>
                        </>
                    }
                </div>
            </form>
        </>
    )

}

export default AddProjectForm