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

    const history = useHistory();

    const dispatch = useDispatch()

    useEffect(() => {

        (async () => {
            console.log("USEEEFFFEEEECTTT")
            await dispatch(getAllTasksThunk(userId))
        })();
    }, [dispatch]);

    const tasksObj = useSelector(state => state.task)
    console.log('!!!', tasksObj)
    const track = Object.values(tasksObj)[0]
    //const trackId = track.id
    console.log('iDDDDDD', track)

    //array
    const tasks = Object.values(tasksObj)
    console.log('hello', tasks)
    console.log('TEST', tasks.task_name)



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

            {/* <form onSubmit={createTask}>
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
                //do labels later
                <div>
                    <button type='submit'>Add Task</button>
                </div>
            </form> */}
        </div>
    )

}


export default HomePage