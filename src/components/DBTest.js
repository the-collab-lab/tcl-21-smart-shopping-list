import React, { useState } from 'react';
import { fb } from '../lib/firebase.js';

const firestore = fb.firestore();

const Test = () => {
  const [lists, setLists] = useState([]);

  // firestore.collection('lists')
  //   .orderBy('createdAt', 'asc')
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       const newList = lists.push(doc.data());
  //       setLists(newList);
  //     })
  //   })
  //   .catch((error) => {
  //     console.log("Error: ", error);
  //   });

  const handleAddListSubmission = (e) => {
    e.preventDefault();
    firestore.collection('lists').add({
      name: e.target.name.value,
      createdAt: Date.now(),
    });
    e.target.name.value = '';
  };

  return (
    <React.Fragment>
      <h1>Smart Shopping App</h1>

      <form id="add-list-form" onSubmit={handleAddListSubmission}>
        <input id="name" name="name" type="text" placeholder="List Name" />
        <button type="submit">Add New List</button>
      </form>

      <h2> My Grocery Lists</h2>

      <ul>
        {/* {lists.map((list, idx) => {
          return (
            <li key={idx}>{list.name}</li>
          )
        })} */}
      </ul>
    </React.Fragment>
  );
};

export default Test;
