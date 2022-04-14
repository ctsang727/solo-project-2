import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../../store/modal';
import { editTaskThunk } from '../../store/task';

const EditTaskForm = () => {
    const dispatch = useDispatch();

    const userId = useSelector(state => state.session.user.id)
    const tasksObj = useSelector(state => state.task)
    const edittask = Object.values(tasksObj)[0]
    const taskId = edittask?.tasks[0].id
    const specificTask = edittask?.tasks[0]
    console.log(taskId)
    

    const [taskName, setTaskName] = useState(specificTask.task_name)
    const [taskDesc, setTaskDesc] = useState(specificTask.description)
    const [dueDate, setDueDate] = useState(specificTask.due_date)
    const [projectId, setProject] = useState(null)
    const [labels, setLabels] = useState(null)
    const [priority, setPriority] = useState(specificTask.priority)

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
                </div>
            </form>
            
        </div>
    )
}

export default EditTaskForm