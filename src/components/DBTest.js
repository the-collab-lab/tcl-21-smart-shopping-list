import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { fb } from '../lib/firebase.js';

const firestore = fb.firestore();

function Test() {
  return (
    <section>
      <ListForm />
    </section>
  );
}

function ListForm() {
  const listData = firestore.collection('lists');
  const query = listData.orderBy('createdAt');

  const [listNames] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendListName = async (e) => {
    e.preventDefault();

    await listData.add({
      name: formValue,
      createdAt: Date.now(),
    });

    setFormValue('');
  };

  return (
    <>
      <h1>Smart Shopping App</h1>
      <main>
        <h2> My Grocery Lists</h2>
        {listNames && listNames.map((list) => <ListItem name={list} />)}
      </main>

      <form onSubmit={sendListName}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="List Name"
        />

        <button type="submit" disabled={!formValue}>
          Add New List
        </button>
      </form>
    </>
  );

  function ListItem(props) {
    const { name } = props.name;
    return (
      <>
        <ul>
          <li>{name}</li>
        </ul>
      </>
    );
  }

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

  // const handleAddListSubmission = (e) => {
  //   e.preventDefault();
  //   firestore.collection('lists').add({
  //     name: e.target.name.value,
  //     createdAt: Date.now(),
  //   });
  //   e.target.name.value = '';
  // };

  // return (
  //   <React.Fragment>
  //     <h1>Smart Shopping App</h1>

  //     <form id="add-list-form" onSubmit={handleAddListSubmission}>
  //       <input id="name" name="name" type="text" placeholder="List Name" />
  //       <button type="submit">Add New List</button>
  //     </form>

  //     <h2> My Grocery Lists</h2>

  //     <ul>
  //       {/* {lists.map((list, idx) => {
  //         return (
  //           <li key={idx}>{list.name}</li>
  //         )
  //       })} */}
  //     </ul>
  //   </React.Fragment>
  // );
}

export default Test;
