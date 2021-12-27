const Levels = require("discord-xp");

module.exports = {
	name: 'leaderboard',
	description: 'Zeigt die Top 10 des Servers an',
	async execute(message, args, client) {
    Nachricht = ""
		Nummer = Math.floor(Number(args[0]))
		if (!args[0]) Nummer = Number(5)
		if (message.member.id !== "475719554689925141") {
			if (Nummer < 0) {
				return message.channel.send("Was war jetzt da die Idee dahinter? <:2Head:788349690198097920>")
			}
			if (!Nummer) {
				return message.channel.send("Was auch immer du da gemacht hast, es war keine gültige Zahl die du angegeben hast.")
			}
			if (Nummer > 10) {
				message.reply("übertreibs nicht, das Maximum ist 10");
				return;
			}
		}
		if (message.member.id == "475719554689925141") {
			if (args[0] == "all") Nummer = -1
			if (!Nummer) {
				return message.channel.send("Was auch immer du da gemacht hast, es war keine gültige Zahl die du angegeben hast.")
			}
		}
			{
				const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, Nummer, true); // We grab top XY users with most xp in the current server.

				if (rawLeaderboard.length < 1) return message.reply("Keiner ist bisher im  Leaderboard.");

				const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

				const lb = leaderboard.map(e => `${e.position}. ${e.username}  XP: ${e.xp.toLocaleString()}`); // We map the outputs.
				if (Nummer == -1) {
					Nachricht = `**Das gesamte Leaderboard:**\n\n${lb.join("\n\n")}`
				} else Nachricht = `**Die Top ${Math.floor(Nummer)}:**\n\n${lb.join("\n\n")}`;
                            var length = 2000;
                            var trimmedString = Nachricht.substring(0, length);
                              message.channel.send(trimmedString)
			}
	},
};