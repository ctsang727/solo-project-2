
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editTaskThunk, getTaskThunk, deleteTaskThunk } from '../../store/task';
import { getAllProjectsThunk } from '../../store/project';

const SpecificTask = () => {
    const { taskId } = useParams()

    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const tasksObj = useSelector(state => state.task)
    const projectState = useSelector(state => state.projects)
    const projectStateArr = Object.values(projectState)

    // const [tasks, setTasks] = useState([])

    const history = useHistory()

    useEffect(() => {

        dispatch(getTaskThunk(taskId))
    }, [dispatch, taskId]);


    useEffect(() => {

        dispatch(getAllProjectsThunk(userId))
    }, [dispatch, userId])


    const currentTask = Object.values(tasksObj).find(task => task?.id === +taskId)
    //console.log('CURRENTTASK', currentTask?.project_id)

    //edit related
    const [showEdit, setShowEdit] = useState(false)

    const [taskName, setTaskName] = useState(tasksObj[taskId]?.task_name)
    const [taskDesc, setTaskDesc] = useState(tasksObj[taskId]?.description)
    const [dueDate, setDueDate] = useState(tasksObj[taskId]?.due_date)
    const [projectId, setProject] = useState(currentTask?.project_id)
    const [labels, setLabels] = useState(tasksObj[taskId]?.labels || null)
    const [priority, setPriority] = useState(tasksObj[taskId]?.priority || null)

    const [errors, setErrors] = useState([])

    useEffect(() => {
        const errors = []
        if (taskName?.replace(/\s+/g, '').length === 0) {
            errors.push('No task name')
        }
        if (taskDesc?.replace(/\s+/g, '').length === 0) {
            errors.push('No desc')
        }

        setErrors(errors)
    }, [taskName, taskDesc])


    const convertDate = (date) => {
        const dateValue = tasksObj[taskId]?.due_date
        const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const taskMonth = dateValue.split(' ').slice(1, 4)[1]
        const monthNameIdx = monthName.find(month => month === taskMonth)
        const monthNum = () => {
            const number = monthName.indexOf(monthNameIdx) + 1
            if (number < 10) {
                let newNum = '0' + number.toString()
                return newNum
            } else {
                return number.toString()
            }
        }
        const dayNum = dateValue.split(' ').slice(1, 4)[0]
        const yearNum = dateValue.split(' ').slice(1, 4)[2]
        const stringSetDueDate = yearNum + '-' + monthNum() + '-' + dayNum
        return stringSetDueDate
    }



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
        //console.log('ONDELETE SPEECIFIC TASK', +taskId)
        dispatch(deleteTaskThunk(+taskId))

        history.push('/app')

    }

    const editButtonStyle = {

        backgroundColor: '#de4c4a',
        borderColor: ' #de4c4a',
        color: '#fff',
        padding: '10px',
        borderRadius: '5px',
        fontFamily: "'Roboto', sans-serif",
        fontSize: '14px',
        fontWeight: 'lighter',
        margin: '10px',
    }

    const deleteButtonStyle = {
        backgroundColor: '#383838',
        borderColor: ' #000000',
        color: '#fff',
        padding: '10px',
        borderRadius: '5px',
        fontFamily: "'Roboto', sans-serif",
        fontSize: '14px',
        fontWeight: 'lighter',
        margin: '10px',
    }





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
                <>
                    <div>
                        {errors.length > 0 &&
                            <>*Please enter task name</>

                        }

                    </div>

                    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={editTask} >

                        <div>
                            <label>Task name (required): </label>
                            <input
                                type='text'
                                name='taskName'
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label>Description (required):  </label>
                            <textarea
                                type='text'
                                name='taskDesc'
                                value={taskDesc}
                                onChange={(e) => setTaskDesc(e.target.value)} />
                        </div>
                        <div>
                            <label>Due date: </label>
                            <input
                                type='date'
                                name='dueDate'
                                value={convertDate(tasksObj[taskId]?.due_date)}
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
                            <label>Labels </label>
                            <input
                                type='text'
                                name='labels'
                                value={labels}
                                placeholder='Labels'
                                onChange={(e) => setLabels(e.target.value)} />
                        </div>
                        <div>
                            <label>Project: </label>
                            <select
                                name='projectId'
                                value={+projectId}
                                onChange={(e) => setProject(e.target.value)}>
                                {projectStateArr.map(project =>
                                    <option
                                        value={project?.id}>
                                        {project?.project_name}
                                    </option>)}
                                <option value={1}>Inbox</option>
                            </select>
                        </div>
                        {errors.length > 0 &&
                            <div>
                                <button style={deleteButtonStyle} onClick={clickEdit}>Cancel</button>
                            </div>
                        }
                        {errors.length === 0 &&
                            <div>
                                <button style={editButtonStyle} type='submit'>Save</button>
                                <button style={deleteButtonStyle} onClick={clickEdit}>Cancel</button>
                            </div>
                        }

                    </form>

                </>}


            {!showEdit &&
                <div>
                    <button style={editButtonStyle} onClick={clickEdit}>Edit</button>
                    {/* <button onClick={showEditTaskForm}>Edit</button> */}
                    <button style={deleteButtonStyle} onClick={onDelete}>Delete</button>
                </div>
            }
        </div >
    )

}


export default SpecificTask