const mongoose = require('mongoose');
const config = require('config');
const cheerio = require('cheerio');
const axios = require('axios');

const { io } = require('socket.io-client');
const socket = io(`http://${config.get('worker.app.host')}:${config.get('worker.app.port')}`);

const SymbolValue = require('./models/mongo/symbol-value');

const scrape = async (symbol) => {
    try{
        const html = await axios(`https://www.google.com/finance/quote/${symbol.symbol}-USD`)
        const $ = cheerio.load(html.data);
        const value = $('.YMlKec.fxKbKc').text().replace(',','');
        
        const symbolValue = new SymbolValue({
            symbol: symbol.symbol,
            value: parseFloat(value),
            createdAt: new Date()
        });
        await symbolValue.save();
        await socket.emit('message from worker', {
            symbol: symbolValue.symbol,
            value: symbolValue.value,
        })
        console.log(`saved ${symbolValue.value} for ${symbolValue.symbol}`);
        return symbolValue;
    
    } catch (e) {
        console.log(e);
    }
}

const loop = async () => {
    // Query your MongoDB for distinct symbols instead of MySQL
    const symbols = await SymbolValue.distinct('symbol');
    console.log (`loop: found this symbol array: ${symbols.join(',')}`)

    const promises = [];
    symbols.forEach(symbol => promises.push(scrape({ symbol })));
    await Promise.allSettled(promises);

    console.log(`looped through ${symbols.join(',')}. Sleeping for ${config.get('worker.interval')}`)

    setTimeout(() => loop(), config.get('worker.interval'));
}

(async () => {
    // Ensure MongoDB connection string is correct
    const mongoURI = `mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.db')}`;
    console.log(`Connecting to MongoDB: ${mongoURI}`);

    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('connected to MongoDB');

    loop().catch(err => console.error(err));
})();
