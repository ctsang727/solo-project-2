
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllTasksThunk, deleteTaskThunk } from '../../store/task';
import AddTaskForm from '../TaskForms/AddTaskForm';
import { setCurrentModal, showModal } from '../../store/modal';
import TaskList from '../Tasks';
import './home.css'
import NewTaskButton from '../NewTaskButton';



const HomePage = () => {

    const userId = useSelector(state => state.session.user.id)
    const tasksObj = useSelector(state => state.task)

    const dispatch = useDispatch()

    const [tasks, setTasks] = useState(Object.values(tasksObj))




    useEffect(() => {
        console.log("USEEEFFFEEEECTTT")
        dispatch(getAllTasksThunk(userId))
    }, [dispatch, userId]);

    useEffect(() => {

        setTasks(Object.values(tasksObj))
    }, [setTasks, tasksObj])


    const showAddTaskForm = () => {
        dispatch(setCurrentModal(AddTaskForm))
        dispatch(showModal())
    }


    const currentDate = () => {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const d = new Date();
        let name = month[d.getMonth()];

        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        //const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        const current = name + ' ' + dd + ', ' + yyyy;
        return current
    }


    const compare = (a, b) => {
        const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const taskAMonth = a.due_date.split(' ').slice(1, 4)[1]
        const taskBMonth = b.due_date.split(' ').slice(1, 4)[1]
        const founda = monthName.find(month => month === taskAMonth)
        const foundb = monthName.find(month => month === taskBMonth)
        const foundIdxA = monthName.indexOf(founda)
        const foundIdxB = monthName.indexOf(foundb)

        if (foundIdxA < foundIdxB) {
            return -1;
        }
        if (foundIdxA > foundIdxB) {
            return 1;
        }

        // names must be equal
        else {
            const dateNumA = a.due_date.split(' ').slice(0, 4)[1]
            const dateNumB = b.due_date.split(' ').slice(0, 4)[1]

            if (dateNumA < dateNumB) {
                return -1;
            }
            if (dateNumA > dateNumB) {
                return 1;
            }
            else {
                return 0
            }
        }
    }
    tasks.sort(compare)

    return (
        <div id='inbox-container'>
            <TaskList/>
            <NewTaskButton/>
        </div>
    )

}


export default HomePage