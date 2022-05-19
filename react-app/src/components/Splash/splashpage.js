import React, { useState, useEffect } from 'react';
// import { showModal, setCurrentModal } from '../../store/modal'
// import { useDispatch } from 'react-redux';
import LoginForm from '../auth/LoginForm';
import { useSelector } from 'react-redux';
import SignUpForm from '../auth/SignUpForm';
import './splash.css'
import Modal2 from '../Modal2/modal2';
import { useHistory } from 'react-router-dom';

const splashButtonStyle = {
    backgroundColor: ' #db4c3f',
    color: '#fff',
    margin: '10px',
    width: '5%',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center'
}

const SplashPage = ({ toggleTheme, theme }) => {
    // const dispatch = useDispatch()
    // const [isOpen, setIsOpen] = useState(false)
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    // const showLoginForm = () => {
    //     dispatch(setCurrentModal(LoginForm));
    //     dispatch(showModal())
    // }

    // const showSignUpForm = () => {
    //     dispatch(setCurrentModal(SignUpForm));
    //     dispatch(showModal())
    // }
    if (user) {
        history.push('/app')
    }


    const [loginOpen, setloginOpen] = useState(false)
    const [signUpOpen, setSignUpOpen] = useState(false)

    useEffect(() => {
        console.log(signUpOpen)
    }, [signUpOpen])
    return (
        <div id='splash-main' >
            <h1>Welcome!</h1>
            <h2>Hey! You have stuff to do!</h2>
            <p>This web app is a clone of Todoist, a to-do list app.</p>
            <p>Simply add tasks to your to-do list by hitting the '+' buttons or 'Add Task' button. <br></br>
                When completed, double click the check button to mark complete and move on to your next task.
            </p>
            <p>
                Create projects to keep all your tasks organized.
            </p>
            <p>Log in or sign up to start!</p>

            <div style={{ display: 'flex' }}>
                <div style={splashButtonStyle} onClick={() => setloginOpen(true)}>LOG IN</div>
                <Modal2 theme={theme} open={loginOpen} onClose={e => { e.stopPropagation(); setloginOpen(false) }}>
                    <LoginForm open={signUpOpen} setloginOpen={setloginOpen} setSignUpOpen={setSignUpOpen} />
                </Modal2>

                <div style={splashButtonStyle} onClick={() => setSignUpOpen(true)}>SIGN UP</div>
                <Modal2 theme={theme} open={signUpOpen}  onClose={e => { e.stopPropagation(); setSignUpOpen(false) }}>
                    <SignUpForm open={loginOpen} setloginOpen={setloginOpen} setSignUpOpen={setSignUpOpen} />
                </Modal2>
            </div>

            <p >Made by Christopher Tsang</p>
            <p ><a style={{ fontWeight: 'bold' }} href="https://github.com/ctsang727">Github </a></p>
            <p ><a style={{ fontWeight: 'bold' }} href="https://github.com/ctsang727/solo-project-2">Project Repo </a></p>
            <p ><a style={{ fontWeight: 'bold' }} href="https://www.linkedin.com/in/christopher-tsang-827b1b127/">LinkedIn </a></p>

        </div>
    )
}

export default SplashPage