import React, { useState } from 'react';
import { firestore } from '../../lib/firebase.js';
import NavBar from '../NavBar/NavBar';

const AddItem = (props) => {
  const [groceryItem, setGroceryItem] = useState('');
  const [howSoon, setHowSoon] = useState(null);
  const [purchDate, setPurchDate] = useState(null);
  const ONE_DAY_IN_MILLISECONDS = 60 * 60 * 24 * 1000;

  const calculateNextPurchaseDate = (howSoon) => {
    const howManyDaysInSeconds = howSoon * ONE_DAY_IN_MILLISECONDS;
    return Date.now() + howManyDaysInSeconds;
  };

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
      setPurchDate(null);
      setGroceryItem('');
      setHowSoon(null);
      return;
    }

    // connecting to the firestore with the select fields
    firestore.collection('groceryItems').add({
      name: groceryItem,
      howSoon: howSoon,
      createdAt: Date.now(),
      numberOfPurchases: 0,
      purchaseDate: null,
      previousPurchaseDate: null,
      nextPurchaseDate: calculateNextPurchaseDate(howSoon),
      token: props.token,
    });
    setPurchDate(null);
    setGroceryItem('');
    setHowSoon(null);
  };

  // targeting the name within the database to check sanitized versions
  const duplicateItem = async (item) => {
    let existingItem = false;
    console.log('token:', localStorage.getItem('token'));
    await firestore
      .collection('groceryItems')
      .where('token', '==', props.token)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (cleanUserInput(doc.data().name) === cleanUserInput(item)) {
            existingItem = true;
          }
        });
      })
      .catch((e) => {
        alert('Sorry, something went wrong!');
      });

    return existingItem;
  };

  return (
    <section className="add-item">
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
      <NavBar />
    </section>
  );
};

export default AddItem;
