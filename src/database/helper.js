const StormDB = require('stormdb');

// start db with "./db.stormdb" storage location
const engine = new StormDB.localFileEngine('./db.stormdb');
var database = new StormDB(engine);

database.default({ favourites: [] });
database.save();

module.exports = database;
