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
        let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

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
        if (mentionedMember) {
            if (mentionedMember.user.bot) {
                return message.channel.send("Dies ist ein bot.")
            }
            const mentionedHintergrund = settings[mentionedMember.id]
            if (mentionedMember.id in settings === false) {
                settings[mentionedMember.id] = {
                    Hintergrund: null,
                    name: `${mentionedMember.user.username}#${mentionedMember.discriminator}`
                };
                jsonfile.writeFileSync("settings.json", settings)
            }
            if (!args[1]) {
                message.channel.send(`Das ist der Hintergrund von ${mentionedMember.user.username}: ${mentionedHintergrund.Hintergrund}`)
                return
            }
            if (args[1] == "steal") {
                if (mentionedMember == message.member) {
                    message.channel.send("Du kannst dich nicht selber bestehlen, so funktioniert das nicht.")
                    return
                }
                if (mentionedHintergrund == null || "default") {
                    message.channel.send(`Von ${mentionedMember.user.username} gibt es nichts zu stehlen, diese Person hat keinen eigenen Hintergrund`)
                    return
                } else {
                    if (Hintergrund.last !== Hintergrund.Hintergrund) {
                        Hintergrund.last = Hintergrund.Hintergrund
                        jsonfile.writeFileSync("settings.json", settings)
                    }
                    Hintergrund.Hintergrund = mentionedHintergrund.Hintergrund
                    jsonfile.writeFileSync("settings.json", settings)
                }
            }
            if (args [1] == "reset") {
                if (!message.member.hasPermission("ADMINISTRATOR")) {
                    return message.channel.send("Dazu hast du keine Rechte!")
                } else {
                    if (Hintergrund.last == Hintergrund.Hintergrund) {
                        Hintergrund.last = "default"
                        jsonfile.writeFileSync("settings.json", settings)
                    }
                    Hintergrund.Hintergrund = "default"
                    jsonfile.writeFileSync("settings.json", settings)
                    message.channel.send(`Der Hintergrund von ${mentionedMember.user.username} wurde erfolgrich resettet.`)
                }
            }

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
            message.channel.send('<a:loading:877227676035846204> Das dauert jetzt ein bisschen...')
                .then(msg => {
                    msg.delete({
                        timeout: 7000
                    });
                })
            const query = args.join(" ")
            const google = new image({
                puppeteer: {
                    headless: true,
                }
            })
            const results = await google.scrape(query, 1)
            BildURL = (results[0].url)
            if (Hintergrund.last !== Hintergrund.Hintergrund) {
                Hintergrund.last = Hintergrund.Hintergrund
                jsonfile.writeFileSync("settings.json", settings)

            }
            Hintergrund.Hintergrund = BildURL
            jsonfile.writeFileSync("settings.json", settings)
            message.channel.send(`Erfolgreich dieses Bild: ${BildURL} als Hintergrund gesetzt.`)

            return

        }
    }
}