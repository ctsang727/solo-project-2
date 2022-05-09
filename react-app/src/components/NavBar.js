
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useDispatch, useSelector } from 'react-redux';
import AddTaskForm from '../components/TaskForms/AddTaskForm'
import { showModal, setCurrentModal } from '../store/modal';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import Modal2 from './Modal2/modal2';
import ReactSwitch from 'react-switch';
import './NavBar.css'



const NavBar = ({ toggleTheme, theme }) => {
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
  const [isOpen, setIsOpen] = useState(false)


  return (

    <nav id='navContainer'>

      <div className='nav-div'>
        <NavLink to='/app' exact={true} activeClassName='active'>
          <i style={{ fontSize: '18px' }} class="fa-solid fa-house"></i>
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

      {user &&
        <div className='nav-div'>
          <button onClick={() => setIsOpen(true)}>
            <i style={{ fontSize: '20px' }} class="material-icons">add</i>
            <Modal2 theme={theme} open={isOpen} setisOpen={setIsOpen} onClose={e => { e.stopPropagation(); setIsOpen(false) }}>
              <AddTaskForm onClose={e => { e.stopPropagation(); setIsOpen(false) }} ></AddTaskForm>
            </Modal2>
          </button>
          <NavLink to='/about'><i style={{ fontSize: '20px' }} class="material-icons">info_outline</i></NavLink>
          <div>
            <ReactSwitch onChange={toggleTheme} checked={theme === 'dark'} />
          </div>
          <LogoutButton />
        </div>
      }

    </nav>

  );
}

export default NavBar;
