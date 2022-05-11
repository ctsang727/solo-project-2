import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteProjectThunk, getAllProjectTasksThunk, editProjectThunk } from '../../store/project';
import { deleteTaskThunk, getAllTasksThunk } from '../../store/task';
import './ProjectPage.css'
import { NavLink } from 'react-router-dom';



const ProjectPage = () => {
    const dispatch = useDispatch()

    const [showEdit, setShowEdit] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const [deleteIndex, setDeleteIndex] = useState(null)

    // const [isInbox, setIsInbox] = useState(false)
    const [errors, setErrors] = useState([])

    const history = useHistory()
    const { id } = useParams()
    const userId = useSelector(state => state.session.user.id)
    const projectsObj = useSelector(state => state?.projects)
    const testProjectsObj = useSelector(state => state?.projects[id])
    const projectTasks = Object.values(projectsObj).filter(i => i.project_id === +id)
    
    //const projTasksFiltered = Object.values(projectsObj).filter(i => i.project_id)

    const [projectName, setProjectName] = useState(projectsObj[+id]?.project_name)
    const [color, setColor] = useState('red')

    console.log('TEST', testProjectsObj)
    console.log('TEST2', +id)

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
    projectTasks.sort(compare)

    

    useEffect(() => {
        dispatch(getAllTasksThunk(userId))
        dispatch(getAllProjectTasksThunk(id))
        setProjectName(projectsObj[+id]?.project_name)
    }, [dispatch, setProjectName, id, userId]);

    useEffect(() => {
        const errors = []

        if (projectName?.replace(/\s+/g, '').length === 0) {
            errors.push('No project name')
        }
        setErrors(errors)
    }, [projectName])

    // console.log('?>?>', projectTasks)

    const onDelete = async (e) => {
        e.preventDefault()
        await projectTasks.forEach(task => dispatch(deleteTaskThunk(task.id)))
        await dispatch(deleteProjectThunk(+id))
        await dispatch(getAllTasksThunk(userId))
        history.push('/app')
    }

    const clickEdit = () => {
        setShowEdit(!showEdit)
    }



    const editProject = (e) => {
        e.preventDefault()
        const editProject = {
            id,
            projectName,
            userId,
            color
        }
        console.log('COLOR', color)
        setShowEdit(!showEdit)
        return dispatch(editProjectThunk(editProject))
    }



    return (
        <div className='main-page'>
            

            {!showEdit &&
                <div>
                    <h1>{projectsObj[id]?.project_name}</h1>

                    <div id='project-page-buttons'>
                        <button onClick={onDelete}>Delete Project</button>
                        <button onClick={clickEdit}>Edit Project</button>
                    </div>

                </div>


            }
            {showEdit &&
                    <><form onSubmit={editProject} >
                        {errors.length > 0 &&
                            <div>Please enter project name</div>
                        }
                        <div id='project-change-name'>
                            <input
                                type='text'
                                name='projectName'
                                value={projectName}
                                placeholder='Project name'
                                onChange={e => setProjectName(e.target.value)}>
                            </input>
                        </div>

                        <div>
                            <label>Color: </label>
                            <select
                                name='color'
                                value={color}
                                onChange={e => setColor(e.target.value)}>
                                <option value={'red'}>Red</option>
                                <option value={'blue'}>Blue</option>
                                <option value={'yellow'}>Yellow</option>
                                <option value={'white'}>None</option>
                            </select>
                        </div>
                        {errors.length === 0 &&
                            <button id='project-edit-submit' type='submit'>Submit</button>
                        }

                        <button id='project-edit-cancel' onClick={() => setShowEdit(!showEdit)}>Cancel</button>
                    </form>
                    </>}
            

            <div id='tasks-container'>
                {/* tasklist component but with projectTasks */}
                {projectTasks?.map(task => (
                    <div className='one-task' key={task?.id}>
                        {/* <div onClick={() => redirect(task?.id)} className='task-name'> */}
                        <div id='task-check' onClick={() => setDeleteIndex(deleteIndex => deleteIndex === task.id ? null : task.id)}>
                            {deleteIndex === task.id &&
                                <div value={task?.id} >
                                    <i key={task?.id} onClick={() => dispatch(deleteTaskThunk(task.id))} className="material-icons">check</i>
                                </div>
                            }

                            {deleteIndex !== task.id &&
                                <div>
                                    <i className="material-icons">check</i>
                                </div>
                            }
                        </div>

                        <NavLink id='task-info' to={`/app/task/${task?.id}`}>
                            <div className='task-info'>
                                <h3> {task?.task_name} </h3>
                                <div className='one-desc' key={task?.id}>
                                    <p> {task?.description} </p>
                                </div>
                                <div>
                                    <p> {task?.due_date.split(' ').slice(1, 4).join(' ')} </p>
                                </div>
                            </div>
                        </NavLink>


                        <div onClick={() => setEditIndex(editIndex => editIndex === task.id ? null : task.id)}><i className="fa-solid fa-ellipsis fa-2x"></i></div>
                        <div></div>
                        {editIndex === task.id &&
                            <div className='task-dropdown'>
                                <ul key={task?.id}>

                                    <li value={task?.id} style={{ borderRadius: '3px', padding: '5px', color: '#de4c4a', cursor: 'pointer' }} onClick={e => dispatch(deleteTaskThunk(e.target.value))}>Delete</li>
                                    <li><NavLink style={{ padding: '5px', textDecoration: 'none', color: 'white' }} to={`/app/task/${task?.id}`}>More</NavLink></li>
                                </ul>
                            </div>}
                    </div>
                ))
                }

                
            </div>
        </div>
    )
}

export default ProjectPage