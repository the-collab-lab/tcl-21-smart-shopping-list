import React from 'react';

const GroceryItem = ({ item }) => {
  return (
    <>
      <li>{item.name}</li>
    </>
  );
};

export default GroceryItem;
