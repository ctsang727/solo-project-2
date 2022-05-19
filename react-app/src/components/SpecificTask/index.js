
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


    //const currentTask = Object.values(tasksObj).find(task => task?.id === +taskId)
    //console.log('CURRENTTASK', currentTask?.project_id)

    //edit related
    const [showEdit, setShowEdit] = useState(false)

    const [taskName, setTaskName] = useState(tasksObj[taskId]?.task_name)
    const [taskDesc, setTaskDesc] = useState(tasksObj[taskId]?.description)

    const [projectId, setProject] = useState(tasksObj[taskId]?.project_id || null)
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

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;




    const convertDate = (date) => {
        const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const taskMonth = date?.split(' ').slice(1, 4)[1]
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
        const dayNum = date?.split(' ').slice(1, 4)[0]
        const yearNum = date?.split(' ').slice(1, 4)[2]
        const stringSetDueDate = yearNum + '-' + monthNum() + '-' + dayNum
        return stringSetDueDate
    }
    // console.log('date 1', convertDate(tasksObj[taskId]?.due_date))
    // console.log('date 2', today)
    // console.log(today === convertDate(tasksObj[taskId]?.due_date))

    const [dueDate, setDueDate] = useState(convertDate(tasksObj[taskId]?.due_date) < today ? today : convertDate(tasksObj[taskId]?.due_date))

    const formatDate = (date) => {
        const dateArr = date.split('-')
        const newDate = dateArr[1] + '/' + dateArr[2] + '/' + dateArr[0]
        return newDate

    }


    //edit related

    const clickEdit = () => {
        setShowEdit(!showEdit)
    }

    const editTask = e => {
        e.preventDefault()

        if (projectId === 'None') {
            const editTask = {
                taskId,
                userId,
                taskName,
                taskDesc,
                dueDate,
                projectId: null,
                labels,
                priority
            }
            setShowEdit(!showEdit)
            return dispatch(editTaskThunk(editTask))
        } else {
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

    }

    function isEmpty(obj) {

        return Object.keys(obj).length === 0;
    }

    const onDelete = (e) => {
        e.preventDefault()
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
                        <div>
                            <h5>
                                {formatDate(convertDate(tasksObj[taskId]?.due_date))}
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

                        <div className='form-div'>
                            <label>Task name (required): </label>
                            <div >
                                <input
                                    type='text'
                                    name='taskName'
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                ></input>
                            </div>
                        </div>
                        <div className='form-div'>
                            <label>Description (required):  </label>
                            <div>
                                <textarea
                                    type='text'
                                    name='taskDesc'
                                    value={taskDesc}
                                    onChange={(e) => setTaskDesc(e.target.value)} />
                            </div>
                        </div>
                        <div id='form-part-2'>
                            <div className='form-div'>
                                <label>Due date: </label>
                                <div>
                                    <input
                                        type='date'
                                        name='dueDate'
                                        min={today}
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)} />
                                </div>
                            </div>
                            <div className='form-div'>
                                <label>Priority: </label>
                                <div>
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
                            </div>
                            <div className='form-div'>
                                <label>Labels: </label>
                                <div>
                                    <input
                                        type='text'
                                        name='labels'
                                        value={labels}
                                        placeholder='Labels'
                                        onChange={(e) => setLabels(e.target.value)} />
                                </div>
                            </div>
                            <div className='form-div'>
                                <label>Project: </label>
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
                            <div>
                                <button style={deleteButtonStyle} onClick={console.log('test')}>Cancel</button>
                            </div>
                        }
                        {errors.length === 0 &&
                            <div>
                                <button style={editButtonStyle} type='submit'>Save</button>
                                <button style={deleteButtonStyle}
                                    onClick={() => {
                                        setTaskName(tasksObj[taskId]?.task_name);
                                        setTaskDesc(tasksObj[taskId]?.description);
                                        setProject(tasksObj[taskId]?.project_id || null);
                                        setLabels(tasksObj[taskId]?.labels || null);
                                        setPriority(tasksObj[taskId]?.priority || null);
                                        setShowEdit(!showEdit);
                                    }}>Cancel</button>
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