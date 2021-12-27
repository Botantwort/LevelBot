const fs = require("fs");
const jsonfile = require("jsonfile");
module.exports = {
    name: 'debug',
    description: 'debug oder nicht?',
    async execute(message, args, client) {
        let role = message.guild.roles.cache.find(role => role.name == "Debug");
                if (!role) await message.guild.roles.create({
                    data: {
                        name: "Debug",
                    }
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Debug");
                if (!message.member.roles.cache.has(role.id)) {
                    await message.member.roles.add(role.id);
                  message.channel.send("Du hast die Debugrolle erhalten, wenn du sie nicht mehr haben willst nutze erneut ´°debug´")
                }
                else {
                    await message.member.roles.remove(role.id);
                      message.channel.send("Dir wurde die Debug rolle erfolgreich weggenommen, wenn du sie wieder haben willst nutze erneut ´°debug´")
                }
                return
            }
            
        }