// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config({ path: './.env' });
// const app = require('./app');

// mongoose
//   .connect(process.env.DATABASE, { useUnifiedTopology: true })
//   .then(() => console.log('DB connection successful!'));

//   const port = process.env.PORT || 8081;

  
//   process.on('uncaughtException', err => {
//     console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//     console.log(err.name, err.message);
//     process.exit(1);
// });

// process.on('unhandledRejection', err => {
//     console.log('UNHANDLED REJECTION! 💥 Shutting down...');
//     console.log(err.name, err.message);
//     server.close(() => {
//       process.exit(1);
//     });
// });

// process.on('SIGTERM', () => {
//     console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
//     server.close(() => {
//         console.log('💥 Process terminated!');
//     });
// });

// app.listen(port, () => {
//           console.log(`App running on port ${port}...`);
//         });


const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection({
  host: "localhost",
  user: "username",
  password: "password",
  database: 'mydb',
});

connection.connect = util.promisify(connection.connect);
connection.query = util.promisify(connection.query);
(async () => {
  try {
    await connection.connect();
    console.log("Connected!");

    await connection.query(`
      CREATE TABLE users (
        id int auto_increment,
        username varchar(255) not null,
        password varchar(255) not null,
        email varchar(255) not null,
        birthday date not null,
        primary key (id)
      )    
    `);
    console.log("created table users!");

  } catch (e) {
    console.log(e);
  }
})();


// hint

// connection.query(`
//   some SQL query
// `);