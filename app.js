const Discord = require("discord.js");
const Levels = require("discord-xp");
const client = new Discord.Client();
const mongoose = require("./database/mongoose");
const fs = require('fs');
const keepAlive = require('./server.js');
require("dotenv").config();


Levels.setURL(`mongodb+srv://Botantwort:${process.env.PASSWORT}@bot.p4gse.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
client.prefix = "°";
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

mongoose.init();
keepAlive();
client.login(process.env.TOKEN);