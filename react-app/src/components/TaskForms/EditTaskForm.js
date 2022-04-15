import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { hideModal } from '../../store/modal';
import { editTaskThunk, deleteTaskThunk, getTaskThunk } from '../../store/task';

const EditTaskForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state.session.user.id)
    const tasksObj = useSelector(state => state.task)
    console.log(tasksObj)
    const taskId = tasksObj.id
    

    const [taskName, setTaskName] = useState(tasksObj.task_name)
    const [taskDesc, setTaskDesc] = useState(tasksObj.description)
    const [dueDate, setDueDate] = useState(tasksObj.due_date) 
    const [projectId, setProject] = useState(tasksObj.project_id)
    const [labels, setLabels] = useState(tasksObj.labels)
    const [priority, setPriority] = useState(tasksObj.priority)

    const editTask = e => {
        e.preventDefault()
        const editTask = {
            taskId,
            userId,
            taskName,
            taskDesc,
            dueDate,
            projectId,
            labels,
            priority
        }
        dispatch(hideModal())
        return dispatch(editTaskThunk(editTask))
    }

    const onDelete = (e) => {
        e.preventDefault()

        //dispatch(deleteTaskThunk(+taskId))
            //working but re-render issues
        history.push('/app')

    }

    



    return (
        <div>
            <form onSubmit={editTask}>
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
                    <button type='submit'>Edit Task</button>
                    <button onClick={onDelete}>Delete</button>
                </div>
            </form>
            
        </div>
    )
}

export default EditTaskForm