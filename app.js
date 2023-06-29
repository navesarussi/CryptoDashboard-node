//start
const express = require('express');
const session = require('express-session');
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000;
const axios = require('axios');

const usersRoutes = require('./routes/users-routes');
const guestsRoute = require('./routes/guests-routes');
const githubRoute = require('./routes/github-routes');
const auth = require('./middlewares/auth');

const notFound = require('./middlewares/404');
const error = require('./middlewares/error');

const config = require('config');
const { middleware: db } = require('./middlewares/db');
const mongo = require('./middlewares/mongo');


//app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
  },
}));

 app.get('/', (req, res) => {
   res.render('dashboard');
 });


console.log("dsfffffffffffffffffffffd");
app.use(auth.initialize());
app.use(auth.session());

app.use(db);
app.use(mongo);
app.use('/auth/github', githubRoute);

app.use('/',guestsRoute);  
app.use('/',usersRoutes);

app.use(notFound);
app.use(error);

io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('my custom event',{name: 'admin'});
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
console.log('user disconnected32434324234');



server.listen(port, () => {
    console.log(`Crypto live rates app listening on port ${port}`)
})
  module.exports = app;