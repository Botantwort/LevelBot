const Levels = require("discord-xp")
const canvacord = require("canvacord")
const Discord = require("discord.js");
    
module.exports = {
    name: 'level',
    description: 'Sagt dir welches Level die Person hat',
    async execute(message, args, client) {
        let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentionedMember) mentionedMember = message.member;

        const target = await Levels.fetch(mentionedMember.user.id, message.guild.id, true);
        if (!target) return message.channel.send("Diese Person hat noch keinerlei XP auf diesem Server.");

        try {
            //message.channel.send(mentionedMember.user.tag + " ist Level " + target.level + " und es fehlen noch " + (Levels.xpFor(target.level + 1) - target.xp) + " XP zum nächsten Level!");
            let img = "https://cdn.discordapp.com/attachments/819909032432107581/870670106328436796/unknown.png";
            let Farbe = "#0066ff"
            const Anzahllevel = target.level
            const AnzahlXP = target.xp - Levels.xpFor(target.level)
            const RequiredXP = Levels.xpFor(target.level + 1) - Levels.xpFor(target.level)
            const rank = new canvacord.Rank()
                .setAvatar(mentionedMember.user.displayAvatarURL({dynamic : false, format: "png"}))
                .setBackground("IMAGE", img)
                .setLevel(Anzahllevel)
                .setRank(target.position, "RANK", true)
                .setCurrentXP(AnzahlXP)
                .setRequiredXP(RequiredXP)
                .setStatus(mentionedMember.presence.status, true, 5)
                .setProgressBar(Farbe, "COLOR")
                .setUsername(`${mentionedMember.user.username}`)
                .setDiscriminator(`${mentionedMember.user.discriminator}`)
                .renderEmojis(true)

            rank.build()
                .then(data => {
                    const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                    message.channel.send(attachment);
                });
        } catch (err) {

            console.log(err);
        } 
    },
};