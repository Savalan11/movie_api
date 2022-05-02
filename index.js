const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const morgan = require('morgan');
const bodyParser = require('body-parser');
uuid= require ('uuid');
app.use(morgan('common'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

//CONNECT WITH MONGOOSE
mongoose.connect(process.env.CONNECTION_URI || 'mongodb://localhost:27017/myMovieList', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// Welcome page
app.get('/', (req, res) => {
  res.send('Welcome to my MovieList!');
});

//GET: list of movies
app.get('/movies', passport.authenticate('jwt', { session: false }),
(req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//GET : a movie called by title
app.get('/movies/:title', passport.authenticate('jwt', { session: false }),
 (req, res) => {
    Movies.findOne({ Title: req.params.title }).then((movie) => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(400).send('Movie not Found');
      }
    });
  }
);


//GET: list of users
app.get('/users', passport.authenticate('jwt', { session: false }),
 function (req, res) {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }),
 (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
//GET : a genre of movie
app.get('/genre/:Name', passport.authenticate('jwt', { session: false }),
 (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.Name })
        .then((movie) => {
            if (movie) {
                res.status(200).json(movie.Genre);
            } else {
                res.status(400).send('Genre not found.');
            };
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//GET : director of movie
app.get('/director/:Name', passport.authenticate('jwt', { session: false }),
 (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name })
    .then((movie) => {
      res.json(movie.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Post-create a user account
app.post('/users', passport.authenticate('jwt', { session: false }),
 (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// UPDATE user account /'Successful PUT request updates User info
    app.put('/users/:Username', passport.authenticate('jwt', { session: false }),
     (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

    // Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }),
 (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, // this line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

    //  delete user account
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }),
 (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// deletes a movie from a users list of favorite movies
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }),
 (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    {
      $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, // this line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});
//app.listen(8080, () => console.log("Your app is listening on port 8080"))
