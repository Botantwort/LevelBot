const Levels = require("discord-xp")
const Discord = require("discord.js");
module.exports = {
    name: 'pass',
    description: 'Wie viel xp und nachrichten um jemanden zu überholen',
    async execute(message, args, client) {
        let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!mentionedMember) {   
          mentionedMember = message.member
      }
        if (mentionedMember.user.bot) {
            return message.channel.send("Bots haben keine Xp!")
        }
      const target = await Levels.fetch(mentionedMember.user.id, message.guild.id, true);
        if (!target) return message.channel.send(`${mentionedMember.user.username} hat noch keinerlei XP auf diesem Server.`);
        Vergleich = message.member
        if (mentionedMember == message.member) {
            if (!args[1]) {
              const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, -1, true);
      				const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
              const lb = leaderboard.map(e => `${e.position};${e.userID}`);
              let Platzierung = target.position - 1
              var outputline = '';
              for (let i=0;i<lb.length;i++) {
              var line = lb[i];
              if (line.startsWith(Platzierung+';')) { //Das ; nach dem slicePunkt verhindert, dass er zum Beispiel bei '1' auch '10', '11', ... findet 
                outputline = line
              }
              }
              if (outputline=='') {
               message.channel.send("Es konnte keine Person gefunden werden die vor dir ist.")
               return
              }
              else {
                const Platzierungsding = Platzierung.toString().length + 1
                var DieID = outputline.substring(Platzierungsding, outputline.length)
                Vergleich = message.guild.members.cache.get(DieID)
              }
            }
        }
        if (args[1]) {
            let Zwei = args[1]
            if (args[1].startsWith("<")) {
                Zwei = `${args[1]}`.replace(/[^0-9]/g, '')
            }
            Vergleich = message.guild.members.cache.get(Zwei)
            if (!Vergleich) {
                return message.channel.send(`${args[1]} ist anscheinend keine gültige Erwähnung bzw. User ID!`)
            }
        }
        if (Vergleich == mentionedMember) return message.channel.send("Witzig <:Donhahaldtrump:720999258290913401>")
        if (Vergleich.user.bot) {
            return message.channel.send("Bots haben keine Xp!")
        }
        const Ziel = await Levels.fetch(Vergleich.user.id, message.guild.id, true);
        if (!Ziel) return message.channel.send(`${Vergleich.user.username} hat noch keinerlei XP auf diesem Server.`);
        Infomationen = ""
        if (((Math.floor((Ziel.xp - target.xp) / 27.5) / 120) > 1)) {
            var string = `${(Math.floor((Ziel.xp - target.xp) / 27.5) / 120)}`;
            var length = 3;
            var Stunden = string.substring(0, length);
            if (Stunden.endsWith(".")) {
                length = 4;
                Stunden = string.substring(0, length)
            }
            if (Stunden.endsWith(".0")) {
                length = 2;
                Stunden = string.substring(0, length)
            }
            Infomationen = `Das sind circa ${Stunden} Stunden wenn ${mentionedMember.user.username} alle 30 Sekunden etwas schreiben würde.`
        }
        if (Ziel.xp > target.xp) {
            message.channel.send(`${mentionedMember.user.username} braucht ${(Math.round((Ziel.xp - target.xp) * 100) / 100).toLocaleString()} XP um ${Vergleich.user.username} zu überholen. Das sind ~${(Math.round((Math.floor((Ziel.xp - target.xp)/27.5) * 100) / 100).toLocaleString())} Nachrichten. ${Infomationen}`)
        }
        if (((Math.floor((target.xp - Ziel.xp) / 27.5) / 120) > 1)) {
            var string = `${(Math.floor((target.xp - Ziel.xp) / 27.5) / 120)}`;
            var length = 3;
            var Stunden = string.substring(0, length)
            if (Stunden.endsWith(".")) {
                length = 4;
                Stunden = string.substring(0, length)
            }
            if (Stunden.endsWith(".0")) {
                length = 2;
                Stunden = string.substring(0, length)
            }
            Infomationen = `Das sind circa ${Stunden} Stunden wenn ${Vergleich.user.username} alle 30 Sekunden etwas schreiben würde.`
        }
        if (target.xp > Ziel.xp) {
            message.channel.send(`${Vergleich.user.username} braucht ${(Math.round((target.xp - Ziel.xp) * 100) / 100).toLocaleString()} XP um ${mentionedMember.user.username} zu überholen. Das sind ~${(Math.round((Math.floor((target.xp - Ziel.xp)/27.5) * 100) / 100).toLocaleString())} Nachrichten. ${Infomationen}`)
        }
    }
}