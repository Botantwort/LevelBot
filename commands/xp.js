const Levels = require("discord-xp")
const Discord = require("discord.js")

module.exports = {
    name: 'xp',
    description: 'zeigt wie viel xp und wie viel noch zum nächsten level',
    async execute(message, args, client) {
        let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!mentionedMember) {
            mentionedMember = message.member;
            Wer = "Du hast";
            Wer2 = "hast du: "
        } else {
            if (mentionedMember.nickname !== null) Name = mentionedMember.nickname;
            else Name = mentionedMember.user.username;
            Wer = Name + " hat";
            Wer2 = "hat " + mentionedMember.user.username + ": "
        }
        if (mentionedMember.user.bot) return message.channel.send(mentionedMember.user.username + " ist ein Bot und Bots bekommen keine XP.")
        const target = await Levels.fetch(mentionedMember.user.id, message.guild.id, true);
        if (!target) return message.channel.send("Diese Person hat noch keinerlei XP auf diesem Server.")

        const XpAnzahl = target.xp
        Informationen = ""
        if (1150 > XpAnzahl) Informationen = `${1150 - XpAnzahl} XP bis zu Bronze`
        if (XpAnzahl > 1150) Informationen = `${4675 - XpAnzahl} XP bis zu Silber`
        if (XpAnzahl > 4675) Informationen = `${23850 - XpAnzahl} XP bis zu Gold`
        if (XpAnzahl > 23650) Informationen = `${67535 - XpAnzahl} XP bis zu Diamond`
        if (XpAnzahl > 67535) Informationen = `${145700 - XpAnzahl} XP bis zu Emerald`
        if (XpAnzahl > 145700) Informationen = `${268375 - XpAnzahl} XP bis zu Rubin`
        if (XpAnzahl > 268375) Informationen = `${445550 - XpAnzahl} XP bis zu Titan`
        if (XpAnzahl > 445550) Informationen = `${687225 - XpAnzahl} XP bis zu Veteran`
        if (XpAnzahl > 687225) Informationen = `${1192550 - XpAnzahl} XP bis zu Halbgott`
        if (XpAnzahl > 1192550) Informationen = `${1899250 - XpAnzahl} XP bis zu Gottheit`
        if (XpAnzahl > 1899250) return message.channel.send(`<@${mentionedMember.id}> hat schon die maximale Xprole erreicht und hat ${XpAnzahl} XP!`)
        if (Informationen !== "") message.channel.send(`${Wer} gerade ${XpAnzahl} XP und es fehlen noch ${Informationen}.`)
        if (Informationen == "") message.channel.send("Irgendetwas ist schiefgelaufen. So viele XP " + Wer2 + XpAnzahl)
    }
}