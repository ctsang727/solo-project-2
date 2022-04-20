import React from 'react';
import { showModal, setCurrentModal } from '../../store/modal'
import { useDispatch } from 'react-redux';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';

const splashButtonStyle = {
    backgroundColor:' #db4c3f',
    color: '#fff',
    margin: '10px',
    width: '5%',
    padding: '10px',
    display:'flex',
    justifyContent:'center'
}

const SplashPage = () => {
    const dispatch = useDispatch()

    const showLoginForm = () => {
        dispatch(setCurrentModal(LoginForm));
        dispatch(showModal())
    }

    const showSignUpForm = () => {
        dispatch(setCurrentModal(SignUpForm));
        dispatch(showModal())
    }

    return (
        <div style={{ marginLeft: '500px' }}>
            <h1>Welcome!</h1>
            <h2>Hey you have stuff to do!</h2>
            <p>This web app is a clone of Todoist, a to-do list app.</p>
            <p>Simply add tasks to your to-do list by hitting the '+' buttons or 'Add Task' button.
                When completed, hit the check button to mark complete and move on to your next task.
            </p>
            <p>
                Create projects to keep all your tasks organized.
            </p>
            <p>Log in or sign up to start!</p>
            <div style={{display:'flex'}}>
                <div style={splashButtonStyle} onClick={showLoginForm}>LOG IN</div>
                <div style={splashButtonStyle} onClick={showSignUpForm}>SIGN UP</div>
            </div>

        </div>
    )
}

export default SplashPage