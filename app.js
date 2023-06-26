//start
const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');

const usersRoutes = require('./routes/users-routes');
const guestsRoute = require('./routes/guests-routes');
const githubRoute = require('./routes/github-routes');

const auth = require('./middlewares/auth');
const notFound = require('./middlewares/404');
const error = require('./middlewares/error');

const config = require('config');

console.log(config.get('app.name'));
console.log(config.get('app.secret'));

app.use(auth);

app.use('/',guestsRoute);
app.use('/',usersRoutes);
app.use('/github', githubRoute);


app.use(notFound);
app.use(error);


app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
  })