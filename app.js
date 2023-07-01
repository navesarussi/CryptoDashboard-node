// Required Modules
const express = require('express'); // Express.js for building the server
const session = require('express-session'); // Used for managing user sessions
const path    = require('path'); // Helps with file paths
const http    = require('http'); // Built-in Node.js module for HTTP communication
const { Server } = require("socket.io"); // Real-time engine for bidirectional communication
const axios      = require('axios'); // HTTP client to make requests to external APIs
const config     = require('config'); // For managing configuration settings
//const morgan = require('morgan'); // For easier debug

// Required routes
const usersRoutes = require('./routes/users-routes'); // Handles user-related routes
const guestsRoute = require('./routes/guests-routes'); // Handles routes for guest users
const githubRoute = require('./routes/github-routes'); // Handles routes for GitHub authentication

// Required middleware
const auth     = require('./middlewares/auth'); // Manages authentication
const notFound = require('./middlewares/404'); // Handles 404 errors
const error    = require('./middlewares/error'); // Handles other errors

// Middlewares for Database Connection
const { middleware: db } = require('./middlewares/db'); // Handles database-related tasks
const mongo              = require('./middlewares/mongo'); // Specific middleware for MongoDB operations

// Express application initialization
const app    = express();
const server = http.createServer(app);
const io     = new Server(server);
const port   = 3000;

// Setting up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Setting up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

app.use(auth.initialize());
app.use(auth.session());
app.use(db);
app.use(mongo);

// Setting up routes
app.use('/auth/github', githubRoute);
app.use('/', guestsRoute);  
app.use('/', usersRoutes);

// Middleware to handle errors
app.use(notFound);
app.use(error);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('my custom event', {name: 'admin'});
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start the server
server.listen(port, () => {
    console.log(`Crypto live rates app listening on port ${port}`)
})

module.exports = app;

