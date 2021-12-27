const fs = require("fs");
const jsonfile = require("jsonfile");

module.exports = {
    name: 'hintergrund',
    description: 'Setzte den Hintergrund bei der Rankcard',
    execute(message, args, client) {
        message.channel.send("Könnt euch bei Gecki etc bedanken dass das jetzt weg ist.")
    }
}