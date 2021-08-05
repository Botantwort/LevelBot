module.exports = {
	name: 'help',
	description: 'help halt',
	execute(message, args, client) {
		if (!message.member.hasPermission("ADMINISTRATOR")) {
		message.channel.send("°leaderboard fürs leaderboard; °level oder °rank für den rank.");
		};
		
		if (message.member.hasPermission("ADMINISTRATOR")) {
		message.channel.send("°leaderboard fürs leaderboard; °level oder °rank für den rank und °edit um das Level/ die XP eines Users zu verändern");
		}
		}
};