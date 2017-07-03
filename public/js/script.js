$(() => {

    // const shows = [];
    // when search form is submitted
    $('#search').on('submit', (e) => {
        e.preventDefault();
        $('.results').empty();
        // console.log('clicked')
        let city = $('#search-input').val();
            // console.log(show);
        getLatLngFromGoogle(city);
    });

    // call your api and get the data
    const getLatLngFromGoogle = (city) => {
        const apiKey = 'AIzaSyCGzf1nEWL5A6ZKwQSQlyVUEfD4zpfHh9c';
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;

        axios.get(url)
            .then(response => {
                //console.log(response);
                //console.log(response.data.results["0"].geometry.location);
                // renderData(response.data.results);

                return getRestaurants(response.data.results["0"].geometry.location);
            })
            .catch(err => {
                console.error(err);
            })
    }

    const getRestaurants = (coords) => {

        // NOW WE HAVE LAT AND LNG FROM GOOGLE GEOCODE SEARCH
        let lat = coords.lat;
        let lng = coords.lng;

        //console.log(coords)

        const apiKey = '6124e5663d540be49b3a3e28e1c015e6';
        let url = `https://developers.zomato.com/api/v2.1/search?entity_type=city&lat=${lat}on=${lng}`;

        axios.get(url, {
            headers: {
                'user-key': apiKey,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('this is the axios response',response);
                // parseData(response.data.restaurants);
                renderData(response.data.restaurants);
            })
            .catch(err => {
                console.error(err);
            })
    }

    // parse and validate your data. This data may end
    // up in your database so you want to keep it consistent.
    // look at the `seed` file to figure out what values you need
    // what if a result doesn't have an image? a network? a summary?
    const parseData = (data) => {

        data.forEach(restaurant => {
            let name = restaurant.restaurant.name;

            let location = {
                address: restaurant.restaurant.location.address,
                city: restaurant.restaurant.location.city

            };

            let photos = restaurant.restaurant.photos_url;

            sendToServer(name, location, photos);

        });
    }

    const sendToServer = (name, location, photos) => {

     axios.post('http://localhost:3000/restaurants/newRestaurant', {name, location, photos})
            .then(response=>{
                console.log('server is working');
            })
            .catch(err =>{
                console.error(err);
            })
    }

    // render your data! Each result should have:
    // name, image, summary, network, and a button that will call
    // createShow()
    const renderData = (restaurants) => {
        console.log("Restaurants inside of render:", restaurants[0].restaurant)
        debugger
        // empty the results
        const $results = $('.results').empty();
        // iterate through array
        restaurants.forEach(indiv => {
            console.log(indiv.restaurant)
            //create a restaurant container
            const $restaurantcontainer = $('<div>', {
                class: 'restaurant'
            }).appendTo($results);
            const $name = $('<h3>').text(indiv.restaurant.name).appendTo($restaurantcontainer);
            const photos = indiv.restaurant.photos_url? indiv.restaurant.photos_url.medium : 'https://c1.staticflickr.com/9/8411/8706485644_dcc5d37b5b_b.jpg';

            const $photosLink = $('<a>', {
                href:indiv.restaurant.photos_url
            }).html('Link to photos').appendTo($restaurantcontainer);
            const $location = $('<p>').html(indiv.restaurant.location.address, indiv.restaurant.location.zipcode).appendTo($restaurantcontainer);
            const addRestaurant = $('<button>').text("Add to Favorite Restaurants").on("click", function(e) {
                // e.preventDefault();
                createRestaurant(indiv);
            }).appendTo($restaurantcontainer);
        })

    }

    // this function should preform an ajax call to your post route
    // to add the restaurant to your database
    const createRestaurant = (restaurant) => {
        console.log(restaurant)



        $.ajax({
            method: 'POST',
            url: '/restaurant/',
            data: restaurant,
            success: response => {
              console.log("this is the response from ajax:", response)
                window.location.replace(`/restaurants/`)
            }
        })

    }

    const editRestaurant = (restaurant) => {
      e.preventDefault();
        $.ajax({
            url: `/restaurants/${restaurant.id}`,
            type: 'PUT',
            data: restaurant,
            success: res => {
                console.log(res);
                window.location.replace(`/restaurants/${res.id}`);
            },
            error: err => {
                console.log(err)
            }
        })
    }

    $('#delete-restaurant').click(e => {
        deleteRestaurant($(e.target).attr('data-id'));
    })

    const deleteRestaurant = (id) => {
        $.ajax({
            url: `/restaurants/${id}`,
            type: 'DELETE',
            success: res => {
                console.log(res);
                window.location.replace('/restaurants/');
            },
            error: err => {
                console.log(err);
            }

        })
    }
    
    





})