const Levels = require("discord-xp");
const Discord = require("discord.js");

module.exports = {
	name: 'message',
	async execute(message, client) {
		if (message.author.bot) return;
        if (message.channel.type == "dm") return;

        const randomXP = Math.floor(Math.random() * 25) + 15;
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
        if (hasLeveledUp) {
            const user = await Levels.fetch(message.author.id, message.guild.id);
            message.channel.send(`${message.member}, du hast Level ${user.level} erreicht! Weiter so!`) 
            
        if (user.xp >= 1150) {
            let role = message.guild.roles.cache.find(role => role.name == "Bronze");
            if (!role) await message.guild.roles.create({
                data: {
                    name: "Bronze",
                    color: "#8C4931"
                }
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Bronze");
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
                message.channel.send("Du hast Bronze erreicht!")
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
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
                message.channel.send("Du hast Silber erreicht!")
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
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
                message.channel.send("Du hast Gold erreicht!")
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
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
                message.channel.send("Du hast Diamond erreicht!")
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
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
                message.channel.send("Du hast Emerald erreicht!")
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
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
                message.channel.send("Du hast Rubin erreicht!")
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
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
                message.channel.send("Du hast Titan erreicht!")
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
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
                message.channel.send("Du hast Veteran erreicht!")
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
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
                message.channel.send("Du hast Halbgott erreicht!")
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
                    if (message.member.roles.cache.has(role.id)) return;
                    else await message.member.roles.add(role.id);
                    message.channel.send("Du hast Gottheit erreicht!")
                } 
    }

        if (!message.content.startsWith(client.prefix)) return;

        const args = message.content.slice(client.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName) || client.command.find(a => a.aliases && a.aliases.includes(commandName));

     try {
        command.execute(message, args, client);
        } catch (error) {
            console.log(err);
        }
	},
};