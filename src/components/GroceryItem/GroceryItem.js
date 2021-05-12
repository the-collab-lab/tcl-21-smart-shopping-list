import React, { useState, useEffect } from 'react';
import { firestore } from '../../lib/firebase.js';
import { differenceInDays, addDays } from 'date-fns';
import calculateEstimate from '../../lib/estimates';
import './GroceryItem.css';

const GroceryItem = ({ item }) => {
  const groceryItem = firestore.collection('groceryItems').doc(item.id);
  const [isChecked, setChecked] = useState(false);
  const currentDate = Date.now();
  const ONE_DAY_IN_MILLISECONDS = 60 * 60 * 24 * 1000;

  useEffect(() => {
    if (item.purchaseDate > Date.now() - ONE_DAY_IN_MILLISECONDS) {
      setChecked(true);
    }
  }, []);

  const latestInterval = () => {
    if (item.purchaseDate && item.previousPurchaseDate) {
      return differenceInDays(item.purchaseDate, item.previousPurchaseDate);
    } else {
      return item.howSoon;
    }
  };

  const setNewDate = () => {
    const daysUntilNextPurchase = calculateEstimate(
      item.howSoon,
      latestInterval(),
      item.numberOfPurchases,
    );

    return groceryItem
      .update({
        previousPurchaseDate: item.purchaseDate ? item.purchaseDate : null,
        purchaseDate: currentDate,
        howSoon: daysUntilNextPurchase,
        numberOfPurchases: item.numberOfPurchases + 1,
        nextPurchaseDate: addDays(currentDate, daysUntilNextPurchase).getTime(),
      })
      .then(() => {
        console.log('Document successfully updated!', item.purchaseDate);
        setChecked(true);
      })
      .catch((error) => {
        console.error('Error updating document: ', error, item.purchaseDate);
      });
  };

  // Should we delete the option to uncheck? Otherwise, we can't really reset the previousPurchaseDate in Firestore.
  const handleUncheckBox = () => {
    setChecked(false);
  };

  const deleteItem = () => {
    groceryItem
      .delete(item.id)
      .then(() => {
        console.log('Item has been removed', item.id);
      })
      .catch((error) => {
        console.error('Could not delete this item', error, item.id);
      });
  };

  const getAriaLabel = () => {
    if (
      currentDate - item.purchaseDate >=
        2 * (item.nextPurchaseDate - item.purchaseDate) ||
      item.numberOfPurchases === 0
    ) {
      return 'Inactive';
    } else if (item.howSoon < 7) {
      return 'Need to buy soon';
    } else if (item.howSoon >= 7 && item.howSoon <= 30) {
      return 'Need to buy kind of soon';
    } else if (item.howSoon > 30) {
      return 'Do not need to buy soon';
    }
  };

  const getBackground = () => {
    if (
      currentDate - item.purchaseDate >=
        2 * (item.nextPurchaseDate - item.purchaseDate) ||
      item.numberOfPurchases === 0
    ) {
      return 'background-grey';
    } else if (item.howSoon < 7) {
      return 'background-red';
    } else if (item.howSoon >= 7 && item.howSoon <= 30) {
      return 'background-yellow';
    } else if (item.howSoon > 30) {
      return 'background-green';
    }
  };

  return (
    <>
      <p aria-label={getAriaLabel()} className={getBackground()}>
        <input
          type="checkbox"
          onChange={() => (isChecked ? handleUncheckBox() : setNewDate())}
          checked={isChecked}
        />
        {item.name} - Repurchase in {item.howSoon} days
        <div className="container">
          <button
            className="delete button"
            onClick={() => {
              const confirmation = window.confirm(
                'Did you mean to delete this item?',
              );
              if (confirmation) {
                deleteItem(item.id);
              }
            }}
          >
            Delete
          </button>
        </div>
      </p>
    </>
  );
};

export default GroceryItem;
