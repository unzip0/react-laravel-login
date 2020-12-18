import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { store } from './store/store';

import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Dashboard from './components/Dashboard/Dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
    return (
        <Provider store={store}> 
          <Router>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/dashboard" component={Dashboard}></Route>
            <Redirect exact from="/" to="/login" />
          </Router>
        </Provider>
    )
}
if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
  }
  