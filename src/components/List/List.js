import React, { useState, useEffect } from 'react';
import { firestore } from '../../lib/firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import GroceryItem from '../GroceryItem/GroceryItem';
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom';

const List = ({ token, setToken }) => {
  const [listData] = useCollectionData(
    firestore //changed the 'listData' variable to the entire database to render different collections instead of the one "groceryItems" collection
      .collection(localStorage.getItem('token'))
      .orderBy('createdAt'),
  );

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
          <button onClick={clearToken}>Clear Current Token</button>{' '}
          {/*This button literally clears and resets the list and token*/}
          <NavBar />
        </div>
      )}
      <div className="each-item">
        <ul>
          {listData && // map over the array of list items with the given token
            listData.map((list) => <GroceryItem key={list.id} list={list} />)}
        </ul>
      </div>
    </>
  );
};

export default List;
