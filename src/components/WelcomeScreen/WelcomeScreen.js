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
  TextField,
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
  text: {
    justifyContent: 'center',
    fontFamily: 'Mulish',
  },
  button: {
    justifyContent: 'center',
    fontFamily: 'Mulish',
    backgroundColor:
      'linear-gradient( 0deg, rgba(84,101,255,1) 0%, rgba(203,243,240,1), 100%)',
    '&:hover': {
      backgroundColor: '#5465ff',
    },
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
          <h1 className={classes.text}>Welcome to your Smart Shopping list!</h1>

          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography
                    variant="h4"
                    className={classes.text}
                    style={{ backgroundColor: '#5465ff', borderRadius: '10px' }}
                  >
                    Creating A New List
                  </Typography>
                  <Typography
                    className={classes.text}
                    variant="h6"
                    style={{
                      padding: '1rem',
                      display: 'flex',
                    }}
                  >
                    <p className={classes.text}>
                      <ul>
                        <li style={{ padding: '1rem' }}>
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
                  <Typography
                    variant="h4"
                    className={classes.text}
                    style={{
                      backgroundColor: '#5465ff',
                      borderRadius: '10px',
                      padding: '0rem',
                    }}
                  >
                    Join an Existing List
                  </Typography>
                  <Typography
                    variant="h6"
                    className={classes.text}
                    style={{
                      padding: '1rem',
                      display: 'flex',
                    }}
                  >
                    <p>
                      <ul>
                        <li style={{ padding: '1rem' }}>
                          Use the three word token generated at list creation to
                          return to an existing shopping list
                        </li>
                        <li>
                          You will find your most recently created token stored
                          in the sidebar of your shopping list view
                        </li>
                      </ul>
                    </p>
                  </Typography>

                  <label
                    className={classes.text}
                    style={{ fontSize: '20px' }}
                    htmlFor="oldToken"
                  >
                    Share Your Token Here:
                  </label>
                  <TextField
                    type="text"
                    id="oldToken"
                    value={oldToken}
                    onChange={(e) => setOldToken(e.target.value)}
                    style={{
                      marginLeft: '6px',
                      marginBottom: '80px',
                      height: '20px',
                      width: '200px',
                    }}
                  />
                  <CardActionArea>
                    <CardActions className={classes.button}>
                      <Button
                        className={classes.button}
                        data-testid="joinListButton"
                        disabled={!oldToken}
                        onClick={(e) => handleExistingToken(e)}
                      >
                        Go To List
                      </Button>
                    </CardActions>
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
