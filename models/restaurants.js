const db = require('../db/config');

const findAllByUser = (userId) => {
  return db.any('SELECT * FROM restaurants WHERE id = $1', [userId]);
}

const findById = (restaurantId, userId) => {
  return db.oneOrNone('SELECT * FROM restaurants WHERE id = $1 AND id = $2',
  [restaurantId, userId]);
}

const get = () => {
  return db.any('SELECT * FROM restaurants');
}

const create = (name, location, photos) => {
  return db.one(`INSERT INTO restaurants
    (name, location, photos)
    VALUES ($1, $2, $3) RETURNING *`,
    [name, location, photos]);
}

const update = (restaurant, restaurantId, userdId) =>{
  return db.oneOrNone(`UPDATE restaurants
   SET name = $1 ,locaton = $2, photos = $3,
   WHERE id = $4 RETURNING id`,
   [inDiv.restaurant.name, inDiv.restaurant.location, inDiv.restaurant.photos, restaurantId, userId]);

}

// const update = (restaurant, restaurantId, userId) => {
//   return db.oneOrNone(`UPDATE restaurants
//     SET name = $1,location = $2, photos = $3,
//     WHERE id = $4 AND user_id = $5 RETURNING id`,
//     [restaurant.name,restaurant.image, showId, userId]);
// }

const destroy = (showId, userId) => {
  return db.none(`DELETE FROM restaurants WHERE id = $1 AND user_id = $2`,
    [restaurantId, userId]);
}

module.exports = {findAllByUser, findById, create, get, update, destroy};