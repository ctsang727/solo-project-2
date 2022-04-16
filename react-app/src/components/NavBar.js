
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useDispatch, useSelector } from 'react-redux';
import AddTaskForm from '../components/TaskForms/AddTaskForm'
import { showModal, setCurrentModal } from '../store/modal';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';

import './NavBar.css'



const NavBar = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);


  const showLoginForm = () => {
    dispatch(setCurrentModal(LoginForm));
    dispatch(showModal())
  }

  const showSignUpForm = () => {
    dispatch(setCurrentModal(SignUpForm));
    dispatch(showModal())
  }

  const showAddTaskForm = () => {
    dispatch(setCurrentModal(AddTaskForm))
    dispatch(showModal())
  }
  return (
    
      <nav id='navContainer'>

        <div className='nav-div'>
          <NavLink to='/app' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        {!user && 
        <div className='nav-div'> 
          <div onClick={showLoginForm}>LOG IN</div>
          <div onClick={showSignUpForm}>SIGN UP</div>
        </div>
        }
        {user && 
        <div></div>
        }

        <div className='nav-div'>
          <button onClick={showAddTaskForm}>ADD TASK</button>
          <LogoutButton />
        </div>

      </nav>
    
  );
}

export default NavBar;
/* <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li> */
        /* <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li> */