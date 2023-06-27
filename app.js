//start
const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);

const port = 3000;
const axios = require('axios');

const usersRoutes = require('./routes/users-routes');
const guestsRoute = require('./routes/guests-routes');
const githubRoute = require('./routes/github-routes');

const auth = require('./middlewares/auth');
const notFound = require('./middlewares/404');
const error = require('./middlewares/error');

const config = require('config');

//console.log(config.get('app.name'));
//console.log(config.get('app.secret'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//app.use(auth);
app.use(express.json());

app.use('/',guestsRoute);
app.use('/',usersRoutes);
app.use('/github', githubRoute);


app.use(notFound);
app.use(error);


server.listen(port, () => {
    console.log(`Crypto live rates app listening on port ${port}`)
})
  module.exports = app;