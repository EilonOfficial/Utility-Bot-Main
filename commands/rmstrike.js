const strikes = require("../data/strikes.json");
const Discord = require("discord.js");
const fs = require("fs");
exports.run = async function (bot, message, args) {
  let perms = bot.elevation(message)
  let pid = args.slice(0).join(" ");
  if(pid.length < 1) return message.reply("Please provide a strike ID to remove.")
  let list = Object.keys(strikes);
  let found;

  for (let i=0; i < list.length; i++) {
    if(strikes[list[i]].kick.caseid === pid) {
      found = list[i];
      break;
    }
  }

  if(!found) return message.reply("No strike found with that strike ID.")
  if(perms < 20 && strikes[found].server.id !== message.guild.id) return message.reply("You can not do this as this strike was not issued in this server.")
  message.channel.send('Strike Removed')
  delete strikes[found]
  fs.writeFile("./data/strikes.json", JSON.stringify(strikes))
}
exports.help = {
  name: "rmstrike",
  description: "Delete a strike with the ID.",
  usage: "rmstrike <strike ID>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 4,
  aliases: []
}
