
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useDispatch } from 'react-redux';

import { showModal, setCurrentModal } from '../store/modal';

import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';

import './NavBar.css'


const NavBar = () => {
  const dispatch = useDispatch();

  const showLoginForm = () => {
    dispatch(setCurrentModal(LoginForm));
    dispatch(showModal())
  }

  const showSignUpForm = () => {
    dispatch(setCurrentModal(SignUpForm));
    dispatch(showModal())
  }
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/app' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <div onClick={showLoginForm}>LOG IN</div>
        </li>
        <li>
          <div onClick={showSignUpForm}>SIGN UP</div>
        </li>
        {/* <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li> */}
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
