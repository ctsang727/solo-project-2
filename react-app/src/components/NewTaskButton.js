import React, { useState } from 'react'

import AddTaskForm from '../components/TaskForms/AddTaskForm'


const addTaskButtonDivStyle = {
    display:'flex',
    alignItems:'center',
    padding: '3px'
}

const NewTaskButton = ({PID}) => {
    const [addTask, setAddTask] = useState(false);

    const clickAddNew = () => {
        setAddTask(!addTask)
    }

    const cancelFuncs = (e) => {
        e.preventDefault()
        console.log('working?')
        setAddTask(!addTask)
        console.log(addTask)
    }




    return (
        <>

            {!addTask &&
                <>
                    <div className='add-task-button'>
                        <div style ={addTaskButtonDivStyle} id='actual-button' onClick={clickAddNew}>
                            

                            <i style={{ fontSize: '18px' }} class="material-icons">add</i> 
                            &nbsp;
                            Add Task
                            </div>
                    </div>

                </>
            }

            {addTask &&
                <>
                    <div className='add-task-button'>
                        <AddTaskForm PID={PID} cancelFuncs={cancelFuncs} setAddTask={setAddTask} addTask={addTask} />

                    </div>
                </>
            }
        </>
    )
}

export default NewTaskButton

