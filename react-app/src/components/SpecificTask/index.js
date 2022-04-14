import { user } from 'pg/lib/defaults';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { createTaskThunk, getAllTasksThunk, getTaskThunk, deleteTaskThunk } from '../../store/task';
import AddTaskForm from '../TaskForms/AddTaskForm';
import EditTaskForm from '../TaskForms/EditTaskForm';
import { setCurrentModal, showModal } from '../../store/modal';

const SpecificTask = () => {

    const userId = useSelector(state => state.session.user.id)
    const { taskId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {

        (async () => {
            console.log("USEEEFFFEEEECTTT")
            await dispatch(getTaskThunk(taskId))
        })();
    }, [dispatch]);

    const tasksObj = useSelector(state => state.task)
    console.log('!!!', tasksObj)
    const task = Object.values(tasksObj)[0]
    //const trackId = track.id
    const taskDetails = task?.tasks[0]
    console.log('iDDDDDD', task?.tasks[0].task_name)
    console.log(typeof taskId)

    const onDelete = (e) => {
        e.preventDefault()

        dispatch(deleteTaskThunk(+taskId))
            .catch(async (res) => {
                const data = await res.json();
                await dispatch(getAllTasksThunk());
                if (data && data.errors) return (data.errors)
            })
        history.push('/')

    }





    // const showAddTaskForm = () => {
    //     dispatch(setCurrentModal(AddTaskForm))
    //     dispatch(showModal())
    //   }

    const showEditTaskForm = () => {
        dispatch(setCurrentModal(EditTaskForm))
        dispatch(showModal())

    }




    return (
        <div className='main-page'>
            <h1>HEY YOU HAVE STUFF TO DO!</h1>

            <div>
                {taskDetails?.task_name}
            </div>
            <div>
                {taskDetails?.description}
            </div>
            <div>
                {taskDetails?.due_date}
            </div>
            <div>
                <button onClick={showEditTaskForm}>Edit</button>
                <button onClick={onDelete}>Delete</button>
            </div>


        </div>
    )

}


export default SpecificTask