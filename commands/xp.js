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
            Wer2 = "hat " + Name + ": "
        }
        if (mentionedMember.user.bot) return message.channel.send(mentionedMember.user.username + " ist ein Bot und Bots bekommen keine XP.")
        const target = await Levels.fetch(mentionedMember.user.id, message.guild.id, true);
        if (!target) return message.channel.send("Diese Person hat noch keinerlei XP auf diesem Server.")

        const XpAnzahl = target.xp
        XpRoleName = ""
        if (1150 > XpAnzahl) {XpRole = 1150 - XpAnzahl; XpRoleName =`XP bis zu Bronze`}
        if (XpAnzahl > 1150) {XpRole = 4675 - XpAnzahl; XpRoleName = `XP bis zu Silber`}
        if (XpAnzahl > 4675) {XpRole = 23850 - XpAnzahl; XpRoleName = `XP bis zu Gold`}
        if (XpAnzahl > 23850) {XpRole = 67535 - XpAnzahl; XpRoleName = `XP bis zu Diamond`}
        if (XpAnzahl > 67535) {XpRole = 145700 - XpAnzahl; XpRoleName = `XP bis zu Emerald`}
        if (XpAnzahl > 145700) {XpRole = 268375 - XpAnzahl; XpRoleName = `XP bis zu Rubin`}
        if (XpAnzahl > 268375) {XpRole = 445550 - XpAnzahl; XpRoleName = `XP bis zu Titan`}
        if (XpAnzahl > 445550) {XpRole = 687225 - XpAnzahl; XpRoleName = `XP bis zu Veteran`}
        if (XpAnzahl > 687225) {XpRole = 1192550 - XpAnzahl; XpRoleName = `XP bis zu Halbgott`}
        if (XpAnzahl > 1192550) {XpRole = 1899250 - XpAnzahl; XpRoleName = `XP bis zu Gottheit`}
        n = XpAnzahl
        function formatXp(n) {
            return (Math.round(n * 100) / 100).toLocaleString();
        }
        m = XpRole
        function formatNeededXp(m) {
            return (Math.round(m * 100) / 100).toLocaleString();
        }
        
        if (XpAnzahl > 1899250) return message.channel.send(`${Wer} schon die maximale Xprole erreicht mit ${formatXp(n)} XP!`) 
        if (XpRoleName !== "") message.channel.send(`${Wer} gerade ${formatXp(n)} XP und es fehlen noch ${formatNeededXp(m)} ${XpRoleName}. Das sind ungefähr ${(Math.ceil(Math.round((XpRole/27.5) * 100) / 100).toLocaleString())} Nachrichten.`)
        if (XpRoleName == "") message.channel.send("Irgendetwas ist schiefgelaufen. So viele XP " + Wer2 + formatXp(n))
    }
}