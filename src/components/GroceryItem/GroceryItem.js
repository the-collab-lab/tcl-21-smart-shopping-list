import React from 'react';

const GroceryItem = ({ list }) => {
  return (
    <>
      <li>{list.name}</li>
    </>
  );
};

export default GroceryItem;
