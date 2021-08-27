module.exports = {
	name: 'help',
	description: 'help halt',
	execute(message, args, client) {
		if (!message.member.hasPermission("ADMINISTRATOR")) {
		message.channel.send("°leaderboard <nummer> für die Top <nummer>; °xp um die Xp, und wie viel noch zur nächsten xprole fehlt, anzuzeigen; °level oder °rank für den rank.");
		};
		
		if (message.member.hasPermission("ADMINISTRATOR")) {
		message.channel.send("°leaderboard <nummer> für die Top <nummer>; °xp um die Xp, und wie viel noch zur nächsten xprole fehlt, anzuzeigen; °level oder °rank für den rank und °edit um das Level oder die XP eines Users zu verändern");
		}
		}
};