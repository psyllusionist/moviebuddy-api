const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const list = require('./controllers/list');
const profile = require('./controllers/profile');

const db = knex({
  client: 'pg',
   version: '13.4',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'test',
    database : 'moviebuddy'
  }
});

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Success');
  console.log('working')
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.post('/list', (req, res) => { list.handleList(req, res, db) });
app.post('/listadd', (req, res) => { list.updateList(req, res, db) });
app.post('/listdelete', (req, res) => { list.deleteList(req, res, db) });

app.listen(3001, () => {
  console.log('app is running on port 3001')
});