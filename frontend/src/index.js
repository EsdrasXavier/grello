import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { BrowserRouter, Router, Route } from 'react-router-dom';
import history from './history';
import { Provider } from 'react-redux';
import { Store } from './store';

ReactDOM.render(

  <Provider store={Store}>
  <BrowserRouter>
    <Router history={history}>
      <Route path="/" exact={true} component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
    </Router>
  </ BrowserRouter>
  </Provider>
  , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
