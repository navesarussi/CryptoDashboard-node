const mongoose = require('mongoose');
const config = require('config');

module.exports = async (req, res, next) => {
    try {
        console.log('start connecting to mongo');
        await mongoose.connect(`mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.db')}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
            .then(() => {
              console.log('Connected to MongoDB');
              // Further code execution
            })
            .catch((error) => {
              console.error('Error connecting to MongoDB:', error);
            });
        req.mongo = mongoose;
        console.log('connecting to mongo');

        return next();
    } catch (err) {
        console.error("Could not connect to MongoDB:", err);
        res.status(500).send("Server error");
    }
}



// const User = mongoose.model('User', userSchema);
// const userSymbol = new UserSymbol(req.db);

// (async () => {
//     await mongoose.connect('mongodb://127.0.0.1:27017/mymongo');
//     console.log('connected');

//     const user = new User({
//         name: {
//             first: 'Shahar',
//             last: 'Solomianik'
//         },
//         email: 'shahar@johnbryce.co.il',
//         birthday: moment('1975-07-18').toDate(),
//     })

//     await user.save();

//     console.log('user created, check in mongo');

// })()    

// // hint
// // const instance = new SomeModel(modelData);
// // await instance.save();


