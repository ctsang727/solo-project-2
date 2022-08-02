import React, { useState, useEffect, createContext } from 'react';
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
//import Modal from './components/Modal/Modal'
import SpecificTask from './components/SpecificTask';
import Sidebar from './components/Sidebar';
import ProjectPage from './components/Projects/ProjectPage';
import SplashPage from './components/Splash/splashpage'
import AboutPage from './components/About';
import TodayPage from './components/Home/today';
import TaskList from './components/Tasks';
import './index.css'


export const ThemeContext = createContext(null)

function App() {
  const [loaded, setLoaded] = useState(false);
  const storedDarkMode = () => {
    if (localStorage.getItem("DARK_MODE") === null) return 'light'
    else return localStorage.getItem("DARK_MODE")
  }

  const [theme, setTheme] = useState(storedDarkMode);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);



  const toggleTheme = () => {
    setTheme((currTheme) => (currTheme === "light" ? "dark" : "light"));

  }

  useEffect(() => {
    //console.log(`Is in dark mode? ${theme}`);
  }, [theme]);

  if (!loaded) {
    return null;
  }

  localStorage.setItem("DARK_MODE", theme);



  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div id={theme}>
          <NavBar id={theme} toggleTheme={toggleTheme} theme={theme} setTheme={setTheme} >

          </NavBar>
          {/* <Modal /> */}
          <Sidebar id={theme} toggleTheme={toggleTheme} theme={theme} setTheme={setTheme} />
          <Switch  >
            
            <Route   path='/' exact={true} >
              <SplashPage id={theme} toggleTheme={toggleTheme} theme={theme} setTheme={setTheme} />
            </Route>

            <Route exact path='/about' component={AboutPage} />

            <ProtectedRoute exact path='/users'  >
              <UsersList />
            </ProtectedRoute>

            <ProtectedRoute path='/users/:userId' exact={true} >
              <User />
            </ProtectedRoute>

            <ProtectedRoute path='/app/task/:taskId'>
              <SpecificTask />
            </ProtectedRoute>

            <ProtectedRoute exact path='/test' component={TaskList}>
            </ProtectedRoute>

            <ProtectedRoute path='/app' exact={true} >
              <HomePage />
            </ProtectedRoute>

            <ProtectedRoute path='/app/projects/:id' exact={true} >
              <ProjectPage />
            </ProtectedRoute>

            <ProtectedRoute>
              <TodayPage path='/app/today/' exact={true} />
            </ProtectedRoute>

          </Switch>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
