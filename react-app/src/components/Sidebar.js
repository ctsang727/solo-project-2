import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddProjectForm from './Projects/AddProjectForm';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'
import { getAllProjectsThunk } from '../store/project';
import { setCurrentModal, showModal } from '../store/modal'



const navLinkStyle = {
  textDecoration: 'none',
  color: 'white',
  margin: '10px'

}

const Sidebar = () => {
  const dispatch = useDispatch()

  const showAddProjectForm = () => {
    dispatch(setCurrentModal(AddProjectForm))
    dispatch(showModal())
  }
 
  const [projects, setProjects] = useState([])

  const userId = useSelector(state => state.session.user?.id)
  const projectsObj = useSelector(state => state.projects)

  useEffect(() => {
    // console.log('dispatching', userId)
    dispatch(getAllProjectsThunk(userId))
  }, [dispatch, userId])

  useEffect(() => {
    setProjects(Object.values(projectsObj))
  }, [projectsObj])




  return (
    <div className='sidebar-container'>
      <div id='today-side-div'>
        <div className='navlink-div'>
          <NavLink style={navLinkStyle} to='/'>
            <i style={{ color: '#5297ff' }} className="fa-solid fa-note-sticky"></i> Inbox
          </NavLink>
        </div>

        <div className='navlink-div'>
          <NavLink style={navLinkStyle} to='/' >
            <i style={{ color: '#25b84c' }} className="fa-solid fa-calendar"></i> Today
          </NavLink>
        </div>
        <div className='navlink-div'>
          <NavLink style={navLinkStyle} to='/' >
            <i style={{ color: '#a970ff' }} className="fa-solid fa-calendar-days"></i> Upcoming
          </NavLink>
        </div>
      </div>

      <div id='projects-side-div'>
        <div id='projects-header'>
          <div id='projects-text'>
            <h3>Projects</h3>
          </div>
          <div id='project-button' >
            <i onClick={showAddProjectForm} style={{ fontSize: '18px' }} className="material-icons">add</i>
          </div>
        </div>

        {userId &&
          <div id='current-projects'>
            {projects?.map(project => (
              <div id='one-project' key={project.id}>
                <NavLink style={navLinkStyle} to={`/app/projects/${project.id}`}><i style={{color:`${project.color}`}} className='material-icons'>fiber_manual_records</i>{project.project_name}</NavLink>
              </div>
            ))}
          </div>
        }

      </div>
      <div></div>

    </div>
  );
};

export default Sidebar