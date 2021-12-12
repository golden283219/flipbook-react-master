import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import './index.css';
import * as serviceWorker from './serviceWorker';
import Flipbook from './containers/FlipBookViewer/Flipbook';
import Homepage from './containers/Homepage/Homepage';

ReactDOM.render(
  <BrowserRouter>
    <Redirect from="/" to="/home" />
    <Route path="/home" component={Homepage} />
    <Route path="/flipbook" render={(props) => <Flipbook {...props} />} component={Flipbook} />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
