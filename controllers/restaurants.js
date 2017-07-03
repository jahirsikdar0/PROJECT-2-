const router = require('express').Router();
const Restaurants = require('../models/restaurants');

// VIEW ROUTES

router.get('/', (req, res) => {
  //console.log(req.user);

  Restaurants
    .findAllByUser(req.user.id)
    .then(restaurant => {
      res.render('restaurants/index', {
        restaurants: restaurant,
        email: req.user.email
      })
    })
    .catch(err => {
      console.log(err);
    });

});

router.get('/new', (req, res) => {

  //res.render('restaurants/new');

  Restaurants
  .get()
  .then(response => {
    let restaurants = response.map(restaurant => { return restaurant });

        // console.log(restaurants);

    res.render('restaurants/new', { name: restaurants.name });
  })
  .catch(err => { console.log(err) });


});

router.get('/:id/edit', (req, res) => {
  Restaurants
    .findById(req.params.id, req.user.id)
    .then(restaurant => {
      res.render('restaurants/edit', restaurant);
    })
    .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
  Restaurants
    .findById(req.params.id, req.user.id)
    .then(restaurant => {
      res.render('restaurants/restaurant', restaurant);
    })
    .catch(err => console.log(err));
});

// API ROUTES

//////////////////////////
// CREATE POST ROUTE HERE


router.post('/newRestaurant', (req ,res) => {
  //console.log(req.body);

  Restaurants
    .create(req.body.name, req.body.location, req.body.photos)
    .then(response => {
        console.log(response);
    }).catch(err => console.log(err));

});


//////////////////////////

router.put('/:id', (req, res) => {
  Resttaurants
    .update(req.body, req.params.id, req.user.id)
    .then(restaurant => {
      console.log('THEN', restaurant);
      res.json(restaurant);
    })
    .catch(err => console.log(err))
});

router.delete('/:id', (req, res) => {
  Restaurants
    .destroy(req.params.id, req.user.id)
    .then(restaurant => {
      res.send('deleted')
    })
    .catch(err => console.log(err))
});

module.exports = router;