import React, { useState, useEffect } from 'react';
import { firestore } from '../../lib/firebase.js';
import calculateEstimate from '../../lib/estimates';

const GroceryItem = ({ item }) => {
  const groceryItem = firestore.collection('groceryItems').doc(item.id);
  const [isChecked, setChecked] = useState(false);

  const oneday = 60 * 60 * 24 * 1000;

  const fromMilliSecToDays = (time) => Math.ceil(time / 86400000);

  const workOutNextPurchDate = (howSoon) => {
    const howManyDaysInSeconds = howSoon * oneday;
    return Date.now() + howManyDaysInSeconds;
  };

  const howManyDays = () => {
    const milliSecsBetween = item.nextPurchase - Date.now();
    return fromMilliSecToDays(milliSecsBetween);
  };

  useEffect(() => {
    if (item.purchaseDate > Date.now() - oneday) {
      setChecked(true);
    }
  }, []);

  const setNewDate = () => {
    return groceryItem
      .update({
        purchaseDate: Date.now(),
        nextPurchase: workOutNextPurchDate(item.howSoon),
      })
      .then(() => {
        console.log('Document successfully updated!', item.purchaseDate);
        setChecked(true);
      })
      .catch((error) => {
        console.error('Error updating document: ', error, item.purchaseDate);
      });
  };

  console.log(item.purchaseDate);

  const resetDate = () => {
    return groceryItem
      .update({
        purchaseDate: null,
        // purchaseDate: item.purchaseDate,
      })
      .then(() => {
        setChecked(false);
        return false;
      });
  };

  return (
    <>
      <p>
        <input
          type="checkbox"
          onChange={() => (isChecked ? resetDate() : setNewDate())}
          checked={isChecked}
        />
        {item.name} - Repurchase in {howManyDays()} days
      </p>
    </>
  );
};

export default GroceryItem;
