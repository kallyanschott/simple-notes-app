import db from './db'

export default class NotesDao {

    static getInstance() {
        return new NotesDao();
    }

    getAll() {
        return db.notes.reverse().toArray();
    }

    insert(task) {
        return db.notes.add(task);
    }

    update(task) {
        return db.notes.put(task);
    }

    delete(id) {
        return db.notes.delete(id);
    }

    clearAllTasks() {
        return db.notes.clear();
    }

}

