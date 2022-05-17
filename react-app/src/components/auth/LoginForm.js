import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

import './LoginForm.css'

const LoginForm = ({ setSignUpOpen, setloginOpen }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const AuthButtons = {
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

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      setloginOpen(false)
      history.push('/app/today') 
    }
  };

  // if (user) {
  //   console.log(user.id)
  //   dispatch(getAllTasksThunk(user.id))
  //   console.log('good')
  //   dispatch(hideModal())
  //   history.push('/app')
  //   //window.location.reload(false);
  //   return <Redirect to='/app' />;

  // }


  const demoLogin = async (e) => {
    e.preventDefault();
    const email = 'demo@aa.io'
    const password = 'password'

    await dispatch(login(email, password))
    history.push('/app')
    return <Redirect to='/app' />;
  }

  return (

    <form id='log-in-form' onSubmit={onLogin}>
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
      <button style={AuthButtons} onClick={() => { setloginOpen(false); setSignUpOpen(true) }}>Sign Up</button>
      <button style={AuthButtons} onClick={demoLogin}>Demo</button>
    </form>

  );
};

export default LoginForm;
