import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteTaskThunk, getTodayTasks } from '../../store/task';
import NewTaskButton from '../NewTaskButton';

const TaskList = () => {


    const userId = useSelector(state => state.session.user.id)
    const tasksObj = useSelector(state => state.task)
    // const history = useHistory();
    const dispatch = useDispatch()
    //console.log('on today page')

    const [tasks, setTasks] = useState(Object.values(tasksObj))
    const [editIndex, setEditIndex] = useState(null)
    const [deleteIndex, setDeleteIndex] = useState(null)
    //const [showEditForm, setShowEditIndex] = useState(null)

    useEffect(() => {
        console.log("USEEEFFFEEEECTTT")
        getTodayTasks(userId)
    }, [dispatch, userId]);

    useEffect(() => {

        setTasks(Object.values(tasksObj))
    }, [tasksObj, setTasks])


    const currentDate = () => {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const d = new Date();
        let name = month[d.getMonth()];

        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        //const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        const current = name + ' ' + dd + ', ' + yyyy;
        return current
    }


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
    // console.log('unsorted', tasks)
    // console.log('sort this shit', tasks.sort(compare))

    return (
        <>
            <div id='tasks-container'>
                {tasks?.map(task => (
                    <div className='one-task' key={task?.id}>
                        {/* <div onClick={() => redirect(task?.id)} className='task-name'> */}
                        <div id='task-check' onClick={() => setDeleteIndex(deleteIndex => deleteIndex === task.id ? null : task.id)}>
                            {deleteIndex === task.id &&
                                <div value={task?.id} >
                                    <i key={task?.id} onClick={() => dispatch(deleteTaskThunk(task.id))} className="material-icons">check</i>
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
                                <h3> {task?.task_name} </h3>
                                <div className='one-desc' key={task?.id}>
                                    <p> {task?.description} </p>
                                </div>
                                <div>
                                    <p> {task?.due_date.split(' ').slice(1, 4).join(' ')} </p>
                                </div>
                            </div>
                        </NavLink>


                        <div onClick={() => setEditIndex(editIndex => editIndex === task.id ? null : task.id)}><i className="fa-solid fa-ellipsis fa-2x"></i></div>
                        <div></div>
                        {editIndex === task.id &&
                            <div className='task-dropdown'>
                                <ul key={task?.id}>

                                    <li value={task?.id} style={{ borderRadius: '3px', padding: '5px', color: '#de4c4a', cursor: 'pointer' }} onClick={e => dispatch(deleteTaskThunk(e.target.value))}>Delete</li>
                                    <li><NavLink style={{ padding: '5px', textDecoration: 'none', color: 'white' }} to={`/app/task/${task?.id}`}>More</NavLink></li>
                                </ul>
                            </div>}
                    </div>
                ))
                }
            </div>
            <NewTaskButton></NewTaskButton>
        </>
    )
}

export default TaskList