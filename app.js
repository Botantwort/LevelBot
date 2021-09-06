const Discord = require("discord.js");
const Levels = require("discord-xp");
const client = new Discord.Client();
const mongoose = require("./database/mongoose");
const fs = require('fs');
const keepAlive = require('./server.js');
require("dotenv").config();
const { registerFont, createCanvas } = require('canvas')
const canvas = createCanvas(500, 500)
const ctx = canvas.getContext('2d')

Levels.setURL(`mongodb+srv://Botantwort:${process.env.PASSWORT}@bot.p4gse.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
client.prefix = "°";
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.on('ready', async () => {
    console.log(`${client.user.tag} has sich in Discord eingelogged.`)
	registerFont('./Schriftart/Roboto_Codensed/RobotoCondensed-Bold.ttf', { family: 'Roboto' });
	ctx.font = '24px "Roboto Condensed"';
});


mongoose.init();
keepAlive();
client.login(process.env.TOKEN);
