import React from 'react';
import { firestore } from '../../lib/firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import GroceryItem from '../GroceryItem/GroceryItem';
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom';

const List = ({ token, setToken }) => {
  // Option 1: A&V's Implementation
  const groceryItemsRef = firestore.collection('groceryItems');
  const query = groceryItemsRef.where('token', '==', token);

  // Option 2: Compatible with T&T's Implementation
  // const query = firestore.collection(token);

  const [groceryItems] = useCollectionData(query, { idField: 'id' });
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
            <ul>
              {groceryItems &&
                groceryItems.map((item) => (
                  <GroceryItem key={item.id} item={item} />
                ))}
            </ul>
          </div>
          <NavBar />
        </>
      )}
    </>
  );
};

export default List;
