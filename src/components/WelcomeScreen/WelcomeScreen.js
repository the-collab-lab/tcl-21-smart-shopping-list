import React from 'react';
import getToken from '../../lib/tokens';
import { useHistory } from 'react-router-dom';

const WelcomeScreen = ({ token, setToken }) => {
  const history = useHistory();

  const getTokens = () => {
    const token = getToken();
    window.localStorage.setItem('token', token);
    setToken(token);
  };
  return (
    <>
      {token ? (
        history.push('/list')
      ) : (
        <div>
          <h1>Welcome to your Smart Shopping list!</h1>
          <button onClick={getTokens}>Create a new list</button>
          <p>- or -</p>
          <p>Join an existing shopping list by entering a three word token.</p>
          <p>Share token</p>
          <form>
            <input type="text" />
            <button>Join an existing list</button>
          </form>
        </div>
      )}
    </>
  );
};

export default WelcomeScreen;
