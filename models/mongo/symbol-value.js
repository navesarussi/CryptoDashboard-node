const mongoose = require('mongoose');

const SymbolValueSchema = new mongoose.Schema({
    symbol: String,
    value: Number,
    createdAt: Date,
});

const SymbolValue = mongoose.model('SymbolValue', SymbolValueSchema);

module.exports = SymbolValue;

// class SymbolValue {
//     constructor (db) {
//         this.db = db;
//     };

//     async add ({symbol, value}) {
//         return this.db.execute(`
//             insert into symbolvalues (symbol, value)
//             values (?, ?)
//         `,[
//             symbol,
//             value,
//         ]);
//     };
    
// }


// module.exports = User;