import Dexie from 'dexie';

const db = new Dexie('notesDB');

db.version(1).stores({
    notes: '++id, name'
});

export default db;