
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editTaskThunk, getTaskThunk, deleteTaskThunk } from '../../store/task';

// import EditTaskForm from '../TaskForms/EditTaskForm';
// import { setCurrentModal, showModal } from '../../store/modal';

const SpecificTask = () => {
    const { taskId } = useParams()

    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const tasksObj = useSelector(state => state.task)
    // const [tasks, setTasks] = useState([])

    const history = useHistory()

    useEffect(() => {
        console.log('inside useEffect 1')
        dispatch(getTaskThunk(taskId))
    }, [dispatch, taskId]);


    //edit related
    const [showEdit, setShowEdit] = useState(false)

    const [taskName, setTaskName] = useState(tasksObj.task_name)
    const [taskDesc, setTaskDesc] = useState(tasksObj.description)
    const [dueDate, setDueDate] = useState(tasksObj.due_date)
    const [projectId, setProject] = useState(tasksObj.project_id || null)
    const [labels, setLabels] = useState(tasksObj.labels || null)
    const [priority, setPriority] = useState(tasksObj.priority || null)
    //edit related

    const clickEdit = () => {
        setShowEdit(!showEdit)
    }

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
        setShowEdit(!showEdit)
        return dispatch(editTaskThunk(editTask))
    }

    function isEmpty(obj) {

        return Object.keys(obj).length === 0;
    }

    const onDelete = (e) => {
        e.preventDefault()
        console.log('ONDELETE SPEECIFIC TASK', +taskId)
        dispatch(deleteTaskThunk(+taskId))

        history.push('/app')

    }

    // const showEditTaskForm = () => {

    //     dispatch(setCurrentModal(EditTaskForm))
    //     dispatch(showModal())

    // }

    return (
        <div className='main-page'>

            <h1>HEY YOU HAVE STUFF TO DO!</h1>
            {!isEmpty(tasksObj) && !showEdit &&
                <>
                    <div>
                        <h3>
                            {tasksObj[taskId].task_name}
                        </h3>
                    <div>
                        <h5>
                            {tasksObj[taskId].description}
                        </h5>
                    </div>
                    </div></>
            }
            {showEdit &&
                <form onSubmit={editTask} >
                    <div>
                        <input
                            type='text'
                            name='taskName'
                            value={taskName}
                            defaultValue={tasksObj[taskId].task_name}
                            onChange={(e) => setTaskName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <textarea
                            type='text'
                            name='taskDesc'
                            value={taskDesc}
                            defaultValue={tasksObj[taskId].description}
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
                    <div>
                        <button type='submit'>Edit Task</button>

                    </div>
                </form>

            }



            <div>
                <button onClick={clickEdit}>NEW EDIT</button>
                {/* <button onClick={showEditTaskForm}>Edit</button> */}
                <button onClick={onDelete}>Delete</button>
            </div>
        </div >
    )

}


export default SpecificTask