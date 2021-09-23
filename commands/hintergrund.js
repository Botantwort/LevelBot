const fs = require("fs");
const jsonfile = require("jsonfile");
const image = require('images-scraper')

module.exports = {
    name: 'hintergrund',
    description: 'Setzte den Hintergrund bei der Rankcard',
    async execute(message, args, client) {
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
            if (Hintergrund.last !== Hintergrund.Hintergrund) {
                Hintergrund.last = Hintergrund.Hintergrund
                jsonfile.writeFileSync("settings.json", settings)
            }
            Hintergrund.Hintergrund = URL
            jsonfile.writeFileSync("settings.json", settings)
            message.channel.send("Erfolgreich als Hintergrund gesetzt.")
            return
        }
        if (args[0] == "default") {
            if (Hintergrund.Hintergrund !== "default") {
                if (Hintergrund.last !== Hintergrund.Hintergrund) {
                    Hintergrund.last = Hintergrund.Hintergrund
                    jsonfile.writeFileSync("settings.json", settings)
                }
                Hintergrund.Hintergrund = "default"
                jsonfile.writeFileSync("settings.json", settings)
                message.channel.send("Erfolgreich deinen Hintergrund auf default gesetzt.")
                return
            } else {
                message.channel.send("Du hast schon den default Hintergrund!")
                return
            }
        }
        if (args[0] == "last") {
            if (Hintergrund.last == Hintergrund.Hintergrund) {
                message.channel.send("Dein zuletzt genutzter Hintergrund ist derselbe wie dein jetziger.")
            }
            if (Hintergrund.last == null) {
                message.channel.send("Du hast zur Zeit keinen Hintergrund den du zuletzt genutzt hast")
                return
            }
            if (Hintergrund.last == "default") {
                Dummy = Hintergrund.Hintergrund
                Hintergrund.Hintergrund = "default"
                jsonfile.writeFileSync("settings.json", settings)
                Hintergrund.last = Dummy
                jsonfile.writeFileSync("settings.json", settings)
                message.channel.send("Erfolgreich deinen Hintergrund auf default gesetzt.")
                return
            }
            Dummy = Hintergrund.Hintergrund
            Hintergrund.Hintergrund = Hintergrund.last
            jsonfile.writeFileSync("settings.json", settings)
            Hintergrund.last = Dummy
            jsonfile.writeFileSync("settings.json", settings)
            message.channel.send("Erfolgreich als Hintergrund zu dem vorherigen zurück geändert.")
            return
        }
        if (args[0] == "delete") {
            if (Hintergrund.Hintergrund !== null) {
                if (Hintergrund.last !== Hintergrund.Hintergrund) {
                    Hintergrund.last = Hintergrund.Hintergrund
                    jsonfile.writeFileSync("settings.json", settings)
                }
                Hintergrund.Hintergrund = null
                jsonfile.writeFileSync("settings.json", settings)
                message.channel.send("Erfolgreich deinen Hintergrund gelöscht")
                return
            } else {
                message.channel.send("Du hast schon keinen eigenen Hintergrund!")
                return
            }
        } else {
            const google = new image({
                puppeteer: {
                    headless: true,
                }
            })
            const query = args.join(" ")
            message.channel.send('<a:loading:877227676035846204> Das dauert jetzt ein bisschen...').then(async (resultMessage) => {
                const results = await google.scrape(query, 1)
                BildURL = (results[0].url)
                if (Hintergrund.last !== Hintergrund.Hintergrund) {
                    Hintergrund.last = Hintergrund.Hintergrund
                    jsonfile.writeFileSync("settings.json", settings)

                }
                Hintergrund.Hintergrund = BildURL
                jsonfile.writeFileSync("settings.json", settings)
                resultMessage.edit(`Erfolgreich dieses Bild: ${BildURL} als Hintergrund gesetzt.`)
            })
            return

        }
    }
}