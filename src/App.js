import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import './App.css';
import FirestoreTest from './components/FirestoreTest';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import List from './components/List/List';
import AddItem from './components/AddItem/AddItem';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import ThemeTest from './components/ThemeTest';
import theme from './lib/theme';

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    marginTop: '30vh',
  },
});

function App() {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Container variant="main" className={`main-div ${classes.container}`}>
          <Switch>
            <Route exact path="/">
              <WelcomeScreen token={token} setToken={setToken} />
            </Route>
            <Route path="/list">
              <List token={token} setToken={setToken} />
            </Route>
            <Route path="/additem">
              <AddItem token={token} setToken={setToken} />
            </Route>
            <Route path="/firestore">
              <FirestoreTest />
            </Route>
            <Route path="/theme">
              <ThemeTest />
            </Route>
          </Switch>
        </Container>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
