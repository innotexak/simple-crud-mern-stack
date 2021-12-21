require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { loginValidation, registerValidation } = require('./validation');
var mongoose = require('mongoose');
const Users = require('./models/userModel');
const Posts = require('./models/postModel');
const { VerificationEmail } = require('./mailer/sendMail');

//Set up  mongoose connection
// var dbURI = 'mongodb+srv://innotex:innotexinnotex@cluster0.6lymd.mongodb.net/buzzroom?retryWrites=true&w=majority';
var dbURI = 'mongodb://localhost:27017/InnoDB';
mongoose
  .connect(dbURI || process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('DB Successfully connected');
  })
  .catch((err) => {
    console.log(err.message);
  });

const dummyData = [{ title: 'New Room', product: 'Mouka bed' }];

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cors middleware config
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Content-Type, Authorization');
  next();
});

// GET post route
app.get('/blog', async (req, res, next) => {
  try {
    const data = await Posts.find({});
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send('No record found!');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
// Login route
app.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  if (loginValidation(req.body, res)) {
    Users.findOne({ Email: email }, (err, obj) => {
      if (obj != null) {
        let dbPassword = obj.Password;
        let verify = passwordHash.verify(password, dbPassword);
        if (verify) {
          let Token = obj.Token;
          res.status(200).send(Token);
        } else {
          res.status(400).send('Wrong password');
        }
      } else {
        res.status(400).send('This email does not exist, kindly signup');
      }
    });
  }
});
// register route
app.post('/register', (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  if (registerValidation(req.body, res)) {
    Users.findOne({ Email: email }, (err, obj) => {
      if (obj != null) {
        res.status(400).send('A user with the email exist!');
      } else {
        let hashedPassword = passwordHash.generate(password);
        let Token = jwt.sign({ Email: email }, '12345678900987654321', { expiresIn: '2h' });
        const user = new Users({
          Email: email,
          FirstName: firstName,
          LastName: lastName,
          Token: Token,
          googleId: 'local',
          profileImage: 'default.png',
          Password: hashedPassword,
          isDeleted: false,
          isActivated: false,
        });
        user
          .save()
          .then((result) => {
            // var verifyLink = `http://localhost:3000/verify/${Token}`;
            // await VerificationEmail(email, email, verifyLink);
            if (result) {
              res.status(201).send('Registration complete!');
            } else {
              res.status(400).send('Unable to process your request');
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send(err);
          });
      }
    });
  }
});
// like/unlike post route
app.post('/likes', (req, res, next) => {
  const { like, email } = req.body;
  if (req.body) {
    Users.findOne({ Email: email }, async (err, obj) => {
      if (obj) {
        let update = await Posts.findOneAndUpdate({ Like: like });
        if (update) {
          res.status(201).send('Updated');
        }
      } else {
        res.status(400).send('You can only like if you have an account');
      }
    });
  } else {
    res.status(404).send(err);
  }
});
// Google login
app.post('/google/login', (req, res, next) => {
  const { email, firstName, lastName, googleId, profileImage, accessToken } = req.body;
  console.log(req.body);
  if (req.body) {
    Users.findOne({ Email: email }, (err, obj) => {
      if (obj) {
        // console.log(obj);
        res.status(201).send(obj.Token);
      } else {
        let hashedPassword = passwordHash.generate('password');
        // let Token = jwt.sign({ Email: email }, '12345678900987654321', { expiresIn: '2h' });
        const users = new Users({
          Email: email,
          FirstName: firstName,
          LastName: lastName,
          Token: accessToken,
          googleId: googleId,
          profileImage: profileImage,
          Password: hashedPassword,
          isDeleted: false,
          isActivated: false,
        });
        users
          .save()
          .then((result) => {
            // var verifyLink = `http://localhost:3000/verify/${Token}`;
            // await VerificationEmail(email, email, verifyLink);
            if (result) {
              res.status(201).send(result);
            } else {
              res.status(400).send('Unable to process your request');
            }
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    });
  }
});
// Post route
app.post('/post', (req, res, next) => {
  let { title, content, email, like } = req.body;
  if (!title && title.length < 4) {
    res.status(400).send('Title field cannot be empty or less than 4 characters!');
    return false;
  } else if (!content) {
    res.status(400).send('Content field cannot be empty!');
    return false;
  } else if (!email || !email.includes('@')) {
    res.status(400).send('Invalid user email');
  } else {
    const newPost = new Posts({ Title: title, Like: like, Content: content, Email: email });
    newPost
      .save()
      .then((result) => {
        res.status(201).send('Item posted successfully');
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  }
});

// GET route
app.get('/profile/:token', (req, res, next) => {
  const Token = req.params.token;
  Users.findOne({ Token: Token }, (err, obj) => {
    if (obj) {
      res.status(200).send(obj);
    } else {
      res.status(404).send(err);
    }
  });
});

// port configuration
const PORT = process.env.port;

// listen middleware
app.listen(PORT, function (err) {
  if (err) throw new err();
  console.log('Server started on port', PORT);
});
