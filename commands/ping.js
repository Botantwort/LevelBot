module.exports = {
	name: 'ping',
	description: 'Ping halt',
	execute(message, args, client) {
	  message.channel.send('Kleiner Moment...').then((resultMessage) => {
		const ping = resultMessage.createdTimestamp - message.createdTimestamp
  
		resultMessage.edit(`Bot Verzögerung: ${ping} ms, API Verzögerung: ${client.ws.ping} ms.`)
	  })
	},
  }