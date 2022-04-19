import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../Sidebar';

const SplashPage = () => {
    return (
        <div  style={{marginLeft: '500px'}}>
        <h1>Welcome!</h1>
            <h2>Hey you have stuff to do!</h2>
            <p>This web app is a clone of Todoist, a to-do list app.</p>
            <p>Simply add tasks to your to-do list by hitting the '+' buttons or 'Add Task' button.
                When completed, hit the check button to mark complete and move on to your next task.
            </p>
            <p>
                Create projects to keep all your tasks organized.
            </p>
        </div>
    )
}

export default SplashPage