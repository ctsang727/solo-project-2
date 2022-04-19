import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteProjectThunk, getAllProjectTasksThunk } from '../../store/project';
import Sidebar from '../Sidebar';


const ProjectPage = () => {
    const dispatch = useDispatch()
    const [ptasks, setpTasks] = useState([])
    const history = useHistory()
    const {id} = useParams()
    console.log('IDDDDDDDD', id)
    const userId = useSelector(state => state.session.user.id)
    const projectsObj = useSelector(state => state?.projects)
    console.log('@@@@', projectsObj)

    useEffect(() => {
        console.log('USEEFFECT PROJECTPAGE')
        dispatch(getAllProjectTasksThunk(id))
    }, [dispatch, id]);

    useEffect(() => {
        //console.log('useEffect 2 tasksObj', projectsObj)
        setpTasks(Object.values(projectsObj))
    }, [projectsObj])

    const onDelete = (e) => {
        e.preventDefault()
        dispatch(deleteProjectThunk(+id))
        history.push('/app')
    }



    return(
        <div>
            <button style={{marginLeft: '500px'}} onClick={onDelete}>Delete</button>
            {ptasks?.map(ptask => (
                <p style={{marginLeft: '500px'}}>{ptask?.description}</p>
            ))}
        </div>
    )



}

export default ProjectPage