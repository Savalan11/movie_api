const express = require('express');
//const app = express();
morgan = require('morgan');
const app = express();

app.use(morgan('common'));

// MOVIE LIST
let topMovies = [
  {
    title: 'The Shawshank Redemption',
    author: 'F. Darabont, S.King'
  },
  {
    title: 'Life Is Beautiful',
    author: 'Roberto Benigni'
  },
  {
    title: 'Goodfellas',
    author: 'N. Pileggi'
  },
  {
    title: 'The Matrix',
    author: 'L. Wachowskis'
  },
  {
    title: 'Inception',
    author: 'Christopher Nolan'
  },
  {
    title: 'Forrest Gump',
    author: 'Winston Groom'
  },
  {
    title: 'The Good, The Bad And The Ugly',
    author: 'Sergio Leone'
  },
  {
    title: 'Pulp Fiction',
    author: 'Quentin Tarantino'
  },
  {
    title: 'The Dark Knight ',
    author: 'Christpher Nolan'
  },
  {
    title: 'The Godfather ',
    author: 'Mario Puzo'
  }
];

// GET requests
app.get('/', (req, res, next) => {
  res.send('Welcome to my movie club!');
});


app.get('/movies', (req, res, next) => {
  res.json(topMovies);
});

//EXPRESS STATIC FUNCTION
app.use(express.static('public'));

//ERROR-HANDLING MIDDLEWARE FUNCTION

app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Something went wrong!');
});


// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
