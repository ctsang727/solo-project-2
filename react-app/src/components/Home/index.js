import { user } from 'pg/lib/defaults';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { createTaskThunk, getAllTasksThunk } from '../../store/task';
import AddTaskForm from '../TaskForms/AddTaskForm';
import EditTaskForm from '../TaskForms/EditTaskForm';
import { setCurrentModal, showModal } from '../../store/modal';


const HomePage = () => {

    const userId = useSelector(state => state.session.user.id)

    //const history = useHistory();

    const dispatch = useDispatch()

    useEffect(() => {

        (async () => {
            console.log("USEEEFFFEEEECTTT")
            await dispatch(getAllTasksThunk(userId))
        })();
    }, [dispatch]);

    const tasksObj = useSelector(state => state.task)
    //console.log('!!!', tasksObj)
    //const track = Object.values(tasksObj)[0]
    //const trackId = track.id
    //console.log('iDDDDDD', track)

    //
    const tasks = Object.values(tasksObj)
    console.log('hello', tasks)
    //console.log('TEST', tasks.task_name)



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
                {tasks?.map(({ task_name, description, id }) => {
                    return (
                        <ul key={id}>
                            <li>{task_name}</li>
                            <ul>
                                <li>{description}</li>
                            </ul>
                            <NavLink to={`/app/task/${id}`}>More</NavLink>  
                        </ul>
                    )
                })}
            </div>

            
        </div>
    )

}


export default HomePage