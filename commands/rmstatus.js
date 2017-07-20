exports.run = async function (bot, message) {
  bot.user.setPresence({ status: ''})
}

exports.help = {
  name: "rmstatus",
  description: "Removes The Bots Status",
  usage: "rmstatus"
} 

exports.config = {
  enabled: false,
  guildOnly: false,
  permlevel: 8, 
  aliases: ["removestatus", "rmstat", "removestat", "rmst"] 
} //Disabled Need To Fix
