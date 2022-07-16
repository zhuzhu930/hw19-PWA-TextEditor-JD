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
  console.log('Use PUT request to update the database');

  const jateDb = await openDB('jate', 1); 
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request; 

  console.log('The data is saved to the database', result.value); 
} 

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Use GET request to get from the database.');
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
