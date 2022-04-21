
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getAllTasksThunk } from '../../store/task';
import AddTaskForm from '../TaskForms/AddTaskForm';
import { setCurrentModal, showModal } from '../../store/modal';
import './home.css'
import Sidebar from '../Sidebar';


const HomePage = () => {

    const userId = useSelector(state => state.session.user.id)
    const tasksObj = useSelector(state => state.task)
    
    const history = useHistory();

    const dispatch = useDispatch()

    const [tasks, setTasks] = useState(Object.values(tasksObj))
    

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
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        const current = mm + '/' + dd + '/' + yyyy;
        return current
    }
    
    console.log('111', tasksObj)
    console.log('222', tasks)

    // console.log('sorted?', tasks.sort(function (a, b) {
    //     return a.due_date - b.due_date
    // }))



    return (
        <div className='main-page'>
            <Sidebar />
            <h1 id='h1-home'>HEY YOU HAVE STUFF TO DO!</h1>
            <h2 id='h2-home'>Today {currentDate()}</h2>
            <div id='tasks-container'>
                {tasks?.map(task => (
                    <div className='one-task' key={task?.id}>
                        <div onClick={() => redirect(task?.id)} className='task-name'>
                            <h3>{task?.task_name}</h3>
                            <div className='one-desc' key={task?.id}>
                                <p>{task?.description}</p>
                            </div>
                            <div>
                                <p>{task?.due_date}</p>
                            </div>
                        </div>
                        <div className='more-div'>
                            <NavLink to={`/app/task/${task?.id}`}><i class="fa-solid fa-ellipsis fa-2x"></i></NavLink>
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