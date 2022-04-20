import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../../store/modal';
import { createTaskThunk } from '../../store/task';
import './AddTaskForm.css'

const AddTaskForm = () => {

    const dispatch = useDispatch();
    const currentDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        const current = mm + '/' + dd + '/' + yyyy;
        return current
    }

    //Note for projectId implementation: when creating new task, cant assign to project
    //must be in the project already, create new task, and the task will be assigned to the project
    const userId = useSelector(state => state.session.user.id)
    const [taskName, setTaskName] = useState('')
    const [taskDesc, setTaskDesc] = useState('')
    const [dueDate, setDueDate] = useState(currentDate)
    //care project
    const [projectId, setProject] = useState(null)
    //
    const [labels, setLabels] = useState(null)
    const [priority, setPriority] = useState(0)

    // const [errors, setErrors] = useState([])

    // const validate = () => {
    //     if (taskName === '') {
    //         taskName = 'empty'
    //         errors.push(taskName)
    //     } else if (taskDesc === ''){
    //         taskDesc = 'empty'
    //         errors.push(taskDesc)
    //     }
    //     return errors.length 
    // }

    const createTask = e => {
        e.preventDefault()
        const newTask = {
            userId,
            taskName,
            taskDesc,
            dueDate,
            projectId,
            labels,
            priority
        }
        

            dispatch(hideModal())
            return dispatch(createTaskThunk(newTask))
        
        
        
    }


    return (
        <div id='content'>
            <form id='add-task' onSubmit={createTask}>
                <div>
                    <input
                        type='text'
                        name='taskName'
                        value={taskName}
                        placeholder='Task name'
                        onChange={(e) => setTaskName(e.target.value)} />
                </div>
                <div>
                    <textarea
                        type='text'
                        name='taskDesc'
                        value={taskDesc}
                        placeholder='Description'
                        onChange={(e) => setTaskDesc(e.target.value)} />
                </div>
                <div id='second-block'>
                    <div id='date'>
                        <input
                            type='date'
                            name='dueDate'
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)} />
                    </div>

                    <div id='third-block'>
                        <div>
                            <label>Priority: </label>
                            <select
                                name='priority'
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}>
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                            </select>
                        </div>
                        <div>
                            <input
                                type='text'
                                name='labels'
                                value={labels}
                                placeholder='Labels'
                                onChange={(e) => setLabels(e.target.value)} />
                        </div>
                        <div>
                            <input
                                type='text'
                                name='projectId'
                                value={projectId}
                                placeholder='Project'
                                onChange={(e) => setProject(e.target.value)} />
                        </div>
                    </div>
                </div>



                {/* Do labels later */}
                <div>
                    <button type='submit'>Add Task</button>
                    <button onClick={hideModal()}>Cancel</button>
                </div>
            </form>
        </div>
    )

}
export default AddTaskForm