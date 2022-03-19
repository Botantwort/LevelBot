const Levels = require("discord-xp")
const canvacord = require("canvacord")
const Discord = require("discord.js");
const axios = require("axios");
const fs = require("fs");
const jsonfile = require("jsonfile");

module.exports = {
    name: 'level',
    description: 'Sagt dir welches Level die Person hat',
    async execute(message, args, client) {
      Informationen = ""
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
                            banner_color
                        } = res.data;
                        Informationen2 = ""
                        Profilbild = `https://cdn.discordapp.com/avatars/${mentionedMember.id}/${avatar}.png?size=256`
                        if (avatar == null) Profilbild = `https://cdn.discordapp.com/attachments/819909032432107581/885152405631692800/Unbenannt.png`
                        img = "https://cdn.discordapp.com/attachments/819909032432107581/870670106328436796/unknown.png";
                        if (banner_color == null) {
                            Farbe = "#0066ff";
                        } else Farbe = banner_color;
                        if (Farbe == "#484B4E") DieAndereFarbe = "#808080"
                        else DieAndereFarbe = "#484B4E"
                        if (mentionedMember !== message.member) {
                            Informationen = "";
                            Informationen2 = ""
                        }
                        Anzahllevel = target.level;
                         AnzahlXP = target.xp - Levels.xpFor(target.level)
                       
                       RequiredXP = Levels.xpFor(target.level + 1) - Levels.xpFor(target.level)

                        Platzierung = target.position

                        PlatzierungName = "RANK"

                        if (mentionedMember.user.bot) {

                            img = "https://rondea.com/wp-content/uploads/2021/02/1250347-you-can-now-rickroll-people-in-4k.jpg"

                            Anzahllevel = 420;
                            AnzahlXP = 13;
                            RequiredXP = 37;
                            Platzierung = 69;
                            PlatzierungName = "NICE";
                            Profilbild = "https://cdn.discordapp.com/attachments/819909032432107581/880224877049688064/unknown.png";
                            Informationen = "";
                            Informationen2 = ""
                        }// Der Bot
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
            }
        })
    }
};