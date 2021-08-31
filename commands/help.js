module.exports = {
	name: 'help',
	description: 'help halt',
	execute(message, args, client) {
		if (!message.member.hasPermission("ADMINISTRATOR")) {
		message.channel.send("**°leaderboard <nummer>** um die Top <nummer> anzuzeigen (max. 10)\n**°xp** um die Xp, und wie viel noch zur nächsten xprole fehlt, anzuzeigen\n**°level** oder **°rank** für den rank\n**°pass** um den Abstand zweier Personen anzuzeigen");
		};
		
		if (message.member.hasPermission("ADMINISTRATOR")) {
		message.channel.send("**°leaderboard <nummer>** um die Top <nummer> anzuzeigen (max. 10)\n**°xp** um die Xp, und wie viel noch zur nächsten xprole fehlt, anzuzeigen\n**°level** oder **°rank** für den rank\n**°pass** um den Abstand zweier Personen anzuzeigen\n**°edit** um das Level oder die XP eines Users zu verändern");
		}
		}
};