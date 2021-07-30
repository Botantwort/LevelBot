const Levels = require("discord-xp")

module.exports = {
	name: 'level',
	description: 'Sagt dir welches Level die Person hat',
	async execute(message, args, client) {
		let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentionedMember) mentionedMember = message.member;

        const target = await Levels.fetch(mentionedMember.user.id, message.guild.id);
        if (!target) return message.channel.send("Diese Person hat noch keinerlei XP auf diesem Server.");

        try {
            message.channel.send(mentionedMember.user.tag + " ist Level " + target.level + " und es fehlen noch " + (Levels.xpFor(target.level + 1) - target.xp) + " XP zum nächsten Level!");
        } catch (err) {
            console.log(err);
        }
	},
};