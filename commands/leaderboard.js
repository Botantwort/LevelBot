const Levels = require("discord-xp");

module.exports = {
	name: 'leaderboard',
	description: 'Zeigt die Top 10 des Servers an',
	async execute(message, args, client) {
		const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

		if (rawLeaderboard.length < 1) return reply("Keiner ist bisher im  Leaderboard.");
		
		const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.
		
		const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.
		
		message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
	},
};