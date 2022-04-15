
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { createTaskThunk, getAllTasksThunk } from '../../store/task';
import AddTaskForm from '../TaskForms/AddTaskForm';
import EditTaskForm from '../TaskForms/EditTaskForm';
import { setCurrentModal, showModal } from '../../store/modal';
import './home.css'


const HomePage = () => {

    const userId = useSelector(state => state.session.user.id)

    //const history = useHistory();

    const dispatch = useDispatch()

    const [tasks, setTasks] = useState([])

    useEffect(() => {

        (async () => {
            console.log("USEEEFFFEEEECTTT")
            await dispatch(getAllTasksThunk(userId))
        })();
    }, [dispatch]);

    const tasksObj = useSelector(state => state.task)
    console.log('!!!', tasksObj)
    //const track = Object.values(tasksObj)[0]
    //const trackId = track.id
    //console.log('iDDDDDD', track)

    //
    useEffect(() => {
        console.log(tasksObj)
        console.log('useEffect 2 tasksObj')
        setTasks(Object.values(tasksObj))
    }, [tasksObj])

    console.log('THIS IS TASKS', tasks)



    const showAddTaskForm = () => {
        dispatch(setCurrentModal(AddTaskForm))
        dispatch(showModal())
    }

    const showEditTaskForm = () => {
        dispatch(setCurrentModal(EditTaskForm))
        dispatch(showModal())

    }



    return (
        <div className='main-page'>
            <h1>HEY YOU HAVE STUFF TO DO!</h1>
            <button onClick={showAddTaskForm}>ADD TASK</button>
            <div>
                {tasks?.map(task => (
                    <ul key={task?.id}>
                        <li>{task?.task_name}</li>
                        <ul key={task?.id}>
                        <li>{task?.description}</li>
                        </ul>
                        <NavLink to={`/app/task/${task?.id}`}>More</NavLink>
                    </ul>
                ))

                }
                {/* {tasks?.map(({ task_name, description, id }) => (

                    <ul key={id}>
                        <li>{task_name}</li>
                        <ul>
                            <li>{description}</li>
                        </ul>
                        <NavLink to={`/app/task/${id}`}>More</NavLink>
                    </ul>
                )
                )} */}
            </div>


        </div>
    )

}


export default HomePage