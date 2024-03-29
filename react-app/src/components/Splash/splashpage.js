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
    borderRadius:'5px',
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
        //console.log(signUpOpen)
    }, [signUpOpen])
    return (
        <div id='splash-main' >
            <>
                <div id='splash-words'>
                    <h1>Welcome!</h1>
                    <h2>Hey! You have stuff to do!</h2>
                    <p>This web app is a clone of Todoist, a to-do list app.</p>
                    <p>Simply add tasks to your to-do list by hitting the '+' buttons or 'Add Task' button. <br></br>
                        When completed, click the check button to mark complete and move on to your next task.
                    </p>
                    <p>
                        Create projects to keep all your tasks organized.
                    </p>
                    <p>Log in or sign up to start!</p>
                    <p style={{ fontSize: '10px' }}>Made by Christopher Tsang</p>
                </div>

                <div id='buttons-and-icons' >
                    <div style={splashButtonStyle} onClick={() => setloginOpen(true)}>LOG IN</div>
                    <Modal2 theme={theme} open={loginOpen} onClose={e => { e.stopPropagation(); setloginOpen(false) }}>
                        <LoginForm open={signUpOpen} setloginOpen={setloginOpen} setSignUpOpen={setSignUpOpen} />
                    </Modal2>

                    <div style={splashButtonStyle} onClick={() => setSignUpOpen(true)}>SIGN UP</div>
                    <Modal2 theme={theme} open={signUpOpen} onClose={e => { e.stopPropagation(); setSignUpOpen(false) }}>
                        <SignUpForm open={loginOpen} setloginOpen={setloginOpen} setSignUpOpen={setSignUpOpen} />
                    </Modal2>
                    <div>
                        <a style={{ fontWeight: 'bold' }} href="https://github.com/ctsang727"><i class="fa-brands fa-github"></i></a>
                    </div>
                    <div>
                        <a style={{ fontWeight: 'bold' }} href="https://www.linkedin.com/in/christopher-tsang-827b1b127/"><i class="fa-brands fa-linkedin-in"></i> </a>
                    </div>
                </div>
            </>





        </div>
    )
}

export default SplashPage