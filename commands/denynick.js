const nicks = require("../nicks.json");
const Discord = require("discord.js");
const fs = require("fs");
const embedcolors = require("../embedcolors.json")
exports.run = async function (bot, message, args) {
  let modch = message.guild.channels.find("name", "logs")
  if(!modch) return message.channel.send("no log channel found")
  let pid = args.slice(0).join(" ");
  if(pid.length < 1) return message.reply("Please provide a nick ID to deny.")
  let list = Object.keys(nicks);
  let found;

  for (let i=0; i < list.length; i++) {
    if(nicks[list[i]].nickname.caseid === pid) {
      found = list[i];
      break;
    }
  }

  if(!found) return message.channel.send("```Error: The nickname with the provided ID does not exist.```")
  if(nicks[found].server.id !== message.guild.id) return message.reply("You can not do this as this nickname was not requested in this server.")
  var embed = new Discord.RichEmbed()
  .setTitle("Nickname Denied")
  .setColor(embedcolors.green_positive)
  .setThumbnail(message.author.avatarURL)
  .setFooter("Nickname Denied")
  .setTimestamp(message.createdAt)
  .addField("Moderator:", message.author.username)
  .addField("Desired Nickname:", `${nicks[found].nick}`)
  message.channel.send({embed})
  modch.send({embed})
  var embed = new Discord.RichEmbed()
  .setTitle("Nickname Request")
  .setColor(embedcolors.green_positive)
  .setFooter("Nickname Request")
  .setTimestamp(message.createdAt)
  .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/No_sign.svg/2000px-No_sign.svg.png")
  .addField("Status", "Denied")
  .addField("Denied By:", message.author.username)
  .addField("Denied At:", message.createdAt)

  message.guild.member(nicks[found].user.id).send({embed})
  delete nicks[found]
  fs.writeFile("../nicks.json", JSON.stringify(nicks))
}

exports.help = {
  name: "denynick",
  description: "Denies the nick change request by ID",
  usage: "denynick <ID>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 2,
  aliases: []
}
