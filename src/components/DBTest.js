import React from 'react';
import { fb } from '../lib/firebase.js';

const firestore = fb.firestore();

const Test = () => {
  firestore.collection('lists').add({
    name: 'My Grocery List',
  });

  return (
    <h1>Hello, world!</h1>
    // Form
    // Input: Name of List

    // Displaying the List
    // List Item Component
    // Delete Button Component
  );
};

export default Test;
