import React, { useState, useEffect } from 'react';
import { firestore } from '../../lib/firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import GroceryItem from '../GroceryItem/GroceryItem';
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom';

const List = ({ token, setToken }) => {
  const listData = firestore.collection('groceryItems'); // decided to connect with the 'groceryitems' Collection to see if it will render and successfully it does. Ultimately we want to get the 'Items' Collection inside of 'Lists'
  const query = listData.orderBy('createdAt');
  const [groceryItems] = useCollectionData(query, { idField: 'id' });
  const history = useHistory();

  // Removes Token from Local Storage; trying to implement with Global State
  const clearToken = () => {
    window.localStorage.removeItem('token');
    setToken('');
    history.push('/');
  };

  return (
    <>
      <h1>Current List</h1>
      {!token ? (
        history.push('/')
      ) : (
        <div>
          <div>Current List</div>
          <button onClick={clearToken}>Clear Current Token</button>
          <NavBar />
        </div>
      )}
      <div className="each-item">
        <ul>
          {groceryItems && // map over the array of list items
            groceryItems.map((list) => (
              <GroceryItem key={list.id} list={list} />
            ))}
        </ul>
      </div>
    </>
  );
};

export default List;
