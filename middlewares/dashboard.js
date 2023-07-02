const SymbolValue = require("../models/mongo/symbol-value");
const UserSymbol = require("../models/mysql/user-symbols");

const dashboard = async (req, res, next) => {
  console.log("d");
  console.log("reg", req.user.id);
  //console.log('db',req.db);

  try {
    const userSymbol = new UserSymbol(req.db);
    const userSymbols = await userSymbol.findByUserId({
      userId: req.user.id,
    });
    console.log("desss");
    //console.log(userSymbol);
    console.log(userSymbols);
    //   const promises = userSymbols.map(userSymbol => SymbolValue.findOne({symbol: userSymbol.symbol}).sort({createdAt: -1}).limit(1));
    // const promises = [];
    // userSymbols.forEach((userSymbol) => promises.push(SymbolValue.findOne({symbol: userSymbol.symbol}).sort({createdAt : -1}).limit(1)));
    // const symbolValues = await Promise.all(promises);
    // console.log("symbol values",symbolValues);

    const symbolValuePromises = userSymbols.map((userSymbol) =>
      SymbolValue.findOne({ symbol: userSymbol.symbol })
        .sort({ createdAt: -1 })
        .limit(1)
    );
    const symbolValues = await Promise.all(symbolValuePromises);
    console.log("symbol values", symbolValues);

    res.render("dashboard", {
      userSymbols,
      symbolValues,
    });
    console.log("desss");
    next();
  } catch (err) {
    console.log("desss  erorrrrr", err);
    next(err);
  }
};
module.exports = dashboard;
