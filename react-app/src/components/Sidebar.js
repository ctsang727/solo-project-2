import React from 'react';
import { useDispatch } from 'react-redux';
import AddProjectForm from './Projects/AddProjectForm';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'
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

  return (
    <div className='sidebar-container'>
      <div id='today-side-div'>
        <div className='navlink-div'>
          <NavLink style={navLinkStyle} to='/'>
            <i style={{ color: '#5297ff' }} class="fa-solid fa-note-sticky"></i> Inbox
          </NavLink>
        </div>

        <div className='navlink-div'>
          <NavLink style={navLinkStyle} to='/' >
            <i style={{ color: '#25b84c' }} class="fa-solid fa-calendar"></i> Today
          </NavLink>
        </div>
        <div className='navlink-div'>
          <NavLink style={navLinkStyle} to='/' >
            <i style={{ color: '#a970ff' }} class="fa-solid fa-calendar-days"></i> Upcoming
          </NavLink>
        </div>
        <div className='navlink-div'>
          <NavLink style={navLinkStyle} to='/' >
            Filters and Labels
          </NavLink>
        </div>
      </div>
      <div id='projects-side-div'>
        <div id='projects-header'>
          <div id='projects-text'>
            <h3>Projects</h3>
          </div>
          <div id='project-button' >
            <i onClick={showAddProjectForm} style={{fontSize: '18px'}} class="material-icons">add</i>
          </div>
          
        </div>
        
        
          
        
      </div>
      <div></div>




    </div>
  );
};

export default Sidebar