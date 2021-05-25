import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import './App.css';
import FirestoreTest from './components/FirestoreTest';
import List from './components/List/List';
import AddItem from './components/AddItem/AddItem';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import ThemeTest from './components/ThemeTest';
import theme from './lib/theme';

function App() {
  const [token, setToken] = useState(window.localStorage.getItem('token'));

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <main className="main-div">
          <Switch>
            <Route exact path="/">
              <WelcomeScreen token={token} setToken={setToken} />
            </Route>
            <Route path="/list">
              <List token={token} setToken={setToken} />
            </Route>
            <Route path="/additem">
              <AddItem token={token} />
            </Route>
            <Route path="/firestore">
              <FirestoreTest />
            </Route>
            <Route path="/theme">
              <ThemeTest />
            </Route>
          </Switch>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
