import React from 'react';

import { NavLink } from 'react-router-dom';
import './Sidebar.css'

const navLinkStyle = {
    textDecoration: 'none',
    color:'white',

}
const Sidebar = () => {
  return (
    <div className='sidebar-container'>
      <NavLink style={navLinkStyle} to='/'> 
        Home
      </NavLink>

      <NavLink style={navLinkStyle} to='/' > 
        Laravel
      </NavLink>

      <NavLink style={navLinkStyle} to='/' > 
        Angular
      </NavLink>

      <NavLink style={navLinkStyle} to='/' > 
        React
      </NavLink>

      <NavLink style={navLinkStyle} to='/' > 
        Vue
      </NavLink>

      <NavLink style={navLinkStyle} to='/' > 
        Node
      </NavLink>
    </div>
  );
};

export default Sidebar