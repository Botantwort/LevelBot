const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            family: 4
        };

        mongoose.connect(`mongodb+srv://Botantwort:${process.env.PASSWORT}@bot.p4gse.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, dbOptions);
        mongoose.set("useFindAndModify", false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on("connected", () => {
            console.log("Der Bot wurde zur Database verbunden!");
        });
        
        mongoose.connection.on("disconnected", () => {
            console.log("Der Bot hat die Verbindung zur Database getrennt!");
        });
        
        mongoose.connection.on("err", (err) => {
            console.log("Es gab einen Fehler mit der Verbindung zur Database: " + err);
        });
    }
}