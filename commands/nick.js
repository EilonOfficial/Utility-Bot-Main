const Discord = require("discord.js");
const nicks = require("../nicks.json");
const fs = require("fs");
exports.run = async function (bot, message, args) {
  if(!message.guild.id === "294504904935079936") return;
  let c = message.content
let nick = c.split(" ").splice(1).join(" ")

let caseid = genToken(5)

function genToken(length) {
    let key = ""
    let possible = "0123456789"

    for (let i = 0; i < length; i++) {
        key += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return key
}
const embed = new Discord.RichEmbed()
.setTitle("Nick Change Request")
.setColor("#00fffa")
.addField("Case ID:", caseid)
.addField("User:", message.author.tag)
.addField("Desired nickname:", nick)
bot.channels.get("320147660105580546").send({embed: embed})
nicks[caseid] = {
  "nickname" : {
    "caseid" : caseid
  },
  "user": {
    "name": message.author.username,
    "discrim": message.author.discriminator,
    "id": message.author.id
  },
  "server": {
    "name": message.guild.name,
    "id": message.guild.id,
    "channel": message.channel.name,
    "channel_id": message.channel.id
  },
  "nick": nick
}
fs.writeFile("../nicks.json", JSON.stringify(nicks))
}

exports.help = {
  name: "nick",
  description: "Request a new nickname.",
  usage: "nick <desired nickname>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0,
  aliases: []
}