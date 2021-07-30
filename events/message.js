const Levels = require("discord-xp");

module.exports = {
	name: 'message',
	async execute(message, client) {
		if (message.author.bot) return;
        if (message.channel.type == "dm") return;

        const randomXP = Math.floor(Math.random() * 25) + 1;
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
        if (hasLeveledUp) {
            const user = await Levels.fetch(message.author.id, message.guild.id);
            message.channel.send(`${message.member}, du hast Level ${user.level} erreicht! Weiter so!`) 
            
            if (user.level >= 5) {
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
                }
            
            if (user.level >= 10) {
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
                }

            if (user.level >= 20) {
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
                }

            if (user.level >= 30) {
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
                }

            if (user.level >= 40) {
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
                } 
                        
            if (user.level >= 50) {
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
                }
            
            if (user.level >= 60) {
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
                }

            if (user.level >= 70) {
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
                }

            if (user.level >= 85) {
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
                }

            if (user.level >= 100) {
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
                    } 
        }

        if (!message.content.startsWith(client.prefix)) return;

        const args = message.content.slice(client.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);

        try {
            command.execute(message, args, client);
        } catch (error) {
            console.log(err);
        }
	},
};