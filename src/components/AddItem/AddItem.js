import React, { useState } from 'react';
import { firestore } from '../../lib/firebase.js';
import NavBar from '../NavBar/NavBar';

const AddItem = () => {
  const [groceryItem, setGroceryItem] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(null);
  const [howSoon, setHowSoon] = useState(null);
  const listData = firestore.collection('groceryItems');

  const itemInputChange = (e) => {
    setGroceryItem(e.target.value);
  };

  const dateInputChange = (e) => {
    setPurchaseDate(e.target.value);
  };
  const radioInputChange = (e) => {
    setHowSoon(parseInt(e.target.value));
    console.log(howSoon);
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    await listData.add({
      // writing a new document to firestore with the select values/fields
      name: groceryItem,
      frequency: howSoon,
      token: window.localStorage.getItem('token'),
      createdAt: Date.now(),
      purchaseDate: purchaseDate,
    });

    setGroceryItem('');
    setHowSoon(null);
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
        {/* 

        extra form option for purchase date 
        
        <label htmlFor="purchaseDate">
          Date of Purchase:
          <input
            id="purchaseDate"
            name="addItem"
            type="date"
            value={purchaseDate}
            onChange={dateInputChange}
          />
        </label> */}
        <br></br>
        <input type="submit" value="Add to Shopping List" />
      </form>
    </main>
  );
};

export default AddItem;
