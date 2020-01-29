import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
// import PrivateRoute from "react-private-route";
import './App.css';

import PrivateRoute from './components/PrivateRoute'
import FriendsList from './components/FriendsList';
import Login from './components/Login';
import Public from './components/Public';

function App() {
  return (
      <Router>
          <div className="App">
              <ul className="Navigation">
                  <li>
                      <Link to="/public">Public Page</Link>
                  </li>
                  <li>
                      <Link to="/protected">Protected Page</Link>
                  </li>
              </ul>
              <Switch>
                  <PrivateRoute path='/protected' component={FriendsList} />
                  <Route path="/public" component={Public} />
                  <Route path="/login" component={Login} />
                  <Route component={Login} /> {/*If no other path has been met, route to Login*/}
              </Switch>
          </div>
      </Router>
  );
}

export default App;
