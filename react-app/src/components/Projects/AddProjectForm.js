import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProjectThunk } from '../../store/project';
import { hideModal } from '../../store/modal';

const AddProjectForm = () => {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id)
    
    
    const [projectName, setProjectName] = useState('')
    const [color, setColor] = useState('red')

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


    return (
        <>
        <form onSubmit={createProject}>
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
            <div>
                <button type='submit'>Submit</button>
                <button onClick={hideModal()}>Cancel</button>
            </div>
        </form>
        
        </>
    )

}

export default AddProjectForm