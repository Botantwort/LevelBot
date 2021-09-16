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
        if (mentionedMember.user.bot) {
            mentionedMember.user.id = "869212452955516978"
        }
        const target = await Levels.fetch(mentionedMember.user.id, message.guild.id, true);
        if (!target) return message.channel.send("Diese Person hat noch keinerlei XP auf diesem Server.");
        message.channel.send('Rankcard lädt...').then((resultMessage) => {
        try {
            axios.get(`https://discord.com/api/users/${mentionedMember.id}`, {
                    headers: {
                        Authorization: `Bot ${client.token}`,
                    },
                })
                .then((res) => {
                    const {
                        avatar,
                        banner,
                        banner_color
                    } = res.data;
                    Informationen = ""
                    Informationen2 = ""
                    Profilbild = `https://cdn.discordapp.com/avatars/${mentionedMember.id}/${avatar}.png?size=256`
                    if (avatar == null) Profilbild = `https://cdn.discordapp.com/attachments/819909032432107581/885152405631692800/Unbenannt.png`
                    if (banner == null) {
                        img = "https://cdn.discordapp.com/attachments/819909032432107581/870670106328436796/unknown.png";
                        Informationen = "Zum ändern des Hintergrunds Andreas anschreiben."
                    } else img = `https://cdn.discordapp.com/banners/${mentionedMember.id}/${banner}.png?size=4096`
                    if (mentionedMember.id == "475719554689925141") Informationen = "" // Ich
                    if (mentionedMember.id == "484754350179352588") {
                        img = "https://cdn.discordapp.com/attachments/854321680524902420/880749160352079872/Screenshot_3_levelbot.png";
                        Informationen = ""
                    } // Aimer
                    if (mentionedMember.id == "731761337046269964") {
                        img = "https://cdn.cloudflare.steamstatic.com/steam/apps/326460/header.jpg?t=1595374372";
                        Informationen = ""
                    } // Chicco    
                    if (mentionedMember.id == "536956850747342848") {
                        img = "https://cdn.cloudflare.steamstatic.com/steam/apps/326460/header.jpg?t=1595374372";
                        Informationen = ""
                    } // auch Chicco
                    if (mentionedMember.id == "416198708796063744") {
                        img = "https://cdn.discordapp.com/attachments/741695049867460680/879367184684572712/Traurige_Liebe.jpg";
                        Informationen = ""
                    } // Gecki
                    if (mentionedMember.id == "450282638339735552") {
                        img = "https://cdn.discordapp.com/attachments/819909032432107581/879681376578846720/unknown.png";
                        Informationen = ""
                    } // Tanntus
                    if (mentionedMember.id == "420995855139602442") {
                        img = "https://cdn.discordapp.com/attachments/724231281466015807/879683072382087178/aacabcac791509af6323f387ebd1c2f7.jpg";
                        Informationen = ""
                    } // Skittles
                    if (mentionedMember.id == "648803580182134796") {
                        img = "https://cdn.discordapp.com/attachments/781900417956446218/880782801702625330/pokeball.jpg";
                        Informationen = ""
                    } // Zwergerl
                    if (mentionedMember.id == "294720427148705792") {
                        img = "https://cdn.discordapp.com/attachments/819909032432107581/880916272181825577/unknown.png";
                        Informationen = ""
                    } // Skillzz
                    if (mentionedMember.id == "494848677547081738") {
                        img = "https://cdn.discordapp.com/attachments/876435783119142943/888018064732463175/unknown-361.jpg";
                        Informationen = ""
                    } // Buschi
                    if (banner_color == null) {
                        Farbe = "#0066ff";
                        Informationen2 = "Zum ändern deiner Trackbarcolor deine Profilfarbe ändern! (Bei Einstellungen > Nutzerprofil)"
                    } else Farbe = banner_color;
                    if (Farbe == "#484B4E") DieAndereFarbe = "#808080"
                    else DieAndereFarbe = "#484B4E"
                    if (mentionedMember !== message.member) {
                        Informationen = "";
                        Informationen2 = ""
                    }
                    Anzahllevel = target.level;
                    AnzahlXP = target.xp - Levels.xpFor(target.level);
                    RequiredXP = Levels.xpFor(target.level + 1) - Levels.xpFor(target.level);
                    Platzierung = target.position;
                    PlatzierungName = "RANK";
                    if (mentionedMember.user.bot) {
                        img = "https://rondea.com/wp-content/uploads/2021/02/1250347-you-can-now-rickroll-people-in-4k.jpg";
                        Anzahllevel = 420;
                        AnzahlXP = 13;
                        RequiredXP = 37;
                        Platzierung = 69;
                        PlatzierungName = "NICE";
                        Profilbild = "https://cdn.discordapp.com/attachments/819909032432107581/880224877049688064/unknown.png";
                        Informationen = "";
                        Informationen2 = ""
                    } // Der Bot
                    const rank = new canvacord.Rank()
                        .setAvatar(Profilbild)
                        .setBackground("IMAGE", img)
                        .setLevel(Anzahllevel)
                        .setRank(Platzierung, PlatzierungName, true)
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
                            const attachment = new Discord.MessageAttachment(data, `Rankcard von ${mentionedMember.user.username}.png`);
                            resultMessage.delete()
                            message.channel.send(`${Informationen}\n${Informationen2}`, attachment)
                        })
                })
        } catch (err) {
            console.log(err);
        }})
    }
};