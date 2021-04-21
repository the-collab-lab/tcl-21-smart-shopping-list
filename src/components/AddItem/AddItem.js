import React, { useState } from 'react';
import { firestore } from '../../lib/firebase.js';
import NavBar from '../NavBar/NavBar';

const AddItem = () => {
  const [groceryItem, setGroceryItem] = useState('');
  const [howSoon, setHowSoon] = useState(null);
  // const listData = firestore.collection('groceryItems'); commented out due to not wanting to direct to the 'groceryItems' collection but use the entire database instead

  const itemInputChange = (e) => {
    setGroceryItem(e.target.value);
  };

  const radioInputChange = (e) => {
    setHowSoon(parseInt(e.target.value));
    console.log(howSoon);
  };

  const cleanUserInput = (item) => {
    // Step 1: Sanitizing and trying out the regular expression symbols and converting to lowercase
    return item.replace(/[\W_]+/g, '').toLowerCase();
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    const existingItem = await duplicateItem(groceryItem); // Step 2: I'm trying to add a new function as a addon that will check for dupe items with an alert
    if (existingItem) {
      // **== I'm stuck on trying to get it to work!! ===**
      alert('The Item already exists!');

      setGroceryItem('');
      setHowSoon(null);
      return;
    }

    firestore.collection(localStorage.getItem('token')).add({
      // new format that allows storage of a item under the right token
      // writing a new document to firestore with these values/fields
      name: groceryItem,
      howSoon: howSoon,
      createdAt: Date.now(),
      purchaseDate: null,
    });

    setGroceryItem('');
    setHowSoon(null);
  };

  const duplicateItem = async (item) => {
    let existingItem = false;
    await firestore // this is new syntax that can apply the sanitize to each individual item using 'querySnapshot'
      .collection(localStorage.getItem('token'))
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // the 'doc' was a property from the firestore docs to I'm trying it out here
          if (
            // created this if statement to target and apply sanitizer to the user input
            cleanUserInput(doc.data().itemName) === cleanUserInput(item)
          ) {
            existingItem = true;
          }
        });
      })
      .catch(() => {
        // trying to get this to function and apply to the correct conditions
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
