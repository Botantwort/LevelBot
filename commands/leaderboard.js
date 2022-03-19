const Levels = require("discord-xp");

module.exports = {
	name: 'leaderboard',
	description: 'Zeigt die Top 10 des Servers an',
	async execute(message, args, client) {
    Nachricht = ""
    AndereNummer = ""
		Nummer = Math.floor(Number(args[0]))
		if (!args[0]) Nummer = Number(5)
		if (message.member.id !== "475719554689925141") {
			if (Nummer < 0) {
				return message.channel.send("Was war jetzt da die Idee dahinter? <:2Head:788349690198097920>")
			}
			if (!Nummer) {
				return message.channel.send("Was auch immer du da gemacht hast, es war keine gültige Zahl die du angegeben hast.")
			}
		}
		if (message.member.id == "475719554689925141") {
			if (args[0] == "all") Nummer = -1
			if (!Nummer) {
				return message.channel.send("Was auch immer du da gemacht hast, es war keine gültige Zahl die du angegeben hast.")
			}
		}
    if (Nummer > 100){message.channel.send ("Das scheint mir doch zu viel zu sein!")
                    return }
			{
        if (Nummer > 10) {
          AndereNummer = Nummer + 2
          rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, AndereNummer, true)
          }
          else {
            rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, Nummer, true)
            }; // We grab top XY users with most xp in the current server.

				if (rawLeaderboard.length < 1) return message.reply("Keiner ist bisher im  Leaderboard.");

				const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

				const lb = leaderboard.map(e => `${e.position}. ${e.username}  XP: ${e.xp.toLocaleString()}`); // We map the outputs.

        if (Nummer > 10) {
          Platzierung = Nummer - 2
              var outputline = '';
              for (let i=0;i<lb.length;i++) {
              var line = lb[i];
              if (line.startsWith(Platzierung+'.')) { //Das ; nach dem slicePunkt verhindert, dass er zum Beispiel bei '1' auch '10', '11', ... findet 
                outputline = line 
                Nachricht = `**Das gesamte Leaderboard:**\n\n${lb.join("\n\n")}`
                var Dings = Nachricht.length 
                const RiskoStinkt = Nachricht.indexOf(outputline)
                
                if (RiskoStinkt == -1) {message.channel.send ("Das scheint mir doch zu viel zu sein!")
                    return }
                var Bums = Nachricht.substring(RiskoStinkt, Dings)
                message.channel.send(`**Hier sind die Plätze ${Platzierung} bis ${AndereNummer}:**\n\n${Bums}`)
                return
              }
              }
        }
				if (Nummer == -1) {
					Nachricht = `**Das gesamte Leaderboard:**\n\n${lb.join("\n\n")}`
				} else Nachricht = `**Die Top ${Math.floor(Nummer)}:**\n\n${lb.join("\n\n")}`;
         var length = 1995;
         var trimmedString = Nachricht.substring(0, length);
         if (Nachricht.length > 1999) message.channel.send(`${trimmedString}[...]`)
         else message.channel.send(trimmedString)
			}
	},
};