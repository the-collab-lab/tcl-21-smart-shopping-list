import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import './App.css';
import List from './components/List/List';
import AddItem from './components/AddItem/AddItem';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/additem">
            <AddItem />
          </Route>
        </Switch>
        <Link to="/list">List</Link>
        <Link to="/additem">Add Item</Link>
      </div>
    </Router>
  );
}

export default App;
