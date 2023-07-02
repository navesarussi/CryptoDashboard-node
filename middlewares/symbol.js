const SymbolValue = require('../models/mongo/symbol-value')
const UserSymbol = require('../models/mysql/user-symbols');

const symbol = async (req, res,next) => {
    try {
        console.log("post symbol",req.body.symbol);
        console.log("id: ",req.user.id);
        const userSymbol = new UserSymbol(req.db);
        await userSymbol.add({
            userId: req.user.id,
            symbol: req.body.symbol,
        });
        console.log("post symbol",req.body.symbol,"id: ",req.user.id);
        res.redirect('/users/dashboard');
    } catch (err) {
        next(err);
    }};
module.exports = symbol;