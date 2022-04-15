
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory, useParams } from 'react-router-dom';
import {  getTaskThunk, deleteTaskThunk } from '../../store/task';

import EditTaskForm from '../TaskForms/EditTaskForm';
import { setCurrentModal, showModal } from '../../store/modal';

const SpecificTask = () => {
    const { taskId } = useParams()

    const dispatch = useDispatch()
    //const userId = useSelector(state => state.session.user.id)
    const tasksObj = useSelector(state => state.task)
    console.log('HERERERERERERE', tasksObj)
    //console.log('111', Object.values(tasksObj))
    // console.log('222', Object.values(tasksObj).map(item => console.log('inside', item.tasks[0].description)))

    const history = useHistory()

    useEffect(() => {
        console.log("USEEEFFFEEEECTTT")
        dispatch(getTaskThunk(taskId))
    }, [dispatch, taskId]);

    useEffect(() => {
        console.log('THIS IS TASKSOBJ', tasksObj)
    }, [tasksObj])

    function isEmpty(obj) {
        console.log('empty?')
        return Object.keys(obj).length === 0;
    }
    // console.log(isEmpty(tasksObj))
    // if (isEmpty(tasksObj)) console.log('EMPTY')


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
            {!isEmpty(tasksObj) &&
                <><p>I AM HERE</p>
                    <div>
                        <ul>
                            <li>
                                {tasksObj.task_name}
                            </li>
                            <ul>
                                <li>
                                    {tasksObj.description}
                                </li>
                            </ul>
                        </ul>
                    </div></>
            }

            <div>
                <button onClick={showEditTaskForm}>Edit</button>
                <button onClick={onDelete}>Delete</button>
            </div>



        </div>
    )

}


export default SpecificTask