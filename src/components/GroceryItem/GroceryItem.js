import React, { useState, useEffect } from 'react';
import { firestore } from '../../lib/firebase.js';
import { differenceInDays, addDays } from 'date-fns';
import calculateEstimate from '../../lib/estimates';

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
        nextPurchaseDate: addDays(currentDate, daysUntilNextPurchase),
      })
      .then(() => {
        console.log('Document successfully updated!', item.purchaseDate);
        setChecked(true);
      })
      .catch((error) => {
        console.error('Error updating document: ', error, item.purchaseDate);
      });
  };

  const resetDate = () => {
    setChecked(false);
  };

  return (
    <>
      <p>
        <input
          type="checkbox"
          onChange={() => (isChecked ? resetDate() : setNewDate())}
          checked={isChecked}
        />
        {item.name} - Repurchase in {item.howSoon} days
      </p>
    </>
  );
};

export default GroceryItem;
