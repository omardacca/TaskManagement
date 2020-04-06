import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import NavBar from './components/navBar';
import './App.css';

class App extends Component { 
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/tasks" render={(props) => <Tasks {...props} />} />
            <Route path="/addTask" render={(props) => <AddTask {...props} />} />
            <Redirect from="/" to="/tasks"  />
          </Switch>
        </main> 
      </React.Fragment>
    )
  }
}

export default App;
