import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import LoginForm from './components/auth/LoginForm';
// import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import HomePage from './components/Home/index';
import Modal from './components/Modal/Modal'
import SpecificTask from './components/SpecificTask';
import Sidebar from './components/Sidebar';
import ProjectPage from './components/Projects/ProjectPage';
import SplashPage from  './components/Splash/splashpage'
import AboutPage from './components/About';
import TodayPage from './components/Home/today';
import TaskList from './components/Tasks';




function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  // const [theme, setTheme] = useState('light');
  // const themeToggle = () => {
  //   theme === 'light' ? setTheme('dark') : setTheme('light')
  // }
  

  return (
    <BrowserRouter>
      <NavBar />
      <Modal />
      <Sidebar />
      <Switch>
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route> */}
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>


        <Route exact path='/about' component={AboutPage}/>

        
        

        <ProtectedRoute exact path='/users'  >
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        

        <ProtectedRoute path = '/app/task/:taskId'>
          <SpecificTask />
        </ProtectedRoute>

        <ProtectedRoute exact path='/test' component={TaskList}>
        </ProtectedRoute>

        <ProtectedRoute path = '/app' exact={true} >
          <HomePage />
        </ProtectedRoute>

        <ProtectedRoute path = '/app/projects/:id' exact={true} >
          <ProjectPage />
        </ProtectedRoute>

        <ProtectedRoute>
          <TodayPage path='/app/today/' exact={true}/>
        </ProtectedRoute>

        
        

        

        

        

        
      </Switch>
      
    </BrowserRouter>
  );
}

export default App;
