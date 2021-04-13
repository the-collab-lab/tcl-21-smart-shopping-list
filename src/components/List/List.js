import React, { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom';

const List = (props) => {
  const history = useHistory();

  // Removes Token from Local Storage; trying to implement with Global State
  const clearToken = (props) => {
    window.localStorage.removeItem('token');
    props.setToken('');
    history.push('/');
  };

  return (
    <>
      {!props.token ? (
        history.push('/')
      ) : (
        <div>
          <div>Current List</div>
          <button onClick={clearToken}>Clear Current Token</button>
          <NavBar />
        </div>
      )}
    </>
  );
};

export default List;
