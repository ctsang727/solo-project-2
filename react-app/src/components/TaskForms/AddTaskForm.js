import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../../store/modal';
import { createTaskThunk } from '../../store/task';
import { getAllProjectsThunk } from '../../store/project';
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
    const projectState = useSelector(state => state.projects)

    useEffect(() => {
        //console.log('dispatching', userId)
        dispatch(getAllProjectsThunk(userId))
    }, [dispatch, userId])
    const projectStateArr = Object.values(projectState)

    const [taskName, setTaskName] = useState('')
    const [taskDesc, setTaskDesc] = useState('')
    const [dueDate, setDueDate] = useState(currentDate)
    //care project
    const [projectId, setProject] = useState(null)
    console.log('CURRENT', projectId)
    //

    const [labels, setLabels] = useState(null)
    const [priority, setPriority] = useState(0)


    const [errors, setErrors] = useState([])

    useEffect(() => {
        const errors = []

        if (taskName === '') {
            errors.push('No task name')
        }
        if (taskDesc === '') {
            errors.push('description error')
            console.log(errors)
        }

        setErrors(errors)
    }, [taskName, taskDesc])
    // 

    const createTask = e => {
        e.preventDefault()
        console.log('PROJECTID', projectId)
        if (projectId === 'None') {
            const newTask = {
                userId,
                taskName,
                taskDesc,
                dueDate,
                projectId: null,
                labels,
                priority
            }
            dispatch(hideModal())
            return dispatch(createTaskThunk(newTask))
        } else {
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

        // dispatch(hideModal())
        // return dispatch(createTaskThunk(newTask))

    }

    const closeModal = () => {
        dispatch(hideModal());
        // dispatch(getTaskThunk())
    }

    return (
        <div id='content'>
            <form id='add-task' onSubmit={createTask}>
                <div>
                    {errors.includes('No task name') &&
                        <div>*Please enter task name</div>}
                    <input
                        type='text'
                        name='taskName'
                        value={taskName}
                        placeholder='Task name'
                        onChange={(e) => setTaskName(e.target.value)} />
                </div>
                {errors.includes('description error') &&
                    <div>*Please enter description</div>}
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
                            <select
                                name='projectId'
                                value={projectId}
                                onChange={(e) => setProject(e.target.value)}>
                                <option
                                    value={null}
                                >None</option>
                                {projectStateArr.map(project =>
                                    <option
                                        value={project?.id}>
                                        {project?.project_name}
                                    </option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {errors.length > 0 &&
                    <div className='add-cancel-buttons'>
                        <div id='add-task-cant-click'>Add Task</div>
                        <button onClick={closeModal}>Cancel</button>
                    </div>}
                {errors.length === 0 &&
                    <div className='add-cancel-buttons'>
                        <div id='add-task-click' onClick={createTask} >Add Task</div>
                        <button onClick={closeModal}>Cancel</button>
                    </div>}
            </form>

        </div>
    )

}
export default AddTaskForm