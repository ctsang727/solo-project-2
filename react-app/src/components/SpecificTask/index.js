import { user } from 'pg/lib/defaults';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { createTaskThunk, getAllTasksThunk, getTaskThunk, deleteTaskThunk } from '../../store/task';
import AddTaskForm from '../TaskForms/AddTaskForm';
import EditTaskForm from '../TaskForms/EditTaskForm';
import { setCurrentModal, showModal } from '../../store/modal';

const SpecificTask = () => {
    const { taskId } = useParams()

    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const tasksObj = useSelector(state => state.task)
    console.log('HERERERERERERE', tasksObj)
    console.log('111', Object.values(tasksObj))
    console.log('222', Object.values(tasksObj).map(item => console.log('inside', item.tasks[0].description)))
    
    const history = useHistory()

    useEffect(() => {

        (async () => {
            console.log("USEEEFFFEEEECTTT")
            await dispatch(getTaskThunk(taskId))
        })();
    }, [dispatch,taskId]);

    
    // console.log('!!!', tasksObj)
    // console.log('state', useSelector(state => state))
    // const task = Object.values(tasksObj)[0]
    // console.log('undefined?', task?.tasks[0].task_name)
    // const trackId = track.id
    // const taskDetails = task?.tasks[0]
    // console.log('iDDDDDD', task?.tasks[0].task_name)
    // console.log(typeof taskId)
    // console.log(typeof +taskId, taskId)

    const onDelete = (e) => {
        e.preventDefault()

        dispatch(deleteTaskThunk(+taskId))
        
        history.push('/app')

    }

    const showEditTaskForm = () => {
        dispatch(setCurrentModal(EditTaskForm))
        dispatch(showModal())

    }

    return (
        <div className='main-page'>
            <h1>HEY YOU HAVE STUFF TO DO!</h1>
            <div>{Object.values(tasksObj).map(item => {
                return (
                    <>
                    
                    <div>{item.tasks[0].task_name}</div>
                    <div>{item.tasks[0].description}</div>
                    </>
                )
            })}</div>

            <div>
                <button onClick={showEditTaskForm}>Edit</button>
                <button onClick={onDelete}>Delete</button>
            </div>


        </div>
    )

}


export default SpecificTask