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
      email: "savalan.suleymanli@gmail.com",
      password: "St@rt1987!",
      birthday: "24/05/1987",
      favoriteMovies: []
    },
    {
      id: "2",
      name: "Max",
      email: "savashsuleymanli@gmail.com",
      password: "End1987!",
      birthday: "20/05/1998",
      favoriteMovies: ["Life Is Beautiful"]
    },
    {
      id: "3",
      name: "Freyd",
      email: "gunelkazimli94@gmail.com",
      password: "Begin1994!",
      birthday: "10/05/1994",
      favoriteMovies: ["Life Is Beautiful"]
    },
  ]

  // MOVIE LIST
  let movies = [
    {
      Title:"The Shawshank Redemption",
      Description:"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      Genre: {
      id: "3",
      Name:"Drama",
      Description:"drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
    },
    Director: {
    id: "4",
    Name:"F. Darabont",
    Bio:"Frank Árpád Darabont is an American film director, screenwriter and producer. He has been nominated for three Academy Awards and a Golden Globe Award.",
    Birth: 1959,
    Death:
    },
    ImageURL: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
    Featured: false
  },

  {
    Title:"Life Is Beautiful",
    Description:"LIFE IS BEAUTIFUL is a Chaplinesque fable about the power of imagination set against the stark reality of World War II Europe.",
    Genre: {
    id: "5",
    Name:" Comedy Drama",
    Description:"This is a serious drama that has comic elements."
  },
  Director: {
  id: "6",
  Name:"Roberto Benigni",
  Bio:"Roberto Remigio Benigni Cavaliere di Gran Croce OMRI is an Italian actor, comedian, screenwriter and director.",
  Birth: 1952,
  Death:
  },
  ImageURL: "https://upload.wikimedia.org/wikipedia/en/7/7c/Vitaebella.jpg",
  Featured: false
},
{
  Title:"Goodfellas",
  Description:"The story of Irish-Italian American, Henry Hill, and how he lives day-to-day life as a member of the Mafia.",
  Genre: {
  //id: "3",
  Name:"Gangster",
  Description:"A gangster film or gangster movie is a film belonging to a genre that focuses on gangs and organized crime."
},
Director: {
//id: "4",
Name:"N.Pileggi",
Bio:"Nicholas Pileggi is an American author, producer and screenwriter.",
Birth: 1933,
Death:
},
ImageURL: "https://upload.wikimedia.org/wikipedia/en/7/7b/Goodfellas.jpg",
Featured: true
},

{
  Title:"The Matrix",
  Description:"The Matrix is a 1999 science fiction action film written and directed by the Wachowskis.",
  Genre: {
  //id: "3",
  Name:"Science fiction",
  Description:"Science fiction is a genre of speculative fiction which typically deals with imaginative and futuristic concepts."
},
Director: {
//id: "4",
Name: "The Wachowskis",
Bio:"Lana Wachowski and Lilly Wachowski are American film and television directors, writers and producers.",
Birth: 1965,
Death:
},
ImageURL: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
Featured: true
},

{
  Title:"Inception",
  Description:"Dreams and cinema — Inception is a 2010 science fiction action film written and directed by Christopher Nolan.",
  Genre: {
  //id: "3",
  Name:"Science fiction",
  Description:"Science fiction is a genre of speculative fiction which typically deals with imaginative and futuristic concepts."
},
Director: {
//id: "4",
Name: "Christopher Nolan",
Bio:"Christopher Nolan CBE is a British-American film director, producer, and screenwriter.",
Birth: 1951,
Death:
},
ImageURL: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
Featured: true
},

{
  Title:"Tenet",
  Description:"Tenet is a 2020 science fiction action spy film directed, written and co-produced (alongside his wife Emma Thomas) by Christopher Nolan.",
  Genre: {
  //id: "3",
  Name:"Science fiction",
  Description:"Science fiction is a genre of speculative fiction which typically deals with imaginative and futuristic concepts."
},
Director: {
//id: "4",
Name: "Christopher Nolan",
Bio:"Christopher Nolan CBE is a British-American film director, producer, and screenwriter.",
Birth: 1951,
Death:
},
ImageURL: "https://en.wikipedia.org/wiki/Tenet_(film)#/media/File:Tenet_movie_poster.jpg",
Featured: true
},

{
  Title:"The Good, The Bad And The Ugly",
  Description:"The Good, the Bad and the Ugly is a 1966 Italian epic spaghetti Western film directed by Sergio Leone and starring Clint Eastwood as the Good.",
  Genre: {
  //id: "3",
  Name:"Western",
  Description:"The Western is a genre of fiction and film set primarily in the latter half of the 19th century and the early 20th century in the Western United States."
},
Director: {
//id: "4",
Name: "Sergio Leone",
Bio:"Sergio Leone was an Italian film director, producer and screenwriter credited as the creator of the Spaghetti Western genre and widely regarded as one of the most influential directors in the history of cinema. ",
Birth: 1929,
Death: 1989
},
ImageURL: "https://en.wikipedia.org/wiki/The_Good,_the_Bad_and_the_Ugly#/media/File:Good_the_bad_and_the_ugly_poster.jpg",
Featured: true
},

{
  Title:"Pulp Fiction",
  Description:"In the realm of underworld, a series of incidents intertwines the lives of two Los Angeles mobsters, a gangster's wife, a boxer and two small-time criminals.",
  Genre: {
  //id: "3",
  Name:"Comedy crime film",
  Description:"Crime comedy films are a hybrid of the crime film and the comedy that play with the conventions of the crime film."
},
Director: {
//id: "4",
Name: "Quentin Tarantino",
Bio:"Quentin Jerome Tarantino is an American filmmaker, actor, film critic and author. His films are characterized by frequent references to popular culture and film history. ",
Birth: 1963,
Death:
},
ImageURL: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg",
Featured: true
},

{
  Title:"The Dark Knight",
  Description:"The Dark Knight is a 2008 superhero film directed, co-produced, and co-written by Christopher Nolan.",
  Genre: {
  //id: "3",
  Name:"Action-Drama",
  Description:"Action dramas tend to be visceral, not intellectual, with dynamic fight scenes, extensive chase scenes, and heart-racing stunts."
},
Director: {
//id: "4",
Name: "Christopher Nolan",
Bio:"Christopher Nolan CBE is a British-American film director, producer, and screenwriter.",
Birth: 1951,
Death:
},
ImageURL: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
Featured: true
},

{
  Title:"The Godfather",
  Description:"Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
  Genre: {
  //id: "3",
  Name:"Gangster",
  Description:"A gangster film or gangster movie is a film belonging to a genre that focuses on gangs and organized crime."
},
Director: {
//id: "4",
Name: "Mario Puzo",
Bio:"Mario Francis Puzo was an American author, screenwriter, and journalist. He is known for his crime novels.",
Birth: 1920,
Death: 1999
},
ImageURL: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
Featured: true
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
