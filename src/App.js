import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import List from './components/List/List';
import AddItem from './components/AddItem/AddItem';

function App() {
  return (
    <Router>
      <div className="main-div">
        <Switch>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/additem">
            <AddItem />
          </Route>
        </Switch>
        <div className="listviews">
          <button>
            <Link className="list-item" to="/list">
              List
            </Link>
          </button>
          <button>
            <Link className="list-item" to="/additem">
              Add Item
            </Link>
          </button>
        </div>
      </div>
    </Router>
  );
}

export default App;
