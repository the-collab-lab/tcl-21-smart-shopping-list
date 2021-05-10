import React, { useState } from 'react';
import { firestore } from '../../lib/firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import GroceryItem from '../GroceryItem/GroceryItem';
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom';
import './List.css';

const List = ({ token, setToken }) => {
  const groceryItemsRef = firestore.collection('groceryItems');
  const query = groceryItemsRef.where('token', '==', token);
  const [groceryItems, loading, error] = useCollectionData(query, {
    idField: 'id',
  });
  const history = useHistory();
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
        <section className="list">
          <h1>Current List</h1>
          <button data-testid="clearTokenButton" onClick={clearToken}>
            Return to welcome screen
          </button>
          <p>
            Share your token: <strong>{token}</strong>
          </p>
          <hr />
          <label htmlFor="filtered-item">Filter Items</label>
          <input
            type="text"
            id="filtered-item"
            placeholder="Start typing here..."
            value={filterTerm}
            onChange={(event) => searchHandler(event)}
            className="list-input"
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
          <NavBar />
        </section>
      )}
    </>
  );
};

export default List;
