import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editTaskThunk, getTaskThunk, deleteTaskThunk } from '../../store/task';
import { getAllProjectsThunk } from '../../store/project';
import Sidebar from '../Sidebar';


const ProjectPage = () => {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const projectsObj = useSelector(state => state.projects)


    return(
        <h1>Project pageeeeeee</h1>
    )



}

export default ProjectPage