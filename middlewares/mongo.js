const mongoose = require('mongoose');
const config = require('config');

module.exports = async (req, res, next) => {
    await mongoose.connect(`mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.db')}`);
    req.mongo = mongoose;
    return next();
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


