const Levels = require("discord-xp");
const Discord = require("discord.js");
const random = require("random")
const fs = require("fs");
const jsonfile = require("jsonfile");

module.exports = {
    name: 'message',
    async execute(message, client) {
        let nice = ['69'];
        let foundInText = false;
        for (var i in nice) {
            if (message.content.toLowerCase().includes(nice[i].toLowerCase())) foundInText = true;
        }
        let NichtNice = ['https://', '<:', ':smirktus:', "<!@", "<@&", "<#", "<@", "<a:"]
        let gefunden = false;
        for (var i in NichtNice) {
            if (message.content.toLowerCase().includes(NichtNice[i].toLowerCase())) gefunden = true;
        }
        if (!gefunden) {
            if (foundInText) {
                message.channel.send("69, nice. <:smirktus:859170348263276545>")
            }
        }
        if (message.author.bot) return;
        const Zeit = Date.now()
        if (message.channel.type == "dm") return message.channel.send(`Es sind schon ${Zeit} millisekunden, also circa ${Math.floor(Zeit/60000)} Minuten oder ${Math.floor(Zeit/3600000)} Stunden oder ${Math.floor(Zeit/86400000)} Tage oder ${Math.floor(Zeit/39420000000)} Jahre seit dem 01.01.1970 00:00:00 UTC vergangen... und trotzdem gibt es Leute die denken dass man nen Bot doch DMen soll? Hier haste nen rickroll. <:dogUpset_HundFrustriert:787994935911645204> https://tenor.com/view/dance-moves-dancing-singer-groovy-gif-17029825`);

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
                debug: false
            };
        }

        const userStats = guildStats[message.author.id];

        var settings = {};
        if (fs.existsSync("settings.json")) {
            settings = jsonfile.readFileSync("settings.json");
        }

        if (message.author.id in settings === false) {
            settings[message.author.id] = {
                Hintergrund: null,
                name: `${message.author.username}#${message.author.discriminator}`
            };
        } 
        const Einstellungen = settings[message.author.id]
        if (Einstellungen.name !== `${message.author.username}#${message.author.discriminator}`) {
            Einstellungen.name = `${message.author.username}#${message.author.discriminator}`
            jsonfile.writeFileSync("settings.json", settings)
        }

        let botchannel = ['741720422285836441', "741695385042550868", "741699889322262691", "888040968610250782"];
        let Botchannel = false;
        for (var b in botchannel) {
            if (message.channel.id.toLowerCase().includes(botchannel[b].toLowerCase())) Botchannel = true;
        }
        if (!Botchannel) {
            if (!message.content.startsWith(client.prefix)) {
                if (Date.now() - userStats.last_message > 30000) {
                    userStats.last_message = Date.now();


                    jsonfile.writeFileSync("stats.json", stats);
                    const randomXP = Math.floor(Math.random() * 25) + 15;
                    if (userStats.debug == true) {
                        if (message.guild.id == "741694739279118446") Debugchannel = await client.channels.fetch("888040968610250782")
                        else Debugchannel = await client.channels.fetch("746716303267594290")
                        if (message.content.length < 100) {Inhalt = `${message.content}`; Punkte = ""}
                        else {
                            var string = `${message.content}`;
                            var length = 100;
                            var trimmedString = string.substring(0, length);
                            Inhalt = `${trimmedString}`
                            Punkte = "..."
                        }
                        Debugchannel.send(`${message.author.username} bekam ${randomXP} XP für die Nachricht: ` + "`" + Inhalt + "`"+ Punkte);
                    }
                    if (userStats.debug == "dm") {
                        message.author.send(`Du bekamst ${randomXP} XP für die Nachricht`)
                    }
                    if (!userStats.debug) {
                        userStats.debug = false
                        jsonfile.writeFileSync("stats.json", stats);
                    }

                    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
                    const user = await Levels.fetch(message.author.id, message.guild.id);
                    if (hasLeveledUp) {
                        const user = await Levels.fetch(message.author.id, message.guild.id);
                        message.channel.send(`${message.member}, du hast Level ${user.level} erreicht! Weiter so!`)
                    }
                    if (user.xp >= 1150) {
                        let role = message.guild.roles.cache.find(role => role.name == "Bronze");
                        if (!role) await message.guild.roles.create({
                            data: {
                                name: "Bronze",
                                color: "#8C4931"
                            }
                        }).catch(err => console.log(err));
                        role = message.guild.roles.cache.find(role => role.name == "Bronze");
                        if (!message.member.roles.cache.has(role.id)) {
                            await message.member.roles.add(role.id);
                            message.reply("du hast Bronze erreicht!")
                        }
                    }

                    if (user.xp >= 4675) {
                        let role = message.guild.roles.cache.find(role => role.name == "Silber");
                        if (!role) await message.guild.roles.create({
                            data: {
                                name: "Silber",
                                color: "#3A747B"
                            }
                        }).catch(err => console.log(err));
                        role = message.guild.roles.cache.find(role => role.name == "Silber");
                        if (!message.member.roles.cache.has(role.id)) {
                            await message.member.roles.add(role.id);
                            message.reply("du hast Silber erreicht!")
                        }
                    }

                    if (user.xp >= 23850) {
                        let role = message.guild.roles.cache.find(role => role.name == "Gold");
                        if (!role) await message.guild.roles.create({
                            data: {
                                name: "Gold",
                                color: "#A98038"
                            }
                        }).catch(err => console.log(err));
                        role = message.guild.roles.cache.find(role => role.name == "Gold");
                        if (!message.member.roles.cache.has(role.id)) {
                            await message.member.roles.add(role.id);
                            message.reply("du hast Gold erreicht!")
                        }
                    }

                    if (user.xp >= 67525) {
                        let role = message.guild.roles.cache.find(role => role.name == "Diamond");
                        if (!role) await message.guild.roles.create({
                            data: {
                                name: "Diamond",
                                color: "#01BADB"
                            }
                        }).catch(err => console.log(err));
                        role = message.guild.roles.cache.find(role => role.name == "Diamond");
                        if (!message.member.roles.cache.has(role.id)) {
                            await message.member.roles.add(role.id);
                            message.reply("du hast Diamond erreicht!")
                        }
                    }

                    if (user.xp >= 145700) {
                        let role = message.guild.roles.cache.find(role => role.name == "Emerald");
                        if (!role) await message.guild.roles.create({
                            data: {
                                name: "Emerald",
                                color: "#19F203"
                            }
                        }).catch(err => console.log(err));
                        role = message.guild.roles.cache.find(role => role.name == "Emerald");
                        if (!message.member.roles.cache.has(role.id)) {
                            await message.member.roles.add(role.id);
                            message.reply("du hast Emerald erreicht!")
                        }
                    }

                    if (user.xp >= 268375) {
                        let role = message.guild.roles.cache.find(role => role.name == "Rubin");
                        if (!role) await message.guild.roles.create({
                            data: {
                                name: "Rubin",
                                color: "#D63E53"
                            }
                        }).catch(err => console.log(err));
                        role = message.guild.roles.cache.find(role => role.name == "Rubin");
                        if (!message.member.roles.cache.has(role.id)) {
                            await message.member.roles.add(role.id);
                            message.reply("du hast Rubin erreicht!")
                        }
                    }

                    if (user.xp >= 445550) {
                        let role = message.guild.roles.cache.find(role => role.name == "Titan");
                        if (!role) await message.guild.roles.create({
                            data: {
                                name: "Titan",
                                color: "#651AC0"
                            }
                        }).catch(err => console.log(err));
                        role = message.guild.roles.cache.find(role => role.name == "Titan");
                        if (!message.member.roles.cache.has(role.id)) {
                            await message.member.roles.add(role.id);
                            message.reply("du hast Titan erreicht!")
                        }
                    }

                    if (user.xp >= 687225) {
                        let role = message.guild.roles.cache.find(role => role.name == "Veteran");
                        if (!role) await message.guild.roles.create({
                            data: {
                                name: "Veteran",
                                color: "#AA0926"
                            }
                        }).catch(err => console.log(err));
                        role = message.guild.roles.cache.find(role => role.name == "Veteran");
                        if (!message.member.roles.cache.has(role.id)) {
                            await message.member.roles.add(role.id);
                            message.reply("du hast Veteran erreicht!")
                        }
                    }

                    if (user.xp >= 1192550) {
                        let role = message.guild.roles.cache.find(role => role.name == "Halbgott");
                        if (!role) await message.guild.roles.create({
                            data: {
                                name: "Halbgott",
                                color: "#7B970E"
                            }
                        }).catch(err => console.log(err));
                        role = message.guild.roles.cache.find(role => role.name == "Halbgott");
                        if (!message.member.roles.cache.has(role.id)) {
                            await message.member.roles.add(role.id);
                            message.reply("du hast Halbgott erreicht!")
                        }
                    }

                    if (user.xp >= 1899250) {
                        let role = message.guild.roles.cache.find(role => role.name == "Gottheit");
                        if (!role) await message.guild.roles.create({
                            data: {
                                name: "Gottheit",
                                color: "#B0EDF1"
                            }
                        }).catch(err => console.log(err));
                        role = message.guild.roles.cache.find(role => role.name == "Gottheit");
                        if (!message.member.roles.cache.has(role.id)) {
                            await message.member.roles.add(role.id);
                            message.reply("du hast Gottheit erreicht!")
                        }
                    }
                }
            }
        }
        if (message.content.includes("<@!869212452955516978>")) message.reply("ping mich nicht <:dani_ping:880941566351536128>")

        if (!message.content.startsWith(client.prefix)) return;

        const args = message.content.slice(client.prefix.length).trim().split(/ +/);
        commandName = args.shift().toLowerCase();
        if (commandName == "rank") {
            commandName = "level"
        }
        if (commandName == "lb") {
            commandName = "leaderboard"
        }
        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);

        command.execute(message, args, client);
    },
};