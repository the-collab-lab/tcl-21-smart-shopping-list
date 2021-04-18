import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import FirestoreTest from './components/FirestoreTest';
import List from './components/List/List';
import AddItem from './components/AddItem/AddItem';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';

function App() {
  const [token, setToken] = useState(window.localStorage.getItem('token'));

  return (
    <Router>
      <div className="main-div">
        <Switch>
          <Route exact path="/">
            <WelcomeScreen token={token} setToken={setToken} />
          </Route>
          <Route path="/list">
            <List token={token} setToken={setToken} />
          </Route>
          <Route path="/additem">
            <AddItem />
          </Route>
          <Route path="/firestore">
            <FirestoreTest />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
