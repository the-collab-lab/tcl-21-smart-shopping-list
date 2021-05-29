import React, { useState } from 'react';
import getToken from '../../lib/tokens';
import { useHistory } from 'react-router-dom';
import { firestore } from '../../lib/firebase';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  Button,
  Grid,
  Typography,
  Icon,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 400,
    borderRadius: '20px',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const WelcomeScreen = ({ token, setToken }) => {
  const [oldToken, setOldToken] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();

  const getTokens = async () => {
    const newToken = getToken();

    // Option 1: A&V's Implementation
    try {
      // Using the 'set' method over the 'add' method b/c we want to create our own doc id that is equal to the token for easy referencing later
      await firestore.collection('lists').doc(newToken).set({
        name: newToken,
        createdAt: Date.now(),
      });
      window.localStorage.setItem('token', newToken);
      setToken(newToken);
    } catch (error) {
      console.log('Error creating list in db: ', error);
    }

    // Option 2: Compatible with T&T's Implementation
    // window.localStorage.setItem('token', newToken);
    // setToken(newToken);
  };

  const handleExistingToken = async (e) => {
    e.preventDefault();

    try {
      // Option 1: A&V's Implementation
      const doc = await firestore.collection('lists').doc(oldToken).get();
      if (doc.exists) {
        // Option 2: Compatible with T&T's Implementation
        // const querySnapshot = await firestore.collection(oldToken).get();
        // if (querySnapshot.docs.length) {

        window.localStorage.setItem('token', oldToken);
        setToken(oldToken);
        setErrorMsg('');
      } else {
        setErrorMsg(`Token '${oldToken}' doesn't exist.`);
      }
    } catch (error) {
      console.log('Error retrieving list: ', error);
    }
  };

  const classes = useStyles();

  return (
    <>
      {token ? (
        history.push('/list')
      ) : (
        <>
          <h1>Welcome to your Smart Shopping list!</h1>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography variant="h4" style={{ backgroundColor: 'grey' }}>
                    Creating A New List
                  </Typography>
                  <Typography variant="h6">
                    <p>
                      <ul>
                        <li>
                          Clicking the "+" button will take you to an empty
                          shopping list
                        </li>

                        <li>
                          There you can add or delete items in your shopping
                          list
                        </li>
                        <li>
                          Creating a new list will generate a unique three word
                          token that you can use or share to access a previous
                          list
                        </li>
                      </ul>
                    </p>
                  </Typography>
                  <CardActionArea>
                    <CardActions>
                      <Button
                        data-testid="createListButton"
                        onClick={getTokens}
                      >
                        <Icon fontSize="large">add_circle</Icon>
                      </Button>
                    </CardActions>
                  </CardActionArea>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <CardActionArea>
                    <Typography
                      variant="h4"
                      style={{ backgroundColor: 'grey' }}
                    >
                      Join an Existing List
                    </Typography>
                    <Typography variant="h6">
                      <p>
                        <ul>
                          <li>
                            Use the three word token generated at list creation
                            to return to an existing shopping list
                          </li>
                        </ul>
                      </p>
                    </Typography>

                    <form onSubmit={handleExistingToken}>
                      <label htmlFor="oldToken">Share Token:</label>
                      <input
                        type="text"
                        id="oldToken"
                        value={oldToken}
                        onChange={(e) => setOldToken(e.target.value)}
                      />

                      <CardActions>
                        <Button
                          data-testid="joinListButton"
                          disabled={!oldToken}
                        >
                          Go To List
                        </Button>
                      </CardActions>
                    </form>
                  </CardActionArea>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <p data-testid="errorMsg" className="error-message">
            {errorMsg}
          </p>
        </>
      )}
    </>
  );
};

export default WelcomeScreen;
