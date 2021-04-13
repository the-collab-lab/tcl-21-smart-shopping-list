import React, { useState } from 'react';

const AddItem = () => {
  const [groceryItem, setGroceryItem] = useState('');
  const [howSoon, setHowSoon] = useState(null);

  const itemInputChange = (e) => {
    setGroceryItem(e.target.value);
  };

  // const howSoon = (e) => {
  //   setHowSoon(e.target.value)
  // }

  const radioInputChange = (e) => {
    setHowSoon(parseInt(e.target.value));
    console.log(howSoon);
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    setGroceryItem('');
    setHowSoon(null);
  };

  // return (
  //   <>
  //     <h1>Add an Item</h1>
  //     <form onSubmit>
  //       <p>Item name:</p>
  //       <input
  //         type="text"
  //         value={groceryItem}
  //         onChange={itemInputChange}
  //         />
  //         <div className="radio-button">
  //           Soon
  //           <input
  //             type="radio"
  //             value="7"
  //             name="howSoon"
  //             onChange={radioInputChange}
  //             checked={howSoon === 7}
  //           />
  //         </div>
  //         <div className="radio-button">
  //           Kind of Soon
  //           <input
  //             type="radio"
  //             value="14"
  //             name="howSoon"
  //             onChange={radioInputChange}
  //             checked={howSoon === 14}
  //           />
  //         </div>
  //         <div className="radio-button">
  //           Not Soon
  //           <input
  //             type="radio"
  //             value="30"
  //             name="howSoon"
  //             onChange={radioInputChange}
  //             checked={howSoon === 30}
  //           />
  //         </div>
  //         <button
  //           className="add-item-button"
  //           onSubmit={handleSubmitClick}
  //         >
  //           Add item
  //         </button>
  //     </form>
  //   </>
  //   )

  return (
    <main className="add-item">
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
            <label htmlFor="soon">Soon</label>
            <input
              id="soon"
              value="7"
              type="radio"
              name="howSoon"
              onChange={radioInputChange}
              checked={howSoon === 7}
            />
            <br />

            <label htmlFor="kinda-soon">Kind of Soon</label>
            <input
              id="kinda-soon"
              value="14"
              type="radio"
              name="howSoon"
              onChange={radioInputChange}
              checked={howSoon === 14}
            />
            <br />

            <label htmlFor="not-soon">Not Soon</label>
            <input
              id="not-soon"
              value="30"
              type="radio"
              name="howSoon"
              onChange={radioInputChange}
              checked={howSoon === 30}
            />
          </div>
        </fieldset>{' '}
        <br />
        <input type="submit" value="Add to Shopping List" />
      </form>
    </main>
  );
};

export default AddItem;
