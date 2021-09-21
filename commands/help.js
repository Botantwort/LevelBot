module.exports = {
	name: 'help',
	description: 'help halt',
	execute(message, args, client) {
		if (!message.member.hasPermission("ADMINISTRATOR")) {
		message.channel.send("**°leaderboard <nummer>** um die Top <nummer> anzuzeigen (max. 10)\n**°xp** um die Xp, und wie viel noch zur nächsten xprole fehlt, anzuzeigen\n**°level** oder **°rank** für den rank\n**°pass** um den Abstand zweier Personen anzuzeigen\n**°debug** um eine DM zu bekommen wenn du XP bekommst.\n**°hintergrund** um deinen Hintergrund bei der Rankcard zu ändern.");
		};
		
		if (message.member.hasPermission("ADMINISTRATOR")) {
		message.channel.send("**°leaderboard <nummer>** um die Top <nummer> anzuzeigen (max. 10)\n**°xp** um die Xp, und wie viel noch zur nächsten xprole fehlt, anzuzeigen\n**°level** oder **°rank** für den rank\n**°pass** um den Abstand zweier Personen anzuzeigen\n**°debug** um eine DM zu bekommen wenn du XP bekommst.\n**°hintergrund** um deinen Hintergrund bei der Rankcard zu ändern.\n**°edit** um das Level oder die XP eines Users zu verändern");
		}
		}
};