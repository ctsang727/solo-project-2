import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProjectThunk } from '../../store/project';
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

        const newProject = {
            userId,
            projectName,
            color,
        }
        if (!open) onClose(e)

        return dispatch(createProjectThunk(newProject))

    }


    return (
        <div id='content2'>

            <form id='add-project-form' onSubmit={createProject}>
                {errors.length > 0 &&
                    <div style={{color:'#DC143C'}}> *Please enter project name </div>
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
                        <option style={{color:'Gray'}} value={'White'}>None</option>
                        <option style={{color:'#DC143C'}} value={'#DC143C'}>Red</option>
                        <option style={{color:'#0096FF'}} value={'#0096FF'}>Blue</option>
                        <option style={{color:'#FFBF00'}} value={'#FFBF00'}>Yellow</option>
                        <option style={{color:'Green'}} value={'Green'}>Green</option>
                        <option style={{color:'Purple'}} value={'Purple'}>Purple</option>
                        <option style={{color:'Pink'}} value={'Pink'}>Pink</option>
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