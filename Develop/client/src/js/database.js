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

  export const putDb = async (content) =>{
    try{
      const jateDb = await openDB('jate', 1);
      const transaction = jateDb.transaction('jate', 'readwrite');
      const store = transaction.objectStore('jate');
      return await store.add({content});
    }catch(err){
      console.error(err);
    }
  };

  export const getDb = async () => {
    try{
      const jateDb = await openDB('jate', 1);
      const transaction = jateDb.transaction('jate', 'readonly');
      const store = transaction.objectStore('jate');
      return await store.getAll();
    }catch(err){
      console.error(err);
    }
  };

initdb();
