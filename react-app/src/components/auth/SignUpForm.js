import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { hideModal } from '../../store/modal';
// import LoginForm from './LoginForm';
import './SignUpForm.css'


const SignUpForm = ({setloginOpen, setSignUpOpen}) => {
  const [errors, setErrors] = useState([]);
  // const [disabled, setDisabled] = useState()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const SignUpButtonStyle = {

    backgroundColor: '#de4c4a',
    borderColor: ' #de4c4a',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    fontFamily: "'Roboto', sans-serif",
    fontSize: '14px',
    fontWeight: 'lighter',
    margin: '10px',
  }

  const onSignUp = async (e) => {
    const errors = []
    e.preventDefault();
    if (username.length < 1) {
      setErrors([...errors, 'Please enter username'])
    }
    if (email.length < 1) {
      setErrors([...errors, 'Please enter email'])
    }
    if (password.length < 1) {
      setErrors([...errors, 'Please enter password'])
    }
    if (repeatPassword.length < 1) {
      setErrors([...errors, 'Please enter password again'])
    }
    if (password !== repeatPassword) {
      setErrors([...errors, 'Passwords must match'])
      return
    }
    if (username && email && password && (password === repeatPassword)) {
      setErrors([])
    }
    if (errors.length < 1) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
      //dispatch(hideModal())

    }

  };
  // const initialProjectData = {
  //   userId: 1,
  //   projectName: 'Inbox',
  //   color: 'none'
  // }
  // return dispatch(createProjectThunk(initialProjectData))
  // const showLoginForm = () => {
  //   dispatch(setCurrentModal(LoginForm))
  // }




  if (user) {
    dispatch(hideModal())
    // initialProject()
    return <Redirect to='/app' />;
  }


  return (
    <div id='sign-up-form'>


      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>User Name </label>
          <input
            type='text'
            name='username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email </label>
          <input
            type='text'
            name='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password </label>
          <input
            type='password'
            name='password'
            onChange={e => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password </label>
          <input
            type='password'
            name='repeat_password'
            onChange={e => setRepeatPassword(e.target.value)}
            value={repeatPassword}

          ></input>
        </div>
        <button style={SignUpButtonStyle} type='submit'>Sign Up</button>
        <button style={SignUpButtonStyle} onClick={() => {setloginOpen(true); setSignUpOpen(false)}}>Already signed up? Log in!</button>
      </form>
    </div>
  );
};

export default SignUpForm;
