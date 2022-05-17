import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteTaskThunk, getTodayTasks } from '../../store/task';
import ReactTooltip from 'react-tooltip';
import './taskList.css'

const TaskList = ({condition, projectId}) => {
    const userId = useSelector(state => state.session.user.id)
    const tasksObj = useSelector(state => state.task)

    const dispatch = useDispatch()

    const [tasks, setTasks] = useState(Object.values(tasksObj))
    //const [editIndex, setEditIndex] = useState(null)
    const [deleteIndex, setDeleteIndex] = useState(null)
    //const [showEditForm, setShowEditIndex] = useState(null)

    const convertDate = (task) => {

        const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const taskMonth = task?.due_date.split(' ').slice(1, 4)[1]
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
        const dayNum = task?.due_date.split(' ').slice(1, 4)[0]
        const yearNum = task?.due_date.split(' ').slice(1, 4)[2]
        const stringSetDueDate = yearNum + '-' + monthNum() + '-' + dayNum
        return stringSetDueDate
    }


    const currentDate = () => {
        //const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        //const d = new Date();
        //let name = month[d.getMonth()];

        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        const current = yyyy + '-' + mm + '-' + dd;
        return current
    }


    useEffect(() => {
        getTodayTasks(userId)
    }, [tasksObj, userId]);

    useEffect(() => {
        setTasks(Object.values(tasksObj))
    }, [tasksObj, setTasks])



    const compare = (a, b) => {
        const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const taskAMonth = a.due_date.split(' ').slice(1, 4)[1]
        const taskBMonth = b.due_date.split(' ').slice(1, 4)[1]
        const founda = monthName.find(month => month === taskAMonth)
        const foundb = monthName.find(month => month === taskBMonth)
        const foundIdxA = monthName.indexOf(founda)
        const foundIdxB = monthName.indexOf(foundb)

        if (foundIdxA < foundIdxB) {
            return -1;
        }
        if (foundIdxA > foundIdxB) {
            return 1;
        }

        // names must be equal
        else {
            const dateNumA = a.due_date.split(' ').slice(0, 4)[1]
            const dateNumB = b.due_date.split(' ').slice(0, 4)[1]

            if (dateNumA < dateNumB) {
                return -1;
            }
            if (dateNumA > dateNumB) {
                return 1;
            }
            else {
                return 0
            }
        }
    }
    tasks.sort(compare)
    


    return (
        <>
            <div id='tasks-container'>
                {tasks?.map(task => {
                    // if date is today render all tasks with today date
                    // inbox page: no condition
                    // project page: if task project_id === useParams(projectId)
                    // if ({props}) { 
                    //     return 
                    // }
                    //convertDate(task) === currentDate()
                    
                    if ((condition === 'today' && convertDate(task) === currentDate()) ||
                        (condition === 'project' && task?.project_id === +projectId) ||
                        condition === 'inbox')
                         {
                    return <>
                        <div className='one-task' key={task?.id} onMouseEnter={() => setDeleteIndex(task.id)} onMouseLeave={() => setDeleteIndex(null)}>
                            {/* <div onClick={() => redirect(task?.id)} className='task-name'> */}
                            {/* onClick={() => setDeleteIndex(deleteIndex => deleteIndex === task.id ? null : task.id)} */}
                            <div id='task-check' >
                                {deleteIndex === task.id &&
                                    <div value={task?.id} >
                                        <i data-tip data-for='check-tooltip' key={task?.id} onClick={() => dispatch(deleteTaskThunk(task.id))} className="material-icons">check</i>
                                        <ReactTooltip id="check-tooltip" place="top" effect="solid">
                                        Mark as Complete
                                        </ReactTooltip>
                                    </div>
                                }

                                {deleteIndex !== task.id &&
                                    <div>
                                        <i className="material-icons">check</i>
                                    </div>
                                }
                            </div>

                            <NavLink id='task-info' to={`/app/task/${task?.id}`}>
                                <div className='task-info'>
                                    <div id='task-info-grid-1'>
                                        <div id='tasklist-task-name'>
                                            <p> {task?.task_name} </p>
                                        </div>
                                        <div className='one-desc' key={task?.id}>
                                            <p> {task?.description} </p>
                                        </div>
                                        <div>
                                            <p> {task?.due_date.split(' ').slice(1, 4).join(' ')} </p>
                                        </div>
                                    </div>
                                    <div id='task-info-grid-2' >
                                        {deleteIndex === task.id &&
                                            <div onClick={e => e.preventDefault()}>
                                                
                                                <NavLink to={`/app/task/${task?.id}`}>
                                                <i data-tip data-for='edit-tooltip' className="material-icons">edit</i>
                                                <ReactTooltip id="edit-tooltip" place="top" effect="solid">
                                                    Edit
                                                </ReactTooltip>
                                                </NavLink>

                                                <i value={task.id} data-tip data-for='delete-tooltip' onClick={() => dispatch(deleteTaskThunk(task.id))} className="material-icons">delete</i>
                                                <ReactTooltip id="delete-tooltip" place="top" effect="solid">
                                                    Delete
                                                </ReactTooltip>

                                                <NavLink to={`/app/task/${task?.id}`}>
                                                <i data-tip data-for='more-tooltip' className="material-icons">forward</i>
                                                <ReactTooltip id="more-tooltip" place="top" effect="solid">
                                                    More
                                                </ReactTooltip>
                                                </NavLink>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </NavLink>

                        </div>
                        
                    </>
                } else {
                    return null
                }
            }
            )}
            </div>
            {/* <NewTaskButton></NewTaskButton> */}
        </>
    )
}

export default TaskList

/* <div onClick={() => setEditIndex(editIndex => editIndex === task.id ? null : task.id)}><i className="fa-solid fa-ellipsis fa-2x"></i></div>
                        <div></div>
                        {editIndex === task.id &&
                            <div className='task-dropdown'>
                                <ul key={task?.id}>
                                    <li value={task?.id} style={{ borderRadius: '3px', padding: '5px', color: '#de4c4a', cursor: 'pointer' }}
                                        onClick={e => dispatch(deleteTaskThunk(e.target.value))}>Delete</li>

                                    <li>
                                        <NavLink style={{ padding: '5px', textDecoration: 'none', color: 'white' }} to={`/app/task/${task?.id}`}>More</NavLink></li>

                                    <li>
                                        <EditTaskForm />
                                    </li>
                                </ul>
                            </div>} */