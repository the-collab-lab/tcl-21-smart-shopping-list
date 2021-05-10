import React, { useState, useEffect } from 'react';
import { firestore } from '../../lib/firebase.js';
import { differenceInDays, addDays } from 'date-fns';
import calculateEstimate from '../../lib/estimates';
import './GroceryItem.css';

const GroceryItem = ({ item }) => {
  const groceryItem = firestore.collection('groceryItems').doc(item.id);
  const [isChecked, setChecked] = useState(false);
  const [ariaLabel, setAriaLabel] = useState('');
  const [background, setBackground] = useState('');
  const currentDate = Date.now();
  const ONE_DAY_IN_MILLISECONDS = 60 * 60 * 24 * 1000;

  useEffect(() => {
    if (item.purchaseDate > Date.now() - ONE_DAY_IN_MILLISECONDS) {
      setChecked(true);
    }
    if (
      currentDate - item.purchaseDate >=
        2 * (item.nextPurchaseDate - item.purchaseDate) ||
      item.numberOfPurchases === 0
    ) {
      setAriaLabel('Inactive');
      setBackground('background-grey');
    } else if (item.howSoon < 7) {
      setAriaLabel('Need to buy soon');
      setBackground('background-red');
    } else if (item.howSoon >= 7 && item.howSoon <= 30) {
      setAriaLabel('Need to but kind of soon');
      setBackground('background-yellow');
    } else if (item.howSoon > 30) {
      setAriaLabel('Do not need to buy soon');
      setBackground('background-green');
    }
  }, [isChecked]);

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

  return (
    <>
      <p aria-label={ariaLabel} className={background}>
        <input
          type="checkbox"
          onChange={() => (isChecked ? handleUncheckBox() : setNewDate())}
          checked={isChecked}
        />
        {item.name} - Repurchase in {item.howSoon} days
      </p>
    </>
  );
};

export default GroceryItem;
