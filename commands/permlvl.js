exports.run = async function (bot, message) {
  let perms = bot.elevation(message)
  message.reply("your permission level is: " + perms)
}

exports.help = {
  name: "permlvl",
  description: "Shows your permission level.",
  usage: "permlvl"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0,
  aliases: ["permlevel", "pmlvl", "pmlevel", "permissionlevel"]
}