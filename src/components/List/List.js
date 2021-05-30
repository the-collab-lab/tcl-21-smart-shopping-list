import React, { useState } from 'react';
import { firestore } from '../../lib/firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import GroceryItem from '../GroceryItem/GroceryItem';
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme, Typography, Input } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './List.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  container: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  filterInput: {
    borderRadius: 4,
    border: 1,
    borderColor: theme.primary,
    width: '85%',
  },
}));

const List = ({ token, setToken }) => {
  const groceryItemsRef = firestore.collection('groceryItems');
  const query = groceryItemsRef.where('token', '==', token);
  const [groceryItems, loading, error] = useCollectionData(query, {
    idField: 'id',
  });
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [filterTerm, setFilterTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const clearToken = () => {
    window.localStorage.removeItem('token');
    setToken('');
    history.push('/');
  };

  const searchHandler = (e) => {
    setFilterTerm(e.target.value);
    const filteredItems = groceryItems.filter((item) => {
      return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredData(filteredItems);
  };

  const isGroceryList = () => {
    return !loading && !error && groceryItems && groceryItems.length;
  };

  const sortByHowSoonAndName = (list) => {
    list.sort((a, b) => {
      if (a.howSoon === b.howSoon) {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      }
      return a.howSoon - b.howSoon;
    });
    return list;
  };

  return (
    <>
      {!token ? (
        history.push('/')
      ) : (
        <Container
          component="section"
          className={matchesSM ? classes.mobileContainer : classes.container}
        >
          <Typography variant="h4" color="primary">
            Current List
          </Typography>
          <br />
          <Input
            type="text"
            id="filtered-item"
            placeholder="Filter..."
            value={filterTerm}
            onChange={(event) => searchHandler(event)}
            className={'filterInput'}
          />
          <i
            className="fas fa-times"
            onClick={() => setFilterTerm('')}
            onKeyDown={() => setFilterTerm('')}
            role="button"
            tabIndex={0}
          />
          <div className="grocery-list">
            {isGroceryList() ? (
              <ul>
                {filterTerm
                  ? sortByHowSoonAndName(filteredData).map((item) => (
                      <GroceryItem key={item.id} item={item} />
                    ))
                  : sortByHowSoonAndName(groceryItems).map((item) => (
                      <GroceryItem key={item.id} item={item} />
                    ))}
              </ul>
            ) : (
              <>
                <p>Your shopping list is currently empty.</p>
                <button onClick={() => history.push('/additem')}>
                  Add Item
                </button>
              </>
            )}
          </div>
          <NavBar token={token} setToken={setToken} clearToken={clearToken} />
        </Container>
      )}
    </>
  );
};

export default List;
