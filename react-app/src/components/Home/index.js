
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllTasksThunk } from '../../store/task';
import NewTaskButton from '../NewTaskButton';
import TaskList from '../Tasks';
import './home.css'




const HomePage = () => {

    const userId = useSelector(state => state.session.user.id)
    const tasksObj = useSelector(state => state.task)

    const dispatch = useDispatch()

    const [tasks, setTasks] = useState(Object.values(tasksObj))




    useEffect(() => {
        //console.log("USEEEFFFEEEECTTT")
        dispatch(getAllTasksThunk(userId))
    }, [dispatch, userId]);

    useEffect(() => {

        setTasks(Object.values(tasksObj))
    }, [setTasks, tasksObj])


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
    const condition = 'inbox';
    return (
        <>
            <div id='inbox-large-container'>
                <div id='inbox-container'>

                    <h1>Inbox</h1>

                    <TaskList condition={condition} />

                    <NewTaskButton />

                </div>
            </div>
        </>
    )

}


export default HomePage