const pgp = require('pg-promise')({}),
config = process.env.DATABASE_URL || 'postgres://localhost:5432/restaurants_db',
db = pgp(config);

module.exports = db; 