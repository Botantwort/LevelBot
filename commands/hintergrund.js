const fs = require("fs");
const jsonfile = require("jsonfile");

module.exports = {
    name: 'hintergrund',
    description: 'Setzte den Hintergrund bei der Rankcard',
    execute(message, args, client) {
        var settings = {};
        if (fs.existsSync("settings.json")) {
            settings = jsonfile.readFileSync("settings.json");
        }
        const Hintergrund = settings[message.author.id]
        const Anhang = (message.attachments)
        if (!args[0]) {
            if (!message.attachments.size) {
                message.channel.send("Bitte häng deinen Hintergrund an den Command an oder nutz `" + client.prefix + "hintergrund delete` um deinen Hintergrund zu löschen")
                return
            }
        }
        if (message.attachments.size == 1) {
            var URL = Anhang.array()[0].url
            if (!URL.endsWith(".png")) {
                if (!URL.endsWith(".jpg")) {
                    message.channel.send("Bitte nutz ein PNG oder JPG, der Rest funktioniert nicht.");
                    return
                }
            }
            Hintergrund.Hintergrund = URL
            jsonfile.writeFileSync("settings.json", settings)
            message.channel.send("Erfolgreich als Hintergrund gesetzt.")
            return
        }
        if (args[0] == "default") {
            if (Hintergrund.Hintergrund !== "default") {
                Hintergrund.Hintergrund = "default"
                jsonfile.writeFileSync("settings.json", settings)
                message.channel.send("Erfolgreich deinen Hintergrund auf default gesetzt.")
                return
            } else {
                message.channel.send("Du hast schon den default Hintergrund!")
                return
            }
        }
        if (args[0] == "delete") {
            if (Hintergrund.Hintergrund !== null) {
                Hintergrund.Hintergrund = null
                jsonfile.writeFileSync("settings.json", settings)
                message.channel.send("Erfolgreich deinen Hintergrund gelöscht")
                return
            } else {
                message.channel.send("Du hast schon keinen eigenen Hintergrund!")
                return
            }
        } else {
            message.channel.send("Bitte häng deinen Hintergrund an den Command an oder nutz `" + client.prefix + "hintergrund delete` um deinen Hintergrund zu löschen")
            return
        }
    }
}