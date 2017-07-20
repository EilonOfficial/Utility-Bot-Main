const Discord = require("discord.js")
const embedcolors = require("../embedcolors.json")
const config = require("../config.json")
exports.run = async function (bot, message) {
  const embed = new Discord.RichEmbed()
  .setTitle("Music Help")
  .setColor(embedcolors.green_positive)
  .setFooter("Music Help")
  .setThumbnail(bot.user.avatarURL)
  .setTimestamp(message.createdAt)
  .addField("Commands:", "Here Are The Music Commands.")
  .addField(`${config.prefix}addqueue`, `**Usage:** ${config.prefix}addqueue [Youtube Url]\n**Description:** Adds A Url To The Queue`)
  .addField(`${config.prefix}play`, `**Usage:** ${config.prefix}play\n**Description:** Plays The Current Music In Queue`)
  .addField(`${config.prefix}pause`, `**Usage:** ${config.prefix}pause\n**Description:** Pauses The Current Queue`)
  .addField(`${config.prefix}resume`, `**Usage:** ${config.prefix}resume\n**Description:** Resumes The Current Queue`)
  .addField(`${config.prefix}stop`, `**Usage:** ${config.prefix}stop\n**Description:** Stops The Current Queue`)
  .addField(`${config.prefix}queue`, `**Usage:** ${config.prefix}queue\n**Description:** Displays The Queue`)
  .addField(`${config.prefix}leave`, `**Usage:** ${config.prefix}leave\n**Description:** Leaves The Voice Channel`)
  message.author.send({embed})
}

exports.help = {
  name: "helpmusic",
  description: "Gives You A List Of The Music Commands",
  usage: "helpmusic"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0, 
  aliases: ["musichelp"] 
}