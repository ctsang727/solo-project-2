import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { hideModal, setCurrentModal } from '../../store/modal';
import SignUpForm from './SignUpForm';
// import { getAllTasksThunk } from '../../store/task';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    
    
  };

  if (user) {
    // console.log(user.id)
    // dispatch(getAllTasksThunk(user.id))
    dispatch(hideModal())
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
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
        <button onClick={showSignUpForm}>Sign Up</button>
        <button onClick={demoLogin}>Demo</button>
      </div>
    </form>
  );
};

export default LoginForm;
