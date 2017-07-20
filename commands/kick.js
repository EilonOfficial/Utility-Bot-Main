const Discord = require("discord.js");
const kicks = require("../data/kicks.json");
const embedcolors = require("../embedcolors.json");
const fs = require("fs");
exports.run = async function (bot, message, args) {
  if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) return message.reply("I do not have the correct permissions to do this.")
  let mention = message.mentions.users.first()
  let reason = args.slice(1).join(" ")
  let log_channel = message.guild.channels.find("name", "logs");
  if(!log_channel) {
    if(!message.guild.member(bot.user).hasPermission("MANAGE_CHANNELS")) return message.reply("there is not a `logs` channel.")
    message.guild.createChannel({name: "logs", type: "text"})
  }
  if(!message.mentions.users.size) return message.reply("you must mention someone to kick.")
  if(!message.guild.member(mention).kickable) return message.reply("I cannot kick that member.")
  if(message.mentions.users.size > 1) return message.reply("you can only kick one person at a time.")
  if(reason.length < 1) return message.reply("you must provide a reason for this kick.")
  let caseid = genToken(20)


    function genToken(length) {
        let key = ""
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

        for (let i = 0; i < length; i++) {
            key += possible.charAt(Math.floor(Math.random() * possible.length))
        }

        return key
    }
  const dcembed = new Discord.RichEmbed()
  .setTitle("Kick")
  .setColor(embedcolors.orange_warn)
  .setDescription(`${mention} just got kicked from the server.`)
  .addField("User:", mention.tag)
  .addField("Moderator:", message.author.tag)
  .addField("Reason:", reason)
  .addField("Case ID:", caseid)
  message.guild.defaultChannel.send({embed: dcembed})
  const lcembed = new Discord.RichEmbed()
  .setTitle("Kick")
  .setColor(embedcolors.orange_warn)
  .addField("User:", mention.tag)
  .addField("Moderator:", message.author.tag)
  .addField("Reason:", reason)
  .addField("Case ID:", caseid)
  bot.channels.get(log_channel.id).send({embed: lcembed})
  const urembed = new Discord.RichEmbed()
  .setTitle("Kick")
  .setColor(embedcolors.orange_warn)
  .addField("Moderator:", message.author.tag)
  .addField("Reason:", reason)
  .addField("Case ID:", caseid)
  message.guild.member(mention).send({embed: urembed})
  message.guild.member(mention).kick(7)
  message.channel.send("User successfully kicked.")
  kicks[caseid] = {
  "kick" : {
    "caseid" : caseid
  },
    "admin": {
        "name": message.author.username,
        "discrim": message.author.discriminator,
        "id": message.author.id
    },
    "user": {
        "name": mention.username,
        "discrim": mention.discriminator,
        "id": mention.id
    },
    "server": {
        "name": message.guild.name,
        "id": message.guild.id,
        "channel": message.channel.name,
        "channel_id": message.channel.id
    },
    "reason": reason
}
fs.writeFile("./data/kicks.json", JSON.stringify(kicks))
message.guild.channels.find("name", "logs").send
}

exports.help = {
  name: "kick",
  description: "Kicks the mentioned user.",
  usage: "kick <@user#0000> <reason>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 2,
  aliases: []
}
