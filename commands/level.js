const Levels = require("discord-xp")
const canvacord = require("canvacord")
const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
    name: 'level',
    description: 'Sagt dir welches Level die Person hat',
    async execute(message, args, client) {
        let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentionedMember) mentionedMember = message.member;

        const target = await Levels.fetch(mentionedMember.user.id, message.guild.id, true);
        if (!target) return message.channel.send("Diese Person hat noch keinerlei XP auf diesem Server.");

        try {
            
            axios.get(`https://discord.com/api/users/${mentionedMember.id}`, {
                    headers: {
                        Authorization: `Bot ${client.token}`,
                    },
                })
                .then((res) => {
                    const {
                        banner,
                        banner_color
                    } = res.data;
                    if (banner == null) img = "https://cdn.discordapp.com/attachments/819909032432107581/870670106328436796/unknown.png"
                    else img =`https://cdn.discordapp.com/banners/${mentionedMember.id}/${banner}.png?size=4096`
                    if (banner_color == null) Farbe = "#0066ff"
                    else Farbe = banner_color
                    const Anzahllevel = target.level
                    const AnzahlXP = target.xp - Levels.xpFor(target.level)
                    const RequiredXP = Levels.xpFor(target.level + 1) - Levels.xpFor(target.level)
                    const rank = new canvacord.Rank()
                        .setAvatar(mentionedMember.user.displayAvatarURL({
                            dynamic: false,
                            format: "png"
                        }))
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
                        })
                })
        } catch (err) {
            console.log(err);
        }
    }
};