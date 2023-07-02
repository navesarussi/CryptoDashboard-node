// const mongoose = require('mongoose');
// const config = require('config');

// let isMongoConnected = false;


// module.exports = async (req, res, next) => {
//   console.log('first mongo', req.mongo?req.mongoose.connection:false);
//   if (!isMongoConnected)
//     try {
//         console.log('start connecting to mongo');
//         await mongoose.connect(`mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.db')}`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//           })
//             .then(() => {
//               console.log('Connected to MongoDB');
//               // Further code execution
//             })
//             .catch((error) => {
//               console.error('Error connecting to MongoDB:', error);
//             });
//         req.mongo = mongoose;
//         isMongoConnected = true;

//         console.log('connecting to mongo 2 :',req.mongo? req.mongo.connection.readyState : null);

//         return next();
//     } catch (err) {
//         console.error("Could not connect to MongoDB:", err);
//         res.status(500).send("Server error");
//     }
//     console.log('connecting to mongogpt:', req.mongo ? req.mongo.connection.readyState : null);

// }



// // const User = mongoose.model('User', userSchema);
// // const userSymbol = new UserSymbol(req.db);

// // (async () => {
// //     await mongoose.connect('mongodb://127.0.0.1:27017/mymongo');
// //     console.log('connected');

// //     const user = new User({
// //         name: {
// //             first: 'Shahar',
// //             last: 'Solomianik'
// //         },
// //         email: 'shahar@johnbryce.co.il',
// //         birthday: moment('1975-07-18').toDate(),
// //     })

// //     await user.save();

// //     console.log('user created, check in mongo');

// // })()    

// // // hint
// // // const instance = new SomeModel(modelData);
// // // await instance.save();



const mongoose = require('mongoose');
const config = require('config');

let isMongoConnected = false;

module.exports = async (req, res, next) => {
  console.log('first mongo', req.mongo ? req.mongo.connection : false);
  
  if (!isMongoConnected) {
    try {
      console.log('start connecting to mongo');
      await mongoose.connect(`mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.db')}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      req.mongo = mongoose; // Assign the mongoose instance directly to req.mongo
      isMongoConnected = true;
  
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error("Could not connect to MongoDB:", err);
      return res.status(500).send("Server error");
    }
  }
  
  console.log('connecting to mongo:', req.mongo ? req.mongo.connection.readyState : null);
  return next();
};

