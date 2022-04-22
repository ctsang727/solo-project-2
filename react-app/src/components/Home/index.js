
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getAllTasksThunk, deleteTaskThunk } from '../../store/task';
import AddTaskForm from '../TaskForms/AddTaskForm';
import { setCurrentModal, showModal } from '../../store/modal';
import './home.css'
import Sidebar from '../Sidebar';
import SpecificTask from '../SpecificTask';


const HomePage = () => {

    const userId = useSelector(state => state.session.user.id)
    const tasksObj = useSelector(state => state.task)

    const history = useHistory();

    const dispatch = useDispatch()

    const [tasks, setTasks] = useState(Object.values(tasksObj))
    const [editIndex, setEditIndex] = useState(null)
    const [showEditForm, setShowEditIndex] = useState(null)


    useEffect(() => {
        console.log("USEEEFFFEEEECTTT")
        dispatch(getAllTasksThunk(userId))
    }, [dispatch, userId]);

    useEffect(() => {

        setTasks(Object.values(tasksObj))
    }, [setTasks, tasksObj])

    const redirect = (id) => {

        history.push(`/app/task/${id}`)
    }

    const showAddTaskForm = () => {
        dispatch(setCurrentModal(AddTaskForm))
        dispatch(showModal())
    }


    const currentDate = () => {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const d = new Date();
        let name = month[d.getMonth()];

        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        const current = name + ' ' + dd + ', ' + yyyy;
        return current
    }

    return (
        <div className='main-page'>

            <h1 id='h1-home'>HEY YOU HAVE STUFF TO DO!</h1>
            <div id='date'>
                <h2 id='h2-home'>Today</h2>
                <h4>{currentDate()}</h4>
            </div>

            <div id='tasks-container'>

                {tasks?.map(task => (
                    <div className='one-task' key={task?.id}>
                        
                        <div onClick={() => redirect(task?.id)} className='task-name'>
                        <div>
                            <i class="material-icons">check</i>
                        </div>
                            <h3>{task?.task_name}</h3>
                            <div className='one-desc' key={task?.id}>
                                <p>{task?.description}</p>
                            </div>
                            <div>
                                <p>{task?.due_date.split(' ').slice(0, 4).join(' ')}</p>
                            </div>


                            {/* <div className='more-div'> */}
                            <div onClick={() => setEditIndex(editIndex => editIndex === task.id ? null : task.id)}><i class="fa-solid fa-ellipsis fa-2x"></i></div>
                            {editIndex === task.id &&
                                <div className='task-dropdown'>
                                    <ul key={task?.id}>
                                        <li onClick={() => setShowEditIndex(showEditForm => showEditForm === task.id ? null : task.id)}>edit</li>
                                        {showEditForm === task.id &&
                                            <>hold</>
                                            // <form onSubmit={editTask} >
                                            // <div>
                                            //     <input
                                            //         type='text'
                                            //         name='taskName'
                                            //         value={taskName}
                                            //         defaultValue={tasksObj[taskId].task_name}
                                            //         onChange={(e) => setTaskName(e.target.value)}
                                            //     ></input>
                                            // </div>
                                            // </form>
                                        }
                                        <li value={task?.id} onClick={e => dispatch(deleteTaskThunk(e.target.value))}>Delete</li>
                                        <li><NavLink to={`/app/task/${task?.id}`}>more</NavLink></li>
                                    </ul>

                                </div>}
                            {/* </div> */}

                        </div>
                    </div>
                ))
                }
            </div>
            <div id='new-task-button'>
                <button onClick={showAddTaskForm}><i style={{ fontSize: '18px' }} class="material-icons">add</i> Add Task </button>
            </div>


        </div>
    )

}


export default HomePage