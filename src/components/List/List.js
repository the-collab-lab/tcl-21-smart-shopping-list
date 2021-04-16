import React, { useState } from 'react';
import { firestore } from '../../lib/firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import GroceryItem from '../GroceryItem/GroceryItem';

const List = () => {
  const { token } = props;
  const listData = firestore.collection('groceryItems');
  const query = listData.orderBy('createdAt'); // query the subset of documents and order them by date
  const [lists] = useCollectionData(query, { idField: 'id' }); // listen and re-render documents in real time

  console.log(listData);

  return (
    <>
      <h1>Current List</h1>
      <div className="each-item">
        <ul>
          {lists && // map over the array of list items
            lists.map((list) => {
              if (list.token === token)
                return (
                  console.log(list), (<GroceryItem key={list.id} list={list} />)
                );
            })}
        </ul>
      </div>
    </>
  );
};

export default List;
