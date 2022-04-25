import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { hideModal, setCurrentModal } from '../../store/modal';
import SignUpForm from './SignUpForm';
import { getAllTasksThunk } from '../../store/task';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const AuthButtons = {
    backgroundColor: '#de4c4a',
    borderColor:' #de4c4a' ,
    color: '#fff' ,
    padding:'10px',
    borderRadius: '5px',
    fontFamily: "'Roboto', sans-serif",
    fontSize: '14px',
    fontWeight: 'lighter',
    margin: '10px',
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    
    
    
  };

  if (user) {
    console.log(user.id)
    dispatch(getAllTasksThunk(user.id))
    
    dispatch(hideModal())
    //window.location.reload(false);
    return <Redirect to='/app' />;
    
  }

  const showSignUpForm = () => {
    dispatch(setCurrentModal(SignUpForm))
  }

  const demoLogin = async (e) => {
    e.preventDefault();
    const email = 'demo@aa.io'
    const password = 'password'

    await dispatch(login(email, password))
    dispatch(hideModal())
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='email'>Email: </label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>Password: </label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        
      </div>
      <button style={AuthButtons} type='submit'>Login</button>
        <button style={AuthButtons} onClick={showSignUpForm}>Sign Up</button>
        <button style={AuthButtons} onClick={demoLogin}>Demo</button>
    </form>
  );
};

export default LoginForm;
