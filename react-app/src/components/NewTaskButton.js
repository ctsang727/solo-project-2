import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddTaskForm from '../components/TaskForms/AddTaskForm'
import { setCurrentModal, showModal, hideModal } from '../store/modal'
import { createTaskThunk } from '../store/task';



const NewTaskButton = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id)
    const [addTask, setAddTask] = useState(false);

    const showAddTaskForm = () => {
        dispatch(setCurrentModal(AddTaskForm))
        dispatch(showModal())
    }

    const clickAddNew = () => {
        setAddTask(!addTask)
    }

    const cancelFuncs = (e) => {
        e.preventDefault()
        console.log('working?')
        setAddTask(!addTask)
        console.log(addTask)
    }
    const closeModal = () => {
        dispatch(hideModal());
        // dispatch(getTaskThunk())
    }



    return (
        <>

            {!addTask &&
                <>
                    <button onClick={clickAddNew}><i style={{ fontSize: '18px' }} class="material-icons">add</i>
                        Test Add Task </button>

                </>
            }

            {addTask &&
                <>
                    <AddTaskForm cancelFuncs={cancelFuncs} setAddTask={setAddTask} addTask={addTask} />
                    
                </>
            }
        </>
    )
}

export default NewTaskButton

