import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Use PUT to update the database');
  // Open the database
  const jateDb = await openDB('jate', 1); 
  // Set up transaction, use readwrite to update: 
  const tx = jateDb.transaction('jate', 'readwrite');
  // Use store method to store the data.
  const store = tx.objectStore('jate');
  // Store.put method to save the content.
  const request = store.put({ id: 1, value: content });
  // Awaiting the request
  const result = await request; 

  // Use console.log to see whether we're able to persist the data.
  console.log('The data is saved to the database', result.value); 
}; 

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Use GET to get from the database.');
  // Open the database: 
  const jateDb = await openDB('jate', 1); 
  // Set up a transaction, use readonly to get data: 
  const tx = jateDb.transaction('jate', 'readonly');
  // Store the database by using objectStore method.
  const store = tx.objectStore('jate');
  // Use store.get method to get the item with key "1".
  const request = store.get(1); 
  // Awaiting the request and save that into the result.
  const result = await request; 

  // If we have the result, the return result.value; If not, console.log "Data not found"
  result
    ? console.log('Retrieved data from the database', result.value)
    : console.log('Data not found'); 
  
  return result?.value; 
}

initdb();
