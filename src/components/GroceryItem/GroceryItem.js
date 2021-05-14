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

  const LOWEST_PERIOD = 7;
  const HIGHEST_PERIOD = 21;

  const isInactive = () => {
    return (
      currentDate - item.purchaseDate >=
        2 * (item.nextPurchaseDate - item.purchaseDate) ||
      item.numberOfPurchases === 0
    );
  };

  const getAriaLabel = (itemName) => {
    if (isInactive()) {
      return 'Inactive: Item has never been purchased or item is two times past its estimated repurchase time.';
    } else if (item.howSoon < LOWEST_PERIOD) {
      return `Need to buy ${itemName} soon`;
    } else if (
      item.howSoon >= LOWEST_PERIOD &&
      item.howSoon <= HIGHEST_PERIOD
    ) {
      return `Need to buy ${itemName} kind of soon`;
    } else if (item.howSoon > HIGHEST_PERIOD) {
      return `Do not need to buy ${itemName} soon`;
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
          aria-label={getAriaLabel(item.name)}
        />
        {item.name} - Repurchase in {item.howSoon} days
      </p>
    </>
  );
};

export default GroceryItem;
