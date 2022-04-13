import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllTasksThunk } from '../../store/task';





const HomePage = () => {

    //Note for projectId implementation: when creating new task, cant assign to project
    //must be in the project already, create new task, and the task will be assigned to the project
    const userId = useSelector(state => state.session.user.id)
    const [taskName, setTaskName] = useState('')
    const [taskDesc, setTaskDesc] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [projectId, setProject] = useState(null)
    const [labels, setLabels] = useState(null)
    const [priority, setPriority] = useState(null)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     console.log('USEEFFECT')
    //     dispatch(getAllTasksThunk())
    // }, [dispatch])

    useEffect(() => {
        
        (async() => {
            console.log("USEEEFFFEEEECTTT")
            await dispatch(getAllTasksThunk());
        })();
    }, [dispatch]);

    const tasks = useSelector(state => state.tasks)
    
    console.log('TASKS', tasks)
    


    const createTask = e => {
        e.preventDefault()
        const newTask = {
            userId,
            taskName,
            taskDesc,
            dueDate,
            projectId,
            labels,
            priority
        }

        return 
        

    }


    return (
        <div className='main-page'>
            <h1>test</h1>
        </div>
    )

}


export default HomePage