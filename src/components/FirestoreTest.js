import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../lib/firebase.js';

function FirestoreTest() {
  return (
    // Creating component with embedded children
    <section>
      <ShoppingListControl />
    </section>
  );
}

function ShoppingListControl() {
  // component housing headquarters
  const listData = firestore.collection('lists');
  const query = listData.orderBy('createdAt'); // query the subset of documents and order them by date
  const [lists] = useCollectionData(query, { idField: 'id' }); // listen and re-render documents in real time
  const [listName, setListName] = useState(''); // starting the form as an empty string

  const handleAddingList = async (e) => {
    e.preventDefault(); // stopping the auto-refresh of the page
    await listData.add({
      // writing a new document to firestore with the select values/fields
      name: listName,
      createdAt: Date.now(),
    });
    setListName(''); // reset back to empty screen after submission
  };

  return (
    <>
      <h1>Smart Shopping App</h1>
      <main>
        <h2> My Shopping Lists</h2>

        <ul>
          {lists && // map over the array of list items
            lists.map((list) => <ShoppingList key={list.id} list={list} />)}
        </ul>

        <form onSubmit={handleAddingList}>
          <input
            value={listName}
            onChange={(e) => setListName(e.target.value)} // recording user input
            placeholder="List Name"
          />
          <button type="submit" disabled={!listName}>
            Add New List
          </button>
        </form>
      </main>
    </>
  );

  function ShoppingList(props) {
    // the child component that renders each list entry with a delete button
    const { name, id } = props.list;
    const docRef = firestore.doc(`lists/${id}`);

    const handleDelete = async () => {
      // delete button functionality with tests
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
