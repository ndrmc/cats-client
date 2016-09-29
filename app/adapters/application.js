import PouchDB from 'pouchdb';
import { Adapter } from 'ember-pouch';

PouchDB.debug.enable('*');

var catsRemote = new PouchDB('http://localhost:5984/cats_remote');

var catsLocal = new PouchDB('local_pouch');

catsLocal.sync(catsRemote, {
    live: true,
    retry: true
});

export default Adapter.extend({
    db: catsLocal
});