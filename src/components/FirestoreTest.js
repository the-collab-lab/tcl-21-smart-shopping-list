import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../lib/firebase.js';

function FirestoreTest() {
  return (
    <section>
      <ShoppingListControl />
    </section>
  );
}

function ShoppingListControl() {
  const listData = firestore.collection('lists');
  const query = listData.orderBy('createdAt');
  const [lists] = useCollectionData(query, { idField: 'id' });
  const [listName, setListName] = useState('');

  const handleAddingList = async (e) => {
    e.preventDefault();
    await listData.add({
      name: listName,
      createdAt: Date.now(),
    });
    setListName('');
  };

  return (
    <>
      <h1>Smart Shopping App</h1>
      <main>
        <form onSubmit={handleAddingList}>
          <input
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="List Name"
          />
          <button type="submit" disabled={!listName}>
            Add New List
          </button>
        </form>
        <h2> My Shopping Lists</h2>
        <ul>
          {lists &&
            lists.map((list) => <ShoppingList key={list.id} list={list} />)}
        </ul>
      </main>
    </>
  );

  function ShoppingList(props) {
    const { name, id } = props.list;
    const docRef = firestore.doc(`lists/${id}`);

    const handleDelete = async () => {
      try {
        await docRef.delete();
        console.log('Document successfully deleted from Firestore!');
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    };

    return (
      <div id={id}>
        <li style={{ listStyleType: 'none' }}>{name}</li>
        <button onClick={handleDelete}>Delete</button>
      </div>
    );
  }
}

export default FirestoreTest;
