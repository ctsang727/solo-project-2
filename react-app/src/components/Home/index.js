import { user } from 'pg/lib/defaults';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createTaskThunk, getAllTasksThunk } from '../../store/task';





const HomePage = () => {

    //Note for projectId implementation: when creating new task, cant assign to project
    //must be in the project already, create new task, and the task will be assigned to the project
    const userId = useSelector(state => state.session.user.id)
    const [taskName, setTaskName] = useState('')
    const [taskDesc, setTaskDesc] = useState('')
    const [dueDate, setDueDate] = useState('')
    //care project
    const [projectId, setProject] = useState(null)
    //
    const [labels, setLabels] = useState(null)
    const [priority, setPriority] = useState(0)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     console.log('USEEFFECT')
    //     dispatch(getAllTasksThunk())
    // }, [dispatch])

    useEffect(() => {

        (async () => {
            console.log("USEEEFFFEEEECTTT")
            await dispatch(getAllTasksThunk(userId));
        })();
    }, [dispatch]);

    const tasksObj = useSelector(state => state.task)

    const tasks = Object.values(tasksObj)
    console.log('hello', tasks)
    console.log('user_id', tasks.user_id)





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

        return dispatch(createTaskThunk(newTask))


    }




    return (
        <div className='main-page'>
            <div>
                {tasks?.map(({ task_name, id }) => {
                    return (
                        <ul>
                            <li key={id}>{task_name}</li>
                        </ul>
                    )
                })}
            </div>

            <form onSubmit={createTask}>
                <div>
                    <input
                        type='text'
                        name='taskName'
                        value={taskName}
                        placeholder='Add New Task'
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
                <div>
                    <input
                        type='date'
                        name='dueDate'
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)} />
                </div>
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
                {/* Do labels later */}
                <div>
                    <button type='submit'>Add Task</button>
                </div>
            </form>
        </div>
    )

}


export default HomePage