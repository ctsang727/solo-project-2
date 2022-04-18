import React from 'react';

import { NavLink } from 'react-router-dom';
import './Sidebar.css'

const navLinkStyle = {
  textDecoration: 'none',
  color: 'white',
  margin: '10px'

}
const Sidebar = () => {
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
        
          Projects
        
      </div>
      <div></div>




    </div>
  );
};

export default Sidebar