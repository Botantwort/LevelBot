const Levels = require("discord-xp");

module.exports = {
    name: 'edit',
    description: 'das level oder die xp eines users bearbeiten',
    async execute(message, args, client) {
        let usage = "°edit @member [xp,level] [add, set, remove] <nummer>";
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        
        if(!message.member.hasPermission("ADMINISTRATOR")) {message.reply ("Du hast nicht ausreichend Rechte dafür!"); return};
        if (!args[0]) return message.channel.send("Du hast zu wenig Argumente angegeben: " + usage);
        if (!mentionedMember) return message.channel.send("Dieser User scheint nicht aufn Server zu sein oder ist noch nicht in meiner Database, der User muss in dem Fall etwas schreiben und dann versuch es erneut.");
        if (!args[1]) return message.channel.send("Du musst mir sagen ob du die XP oder das Level von diesem User verändern willst: " + usage);
        if (!["xp", "level"].includes(args[1])) return message.channel.send("Da stand weder XP noch Level " + usage);
        if (args[1] == "xp") {
            if (!["add", "set", "remove"].includes(args[2])) return message.channel.send("Du musst mir sagen ob ich dem User die Xp hinzufügen soll, entfernen soll oder ihm zu diese Xp als seine jetzigen betrachten soll! " + usage);
            const value = Number(args[3]);
            const levelUser = await Levels.fetch(mentionedMember.user.id, message.guild.id);
            if (!levelUser) return message.channel.send("Dieser User ist noch nicht in meiner Database, der User muss etwas schreiben.");
            if (args[2] == "add") {
                if (!value) return message.channel.send("Die Nummer die du angegeben hast ist keine gültige Menge!");
                try {
                    await Levels.appendXp(mentionedMember.user.id, message.guild.id, value)
                    message.channel.send("Erfolgreich " + value + " XP dem User " + mentionedMember.user.tag + " hinzugefügt!")
                } catch (err) {
                    console.log(err);
                }
            } else if (args[2] == "remove") {
                if (!value) return message.channel.send("Die Nummer die du angegeben hast ist keine gültige Menge!");
                try {
                    await Levels.appendXp(mentionedMember.user.id, message.guild.id, -value)
                    message.channel.send("Erfolgreich " + value + " XP dem User " + mentionedMember.user.tag + " weggenommen!")
                } catch (err) {
                    console.log(err);
                }
            } else if (args[2] == "set") {
                if (!value) return message.channel.send("Die Nummer die du angegeben hast ist keine gültige Menge!");
                try {
                    await Levels.setXp(mentionedMember.user.id, message.guild.id, value)
                    message.channel.send("Der User " + mentionedMember.user.tag + " hat jetzt genau " + value + " XP!")
                } catch (err) {
                    console.log(err);
                }
            };
        } else if (args[1] == "level") {
            if (!["add", "set", "remove"].includes(args[2])) return message.channel.send("Du musst mir sagen ob ich dem User das Level hinzufügen soll, entfernen soll oder das Level als sein jetziges betrachten soll! " + usage);
            const value = Number(args[3]);
            const levelUser = await Levels.fetch(mentionedMember.user.id, message.guild.id);
            if (!levelUser) return message.channel.send("Dieser User ist noch nicht in meiner Database, entweder der User muss was schreiben oder du kontaktierst Andreas#7374 um ihn manuell zu adden, falls das überhaupt geht idk hab ich noch nicht getestet.");
            if (args[2] == "add") {
                if (!value) return message.channel.send("Die Nummer die du angegeben hast ist keine gültige Menge!");
                try {
                    await Levels.appendLevel(mentionedMember.user.id, message.guild.id, value)
                    message.channel.send("Erfolgreich " + value + " Level dem User " + mentionedMember.user.tag + " hinzugefügt!")
                } catch (err) {
                    console.log(err);
                }
            } else if (args[2] == "remove") {
                if (!value) return message.channel.send("Die Nummer die du angegeben hast ist keine gültige Menge!");
                try {
                    await Levels.appendLevel(mentionedMember.user.id, message.guild.id, -value)
                    message.channel.send("Erfolgreich " + value + " Level dem User " + mentionedMember.user.tag + " weggenommen!")
                } catch (err) {
                    console.log(err);
                }
            } else if (args[2] == "set") {
                if (!value) return message.channel.send("Die Nummer die du angegeben hast ist keine gültige Menge!");
                try {
                    await Levels.setLevel(mentionedMember.user.id, message.guild.id, value)
                    message.channel.send("Der User " + mentionedMember.user.tag + " ist jetzt genau Level " + value + "!")
                } catch (err) {
                    console.log(err);
                }
            }
        }
    },
};