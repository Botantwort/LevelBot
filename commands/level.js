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
                    Informationen = ""
                    Informationen2 = ""
                    if (banner == null) {
                        img = "https://cdn.discordapp.com/attachments/819909032432107581/870670106328436796/unknown.png";
                        Informationen = "Zum ändern des Hintergrunds Andreas anschreiben."
                    } else img = `https://cdn.discordapp.com/banners/${mentionedMember.id}/${banner}.png?size=4096`
                    if (mentionedMember.id == "475719554689925141") Informationen = ""
                    if (mentionedMember.id == "484754350179352588") {img = "https://cdn.discordapp.com/attachments/854321680524902420/879004975714418758/IMG_3633.jpg"; Informationen = ""}
                    if (mentionedMember.id == "731761337046269964") {img = "https://cdn.cloudflare.steamstatic.com/steam/apps/326460/header.jpg?t=1595374372"; Informationen = ""}
                    if (mentionedMember.id == "536956850747342848") {img = "https://cdn.cloudflare.steamstatic.com/steam/apps/326460/header.jpg?t=1595374372"; Informationen = ""}
                    if (mentionedMember.id == "416198708796063744") {img = "https://cdn.discordapp.com/attachments/741695049867460680/879367184684572712/Traurige_Liebe.jpg"; Informationen = ""}
                    if (banner_color == null) {
                        Farbe = "#0066ff";
                        Informationen2 = "Zum ändern deiner Trackbarcolor deine Profilfarbe ändern! (Bei Einstellungen > Nutzerprofil)"
                    } else Farbe = banner_color;
                    if (Farbe == "#484B4E") DieAndereFarbe = "#808080"
                    else DieAndereFarbe = "#484B4E"
                    const Anzahllevel = target.level
                    const AnzahlXP = target.xp - Levels.xpFor(target.level)
                    const RequiredXP = Levels.xpFor(target.level + 1) - Levels.xpFor(target.level)
                    const rank = new canvacord.Rank()
                        .setAvatar(mentionedMember.user.displayAvatarURL({
                            dynamic: false,
                            format: "png",
                        }))
                        .setBackground("IMAGE", img)
                        .setLevel(Anzahllevel)
                        .setRank(target.position, "RANK", true)
                        .setCurrentXP(AnzahlXP)
                        .setRequiredXP(RequiredXP)
                        .setStatus(mentionedMember.presence.status, false, 5)
                        .setProgressBar(Farbe, "COLOR")
                        .setProgressBarTrack(DieAndereFarbe)
                        .setUsername(`${mentionedMember.user.username}`)
                        .setDiscriminator(`${mentionedMember.user.discriminator}`)
                        .renderEmojis(true)
                    rank.build()
                        .then(data => {
                            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                            message.channel.send(attachment)
                            if (Informationen !== "") message.channel.send(Informationen)
                            if (Informationen2 !== "") message.channel.send(Informationen2)
                        })
                })
        } catch (err) {
            console.log(err);
        }
    }
};