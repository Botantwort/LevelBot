const Levels = require("discord-xp");

module.exports = {
    name: 'leaderboard',
    description: 'Zeigt die Top 10 des Servers an',
    async execute(message, args, client) {
        const rawLeaderboard = await Levels.fetchLeaderboard(741694739279118446, Nummer, true); // We grab top XY users with most xp in the current server.

        if (rawLeaderboard.length < 1) return message.reply("Keiner ist bisher im  Leaderboard.");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

        const lb = leaderboard.map(e => `${e.position}. ${e.username}  XP: ${e.xp.toLocaleString()}`); // We map the outputs.

        console.table(lb)
    }
}