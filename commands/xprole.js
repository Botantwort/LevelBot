const Levels = require("discord-xp")
const Discord = require('discord.js');
module.exports = {
  name: 'xprole',
  description: 'sagt bei wie viel xp man welche xprole bekommt',
  async execute(message, args, client) {
    if (message.channel.id !== "763758444179619880") return message.reply(`schau mal in <#763758444179619880>`);
    const embed = new Discord.MessageEmbed()
      .setTitle("Die XP roles:")
      .setDescription(`<@&795473864834154496> - 1.150 XP\n≙Level 3 und circa ${0.39 * (Levels.xpFor(4)-Levels.xpFor(3))} XP\n\n<@&795473870307196928> - 4.675 XP\n≙Level 6 und circa ${(Math.round((0.83 * (Levels.xpFor(7)-Levels.xpFor(6))) * 100) / 100).toLocaleString()} XP\n\n<@&795473882500300850> - 23.850 XP\n≙Level 15 und circa ${(Math.round((0.44 * (Levels.xpFor(16)-Levels.xpFor(15))) * 100) / 100).toLocaleString()} XP\n\n<@&795473895314423832> - 67.535 XP\n≙Level 25 und circa ${(Math.round((0.98 * (Levels.xpFor(26)-Levels.xpFor(25))) * 100) / 100).toLocaleString()} XP\n\n<@&796438950453051433> - 145.700 XP\n≙Level 38 und circa ${(Math.round((0.17 * (Levels.xpFor(39)-Levels.xpFor(38))) * 100) / 100).toLocaleString()} XP\n\n<@&845635328491913226> - 268.375 XP\n≙Level 51 und circa ${(Math.round((0.8 * (Levels.xpFor(52)-Levels.xpFor(51))) * 100) / 100).toLocaleString()} XP\n\n<@&795473913948798996> - 445.550 XP\n≙Level 66 und circa ${(Math.round((0.75 * (Levels.xpFor(67)-Levels.xpFor(66))) * 100) / 100).toLocaleString()} XP\n\n<@&795473920257425418> - 687.225 XP\n≙Level 82 und circa ${(Math.round((0.89 * (Levels.xpFor(83)-Levels.xpFor(82))) * 100) / 100).toLocaleString()} XP\n\n<@&796441187451011123> - 1.192.550 XP\n≙Level 109 und circa ${(Math.round((0.2 * (Levels.xpFor(110)-Levels.xpFor(109))) * 100) / 100).toLocaleString()} XP\n\n<@&796441192896266281> - 1.899.250 XP\n≙Level 137 und circa ${(Math.round((0.81 * (Levels.xpFor(138)-Levels.xpFor(137))) * 100) / 100).toLocaleString()} XP\n\n`)
      .setFooter("Warum sind das so komische Zahlen und nicht runde Levels etc.? Ganz einfach: Dieser Bot hat ein anderes Levelsystem als Mee oder Helpsie. Die Levelrewards sollten aber trotzdem diesselben bleiben, so war zum Beispiel 1.150 XP halt Level 5 bei den anderen Bots!")
    message.channel.send(embed)
  },
}