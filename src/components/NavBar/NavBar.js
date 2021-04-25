import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <footer className="listviews">
      <button>
        <Link className="list-item" to="/firestore">
          Firestore
        </Link>
      </button>
      <button>
        <Link className="list-item" to="/list">
          List
        </Link>
      </button>
      <button>
        <Link className="list-item" to="/additem">
          Add Item
        </Link>
      </button>
    </footer>
  );
};

export default NavBar;