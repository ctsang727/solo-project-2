
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodayTasksThunk } from '../../store/task';
import AddTaskForm from '../TaskForms/AddTaskForm';
import './today.css'
import Modal2 from '../Modal2/modal2';
import TaskList from '../Tasks';
import NewTaskButton from '../NewTaskButton';



const TodayPage = () => {

    const userId = useSelector(state => state.session.user.id)
    const tasksObj = useSelector(state => state.task)
    // const history = useHistory();
    const dispatch = useDispatch()
    //console.log('on today page')

    const [tasks, setTasks] = useState(Object.values(tasksObj))
    // const [editIndex, setEditIndex] = useState(null)
    // const [deleteIndex, setDeleteIndex] = useState(null)
    //const [showEditForm, setShowEditIndex] = useState(null)

    useEffect(() => {
        
        dispatch(getTodayTasksThunk(userId))
    }, [dispatch, userId]);

    useEffect(() => {
        
        setTasks(Object.values(tasksObj))
        
    }, [ tasksObj, setTasks])

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
    
    const [isOpen, setIsOpen] = useState(false)
    

    
    const condition = 'today' 

    return (
        <div className='main-page'>
            
            <Modal2 open={isOpen} setisOpen={setIsOpen} onClose={e => {e.stopPropagation();setIsOpen(false)}}>
                <AddTaskForm open={isOpen} setIsOpen={setIsOpen} onClose={() => setIsOpen(false)}/>
            </Modal2>
            
            <h1 id='h1-home'>HEY YOU HAVE STUFF TO DO!</h1>
            <div id='home-date'>
                <h2 >Today</h2>
                <h4>{currentDate()}</h4>
            </div>
            <TaskList condition={condition}/>
            <NewTaskButton/>
        </div>
    )

}


export default TodayPage