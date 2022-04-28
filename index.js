const express = require('express');
const app = express();
//const port = process.env.PORT || 8080;

const morgan = require('morgan');
const bodyParser = require('body-parser');
uuid= require ('uuid');
app.use(morgan('common'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require('mongoose');
const Models = require('./models.js');



const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

//CONNECT WITH MONGOOSE
mongoose.connect('mongodb://localhost:27017/myMovieList', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// Welcome page
app.get('/', (req, res) => {
  res.send('Welcome to my MovieList!');
});

//GET: list of movies
app.get('/movies',
(req, res) => {
Movies.find()
  .then((movies) => {
  res.status(201).json(movies);
  })
  .catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
  });
});

//GET: list of movies
app.get('/users', function (req, res) {
  Users.find()
  .then(function (users)
  res.status(201).json(users);
})
.catch(function (err) {
console.error(err);
res.status(500).send('Error: ' + err);
});
});

//GET : a movie called by title
app.get('/movies/:Title', (req, res) =>{
  Movies.findOne({ Title: req.params.Title })
  .then((movie) => {
    res.json(movie);
})
.catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
});
});
//GET : a genre of movie
app.get('/genre/:Name', (req, res) => {
    Genres.findOne({ Name: req.params.Name })
    .then((genre) => {
    res.json(genre.Description);
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + error);
    });
});

//GET : director of movie
app.get('/director/:Name', (req, res) => {
    Directors.findOne({ Name: req.params.Name })
    .then((director) => {
    res.json(director);
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + error);
    });
});
// Post-create a user account
app.post('/users', (req, res) => {
  Users.FindOne()({ Username: req.body.Username })
  .then((user) => {
    if(user) {
        return res.status(400).send(req.body.Username + ' already exists');

      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
        .then((user) => {
          res.status(201).json(user); })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Error: ' + error);
        });
        }
      })
      .catch((err) => {
      console.error(err);
      res.status(500).send('Error ' + err);
  });
});

// UPDATE user account /'Successful PUT request updates User info
app.put('/users/:Username',(req, res) => {
  Users.findOneAndUpdate ({ Username: req.params.Username },
               { $set:{
                 Username: req.body.Username,
                 Password: req.body.Password,
                 Email: req.body.Email,
                 Birthday: req.body.Birthday,
              },
        },
        { new:true }), //returns the updated document
        (err.updatedUser) => {
          if(err) {
            console.error(err);
            res.status(500).send('Error ' + err);
          } else {
            res.json(updatedUser);
          }
        }
      );
    });

    //  delete user account
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.listen(8080, () => console.log("Your app is listening on port 8080"))
