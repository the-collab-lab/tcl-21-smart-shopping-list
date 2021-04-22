import React, { useState } from 'react';
import getToken from '../../lib/tokens';
import { useHistory } from 'react-router-dom';
import { firestore } from '../../lib/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const WelcomeScreen = ({ token, setToken }) => {
  const [oldToken, setOldToken] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();

  const getTokens = async () => {
    const token = getToken();
    window.localStorage.setItem('token', token);
    setToken(token);
    // try {
    //   await firestore.collection('lists').doc(token).set({
    //     name: token,
    //     createdAt: Date.now(),
    //   });
    //   window.localStorage.setItem('token', token);
    //   setToken(token);
    // } catch (error) {
    //   console.log('Error creating list in db: ', error);
    // }
  };

  const handleExistingToken = async (e) => {
    e.preventDefault();
    try {
      // const doc = await firestore.collection('lists').doc(oldToken).get();
      const listRef = await firestore.collection(oldToken).get();

      if (listRef.docs.length) {
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
          <p>Share token</p>
          <form onSubmit={handleExistingToken}>
            <label htmlFor="oldToken" className="hide-element">
              Share Token
            </label>
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
          <p data-testid="errorMsg" style={{ color: 'red' }}>
            {errorMsg}
          </p>
        </>
      )}
    </>
  );
};

export default WelcomeScreen;
