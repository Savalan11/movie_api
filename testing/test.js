const express = require('express'),
app = express(),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

  app.use(bodyParser.json());

  // USER LIST
  let users = [
    {
      id: "1",
      name: "Savalan",
      //email: "savalan.suleymanli@gmail.com",
      //password: "St@rt1987!",
      //birthday: "24/05/1987",
      favoriteMovies: []
    },
    {
      id: "2",
      name: "Max",
      //email: "savash.cakir@gmail.com",
      //password: "End1987!",
      //birthday: "20/05/1998",
      favoriteMovies: ["Life Is Beautiful"]
    },
  ]

  // MOVIE LIST
  let movies = [
    {
      Title:"The Shawshank Redemption",
      Description:"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      Genre: {
      Name:"Drama",
      Description:"drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
    },
    Director: {
    Name:"F. Darabont",
    Bio:"Frank Árpád Darabont is an American film director, screenwriter and producer. He has been nominated for three Academy Awards and a Golden Globe Award.",
    Birth: 1959
    },
    ImageURL: "https://www.amazon.de/The-Shawshank-Redemption-Single-Disc-Edition/dp/B000P0J0EW",
    Featured: false
  },

  {
    Title:"Life Is Beautiful",
    Description:"LIFE IS BEAUTIFUL is a Chaplinesque fable about the power of imagination set against the stark reality of World War II Europe.",
    Genre: {
    Name:" Comedy Drama",
    Description:"This is a serious drama that has comic elements."
  },
  Director: {
  Name:"Roberto Benigni",
  Bio:"Roberto Remigio Benigni Cavaliere di Gran Croce OMRI is an Italian actor, comedian, screenwriter and director.",
  Birth: 1952
  },
  ImageURL: "https://upload.wikimedia.org/wikipedia/en/7/7c/Vitaebella.jpg",
  Featured: false
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

  // create
  app.post('/users', (req, res) => {
    const newUser = req.body;
    if (newUser.name) {
      newUser.id = uuid.v4();
      users.push(newUser);
      res.status(201).json(newUser)
    } else {
      res.status(400).send('users need names')
    }
  })

  // update
  app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    let user = users.find( user => user.id == id );
    if (user) {
      user.name = updatedUser.name;
      res.status(200).json(user);
    } else {
      res.status(400).send('no such user')
    }
  })

  // create
  app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    let user = users.find( user => user.id == id );
    if (user) {
      user.favoriteMovies.push(movieTitle);
      res.status(200).send(`${movieTitle} has been added to user $(id)'s array`);;
    } else {
      res.status(400).send('no such user')
    }
  })

  // delete
  app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    let user = users.find( user => user.id == id );
    if (user) {
      user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
      res.status(200).send(`${movieTitle} has been removed from user $(id)'s array`);;
    } else {
      res.status(400).send('no such user')
    }
  })

  // delete/deregister
  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    let user = users.find( user => user.id == id );
    if (user) {
      users = users.filter( user => user.id != id);
      res.status(200).send(`user $(id) has been deleted`);;
    } else {
      res.status(400).send('no such user')
    }
  })

// READ MOVIES
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

//READ MOVIE TITLES
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find( movie => movie.Title === title );
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie')
  }

})

//READ GENRE
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;
  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre')
  }

})

//READ DIRECTOR NAME
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName ).Director;
  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no such director')
  }

})

app.listen(8080, () => console.log("Your app is listening on port 8080"))
