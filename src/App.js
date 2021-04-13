import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import FirestoreTest from './components/FirestoreTest';
import List from './components/List/List';
import AddItem from './components/AddItem/AddItem';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';

function App() {
  return (
    <Router>
      <div className="main-div">
        <Switch>
          <Route exact path="/">
            <WelcomeScreen />
          </Route>
          <Route path="/list">
            <List />
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
