import React, { useState } from 'react';
import getToken from '../../lib/tokens';
import { useHistory } from 'react-router-dom';
import { firestore } from '../../lib/firebase';

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

  return (
    <>
      {token ? (
        history.push('/list')
      ) : (
        <>
          <h1>Welcome to your Smart Shopping list!</h1>
          <button data-testid="createListButton" onClick={getTokens}>
            Create a new list
          </button>
          <p>- or -</p>
          <p>Join an existing shopping list by entering a three word token.</p>
          <form onSubmit={handleExistingToken}>
            <label htmlFor="oldToken">Share Token:</label>
            <input
              type="text"
              id="oldToken"
              value={oldToken}
              onChange={(e) => setOldToken(e.target.value)}
            />
            <button data-testid="joinListButton" disabled={!oldToken}>
              Join an existing list
            </button>
          </form>
          <p data-testid="errorMsg" className="red-text">
            {errorMsg}
          </p>
        </>
      )}
    </>
  );
};

export default WelcomeScreen;
