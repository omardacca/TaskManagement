import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    return ( 
        <nav class="navbar navbar-expand-lg navbar-light bg-light navBarStyle">
            <Link className="navbar-brand" to="/">
                CriskCo
            </Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <NavLink class="nav-link" to="/tasks">Tasks</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink class="nav-link" to="/addTask">Add Task</NavLink>
                </li>
                </ul>
            </div>
        </nav>
     );
}
 
export default NavBar;