import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProjectThunk } from '../../store/project';
import { hideModal } from '../../store/modal';
import './AddProjectForm.css'

const AddProjectForm = ({ onClose, open, cancelFuncs }) => {

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
        if (!open) onClose(e)
        dispatch(hideModal())
        return dispatch(createProjectThunk(newProject))

    }

    const closeModal = () => {
        dispatch(hideModal());
        // dispatch(getTaskThunk())

    }


    return (
        <div id='content2'>
            
            <form id='add-project-form' onSubmit={createProject}>
                {errors.length > 0 &&
                    <div> *Please enter project name </div>
                }
                <div>
                    <label>Project name (required): </label>
                    <div>
                        <input
                            type='text'
                            name='projectName'
                            value={projectName}
                            placeholder='Project name'
                            onChange={(e) => setProjectName(e.target.value)} />
                    </div>
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

                {errors.length > 0 && !open &&
                    <div id='project-buttons'>

                        <div id='add-project-cant-click' style={{ color: 'white' }}>Add Project</div>
                        <div className='add-project-cancel' style={{ fontFamily: 'Roboto, sans-serif' }} onClick={onClose}>Cancel</div>

                    </div>
                }
                {errors.length === 0 && !open &&
                    <div id='project-buttons'>

                        <div id='add-project-clickable' style={{ color: 'white' }} onClick={createProject}>Add Project</div>
                        <div className='add-project-cancel' style={{ fontFamily: 'Roboto, sans-serif' }} onClick={onClose}>Cancel</div>

                    </div>
                }

            </form>
        </div>
    )

}

export default AddProjectForm