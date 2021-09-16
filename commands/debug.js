const fs = require("fs");
const jsonfile = require("jsonfile");
module.exports = {
	name: 'debug',
	description: 'debug oder nicht?',
	execute(message, args, client) {
        var stats = {};
        if (fs.existsSync("stats.json")) {
            stats = jsonfile.readFileSync("stats.json");
        }


        if (message.guild.id in stats === false) {
            stats[message.guild.id] = {};
        }

        const guildStats = stats[message.guild.id];
        if (message.author.id in guildStats === false) {
            guildStats[message.author.id] = {
                last_message: 0,
                debug: true
            };
        }

        const userStats = guildStats[message.author.id];

        if(!userStats.debug) {
            userStats.debug = true
            jsonfile.writeFileSync("stats.json", stats);
            message.channel.send("Debugging wurde auf `true` gesetzt. Zum ändern erneut `°debug` nutzen")
            return
        }

        if(userStats.debug == false) {
            userStats.debug = true
            jsonfile.writeFileSync("stats.json", stats);
            message.channel.send("Debugging wurde auf `true` gesetzt. Zum ändern erneut `°debug` nutzen")
            return
        }

        if(userStats.debug == true) {
            userStats.debug = false
            jsonfile.writeFileSync("stats.json", stats);
            message.channel.send("Debugging wurde auf `false` gesetzt. Zum ändern erneut `°debug` nutzen")}
            return
	},
  }