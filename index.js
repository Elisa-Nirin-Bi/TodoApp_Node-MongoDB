const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const path = require('path');
const Todo = require('./models/todo');
const nodeSassMiddleware = require('node-sass-middleware');

const app = express();

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(
  nodeSassMiddleware({
    dest: path.join(__dirname, 'public/styles'),
    src: path.join(__dirname, 'styles'),
    force: true,
    outputStyle: 'extended',
    prefix: '/styles'
  })
);

app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  Todo.find().then((todos) => {
    response.render('home', {
      todos
    });
  });
});

app.post('/create-to-do-list-item', (request, response, next) => {
  const task = request.body.task;
  console.log(task);
  // const { title, url } = request.body;
  Todo.create({
    task
  })
    .then((todo) => {
      response.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

app.post('/create-to-do-list-item/:id/delete', (request, response, next) => {
  const id = request.params.id;
  Todo.findByIdAndDelete(id)
    .then(() => {
      response.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(3000);
});
