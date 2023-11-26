import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firestore } from '../../lib/firebase.js';
import { makeStyles, useTheme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NavBar from '../NavBar/NavBar';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { Typography } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  container: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  radioButtons: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  submitButton: {
    textPrimary: theme.palette.common.darkBlue,
  },
}));

const AddItem = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [groceryItem, setGroceryItem] = useState('');
  const [howSoon, setHowSoon] = useState(null);
  const [purchDate, setPurchDate] = useState(null);
  const ONE_DAY_IN_MILLISECONDS = 60 * 60 * 24 * 1000;

  const calculateNextPurchaseDate = (howSoon) => {
    const howManyDaysInSeconds = howSoon * ONE_DAY_IN_MILLISECONDS;
    return Date.now() + howManyDaysInSeconds;
  };

  const itemInputChange = (e) => {
    setGroceryItem(e.target.value);
  };

  const radioInputChange = (e) => {
    setHowSoon(parseInt(e.target.value));
    console.log(howSoon);
  };

  const cleanUserInput = (item) => {
    return item.replace(/[\W_]+/g, '').toLowerCase(); // using regular expression to sanitize
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    // alert for existing item when user submits the form
    const existingItem = await duplicateItem(groceryItem);
    if (existingItem) {
      alert('The Item already exists!');
      setPurchDate(null);
      setGroceryItem('');
      setHowSoon(null);
      return;
    }

    // connecting to the firestore with the select fields
    firestore.collection('groceryItems').add({
      name: groceryItem,
      howSoon: howSoon,
      createdAt: Date.now(),
      numberOfPurchases: 0,
      purchaseDate: null,
      previousPurchaseDate: null,
      nextPurchaseDate: calculateNextPurchaseDate(howSoon),
      token: props.token,
    });
    setPurchDate(null);
    setGroceryItem('');
    setHowSoon(null);
  };

  // targeting the name within the database to check sanitized versions
  const duplicateItem = async (item) => {
    let existingItem = false;
    console.log('token:', localStorage.getItem('token'));
    await firestore
      .collection('groceryItems')
      .where('token', '==', props.token)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (cleanUserInput(doc.data().name) === cleanUserInput(item)) {
            existingItem = true;
          }
        });
      })
      .catch((e) => {
        alert('Sorry, something went wrong!');
      });

    return existingItem;
  };

  const clearToken = () => {
    window.localStorage.removeItem('token');
    props.setToken('');
    history.push('/');
  };

  return (
    <Container
      component="section"
      className={matchesSM ? classes.mobileContainer : classes.container}
    >
      <Typography color="primary" variant="h4">
        Add Item
      </Typography>
      <br></br>
      <form onSubmit={handleSubmitClick} className={classes.radioButtons}>
        <label htmlFor="addItem">Add Item</label>
        <input
          id="addItem"
          name="addItem"
          type="text"
          value={groceryItem}
          onChange={itemInputChange}
          placeholder="Item Name"
          color="primary"
        />
        <br />
        <br />
        <p>How soon will you buy this again?</p>
        <div className="radio-group-container">
          <input
            id="soon"
            value="7"
            type="radio"
            name="howSoon"
            onChange={radioInputChange}
            checked={howSoon === 7}
          />
          <label htmlFor="soon"> Soon</label>

          <br />
          <input
            id="kinda-soon"
            value="14"
            type="radio"
            name="howSoon"
            onChange={radioInputChange}
            checked={howSoon === 14}
          />
          <label htmlFor="kinda-soon">Kind of Soon</label>
          <br />
          <input
            id="not-soon"
            value="30"
            type="radio"
            name="howSoon"
            onChange={radioInputChange}
            checked={howSoon === 30}
          />
          <label htmlFor="not-soon">Not Soon</label>
        </div>
        <br />
        <Button
          color="primary"
          className={classes.submitButton}
          type="submit"
          value="Add to Shopping List"
        >
          Add to Shopping List
        </Button>
      </form>
      <NavBar
        token={props.token}
        setToken={props.setToken}
        clearToken={clearToken}
      />
    </Container>
  );
};

export default AddItem;
