import React, { useState } from 'react';
import { firestore } from '../../lib/firebase.js';
import NavBar from '../NavBar/NavBar';

const AddItem = () => {
  const [groceryItem, setGroceryItem] = useState('');
  const [howSoon, setHowSoon] = useState(null);

  const itemInputChange = (e) => {
    setGroceryItem(e.target.value);
  };

  const radioInputChange = (e) => {
    setHowSoon(parseInt(e.target.value));
    console.log(howSoon);
  };

  const cleanUserInput = (item) => {
    return item.replace(/[\W_]+/g, '').toLowerCase(); // using regular expression to sanitize
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    // alert for existing item when user submits the form
    const existingItem = await duplicateItem(groceryItem);
    if (existingItem) {
      alert('The Item already exists!');

      setGroceryItem('');
      setHowSoon(null);
      return;
    }

    // connecting to the firestore with the select fields
    firestore.collection(localStorage.getItem('token')).add({
      name: groceryItem,
      howSoon: howSoon,
      createdAt: Date.now(),
      purchaseDate: null,
    });

    setGroceryItem('');
    setHowSoon(null);
  };

  // targeting the name within the database to check sanitized versions
  const duplicateItem = async (item) => {
    let existingItem = false;
    console.log('token:', localStorage.getItem('token'));
    await firestore
      .collection(localStorage.getItem('token'))
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (cleanUserInput(doc.data().name) === cleanUserInput(item)) {
            existingItem = true;
          }
        });
      })

      // alert that catches an error
      .catch((e) => {
        alert('Sorry, something went wrong!');
      });

    return existingItem;
  };

  return (
    <main className="add-item">
      <NavBar />
      <h1>Add Item</h1>
      <form onSubmit={handleSubmitClick}>
        <label htmlFor="addItem">
          Item Name:
          <input
            id="addItem"
            name="addItem"
            type="text"
            value={groceryItem}
            onChange={itemInputChange}
          />
        </label>
        <br />
        <br />
        <fieldset>
          <p>How soon will you buy this again?</p>
          <div className="radio-group-container">
            <input
              id="soon"
              value="7"
              type="radio"
              name="howSoon"
              onChange={radioInputChange}
              checked={howSoon === 7}
            />
            <label htmlFor="soon"> Soon</label>

            <br />

            <input
              id="kinda-soon"
              value="14"
              type="radio"
              name="howSoon"
              onChange={radioInputChange}
              checked={howSoon === 14}
            />
            <label htmlFor="kinda-soon"> Kind of Soon</label>

            <br />

            <input
              id="not-soon"
              value="30"
              type="radio"
              name="howSoon"
              onChange={radioInputChange}
              checked={howSoon === 30}
            />
            <label htmlFor="not-soon"> Not Soon</label>
          </div>
        </fieldset>{' '}
        <br />
        <input type="submit" value="Add to Shopping List" />
      </form>
    </main>
  );
};

export default AddItem;
