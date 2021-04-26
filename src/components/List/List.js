import React from 'react';
import { firestore } from '../../lib/firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import GroceryItem from '../GroceryItem/GroceryItem';
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom';

const List = ({ token, setToken }) => {
  const groceryItemsRef = firestore.collection('groceryItems');
  const query = groceryItemsRef.where('token', '==', token);

  const [groceryItems, loading, error] = useCollectionData(query, {
    idField: 'id',
  }); // added constants that detect the query's state so that page doesn't render when the query is still loading
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
          <p>
            Share your token: <strong>{token}</strong>
          </p>
          <button data-testid="clearTokenButton" onClick={clearToken}>
            Return to welcome screen
          </button>

          <div className="grocery-list">
            {!loading && !error && groceryItems && groceryItems.length ? (
              <ul>
                {groceryItems.map((item) => (
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
        </>
      )}
    </>
  );
};

export default List;
