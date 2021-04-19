import React, { useState, useEffect } from 'react';
import { firestore } from '../../lib/firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import GroceryItem from '../GroceryItem/GroceryItem';
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom';

const List = ({ token, setToken }) => {
  const listData = firestore.collection('groceryItems');
  const query = listData.where('token', '==', token);
  const [groceryItems] = useCollectionData(query, { idField: 'id' });
  const history = useHistory();

  const clearToken = () => {
    window.localStorage.removeItem('token');
    setToken('');
    history.push('/');
  };

  return (
    <>
      <h1>Current List</h1>
      <p>Current token: {token}</p>
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
          {groceryItems &&
            groceryItems.map((list) => (
              <GroceryItem key={list.id} list={list} />
            ))}
        </ul>
      </div>
    </>
  );
};

export default List;
