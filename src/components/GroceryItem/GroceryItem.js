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

  const LOWEST_PERIOD = 7;
  const HIGHEST_PERIOD = 21;

  const isInactive = () => {
    return (
      currentDate - item.purchaseDate >=
        2 * (item.nextPurchaseDate - item.purchaseDate) ||
      item.numberOfPurchases === 0
    );
  };

  const getAriaLabel = () => {
    if (isInactive()) {
      return `Inactive: ${item.name} has never been purchased or is two times past its estimated repurchase date.`;
    } else if (item.howSoon < LOWEST_PERIOD) {
      return `Need to buy ${item.name} soon`;
    } else if (
      item.howSoon >= LOWEST_PERIOD &&
      item.howSoon <= HIGHEST_PERIOD
    ) {
      return `Need to buy ${item.name} kind of soon`;
    } else if (item.howSoon > HIGHEST_PERIOD) {
      return `Do not need to buy ${item.name} soon`;
    }
  };

  const getBackground = () => {
    if (isInactive()) {
      return 'background-grey';
    } else if (item.howSoon < LOWEST_PERIOD) {
      return 'background-red';
    } else if (
      item.howSoon >= LOWEST_PERIOD &&
      item.howSoon <= HIGHEST_PERIOD
    ) {
      return 'background-yellow';
    } else if (item.howSoon > HIGHEST_PERIOD) {
      return 'background-green';
    }
  };

  return (
    <>
      <p className={getBackground()}>
        <input
          type="checkbox"
          onChange={() => (isChecked ? handleUncheckBox() : setNewDate())}
          checked={isChecked}
          aria-label={getAriaLabel()}
        />
        {item.name} - Repurchase in {item.howSoon} days
        <button
          className="delete-button"
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
      </p>
    </>
  );
};

export default GroceryItem;
