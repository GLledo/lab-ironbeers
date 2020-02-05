const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper()




app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beer', (req, res) => {
    punkAPI.getBeers()
        .then(beersFromApi => res.render('beer', {allBeers:beersFromApi}))
        .catch(error => console.log(error))
});

app.get('/random', (req, res) => {
    punkAPI.getRandom()
  .then(responseFromAPI => res.render('random',{randomBeer: responseFromAPI[0]}))
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
