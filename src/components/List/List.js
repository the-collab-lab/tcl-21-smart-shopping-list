import React, { useState, useEffect } from 'react';
import { firestore } from '../../lib/firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import GroceryItem from '../GroceryItem/GroceryItem';
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom';

const List = ({ token, setToken }) => {
  // const listData = firestore.collection('groceryItems');
  const listData = firestore.collection(token);
  // const query = listData.where('token', '==', token);
  const [groceryItems] = useCollectionData(listData, { idField: 'id' });
  const history = useHistory();

  const clearToken = () => {
    window.localStorage.removeItem('token');
    setToken('');
    history.push('/');
  };

  return (
    <>
      {!token ? (
        history.push('/')
      ) : (
        <>
          <h1>Current List</h1>
          <p>Current token: {token}</p>
          <button data-testid="clearTokenButton" onClick={clearToken}>
            Clear Current Token
          </button>
          <div className="each-item">
            <ul>
              {groceryItems &&
                groceryItems.map((list) => (
                  <GroceryItem key={list.id} list={list} />
                ))}
            </ul>
          </div>
          <NavBar />
        </>
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
