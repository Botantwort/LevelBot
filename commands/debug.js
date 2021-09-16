const fs = require("fs");
const jsonfile = require("jsonfile");
module.exports = {
    name: 'debug',
    description: 'debug oder nicht?',
    async execute(message, args, client) {
        let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (mentionedMember) {
            if (mentionedMember.user.bot) {
                message.channel.send("Das ist ein Bot");
                return
            }
        }
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
        if (!mentionedMember) {
            if (userStats.debug == dm) {userStats.debug = true}
            if (args[0] == "dm") {
                userStats.debug = dm
                jsonfile.writeFileSync("stats.json", stats);
                message.channel.send("Debugging wurde auf `dm` gesetzt. Zum ändern erneut `°debug` nutzen")
                role = message.guild.roles.cache.find(role => role.name == "Debug");
                if (message.member.roles.cache.has(role.id)) {
                    await message.member.roles.remove(role.id);
                }
                return
            }
            if (!userStats.debug) {
                userStats.debug = true
                jsonfile.writeFileSync("stats.json", stats);
                message.channel.send("Debugging wurde auf `true` gesetzt. Zum ändern erneut `°debug` nutzen")
                let role = message.guild.roles.cache.find(role => role.name == "Debug");
                if (!role) await message.guild.roles.create({
                    data: {
                        name: "Debug",
                    }
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Debug");
                if (!message.member.roles.cache.has(role.id)) {
                    await message.member.roles.add(role.id);
                }
                return

            }
            if (userStats.debug == false) {
                userStats.debug = true
                jsonfile.writeFileSync("stats.json", stats);
                message.channel.send("Debugging wurde auf `true` gesetzt. Zum ändern erneut `°debug [dm]` nutzen")
                let role = message.guild.roles.cache.find(role => role.name == "Debug");
                if (!role) await message.guild.roles.create({
                    data: {
                        name: "Debug",
                    }
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Debug");
                if (!message.member.roles.cache.has(role.id)) {
                    await message.member.roles.add(role.id);
                }
                return
            }

            if (userStats.debug == true) {
                userStats.debug = false
                jsonfile.writeFileSync("stats.json", stats);
                message.channel.send("Debugging wurde auf `false` gesetzt. Zum ändern erneut `°debug [dm]` nutzen")
                let role = message.guild.roles.cache.find(role => role.name == "Debug");
                if (!role) await message.guild.roles.create({
                    data: {
                        name: "Debug",
                    }
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Debug");
                if (message.member.roles.cache.has(role.id)) {
                    await message.member.roles.remove(role.id);
                }
                return
            }
            
        }
        if (mentionedMember) {
            const mentionedStats = guildStats[mentionedMember.id]
            if (!mentionedStats.debug) {
                mentionedStats.debug = false
                jsonfile.writeFileSync("stats.json", stats);
            }
            message.channel.send(`${mentionedMember.user.username} hat Debug auf ${mentionedStats.debug} gestellt.`)
        }
    }

}