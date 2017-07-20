exports.run = async function (bot, message) {
  var DiceFace = ["<:diceface1:330090887273119745>", "<:diceface2:330091146027991041>", "<:diceface3:330091339825807363>", "<:diceface4:330091474295455774>", "<:diceface5:330091570000822284>", "<:diceface6:330091695674753025>"]
  var rand = DiceFace[Math.floor(Math.random() * DiceFace.length)]
  message.reply("You Rolled: " + rand)
}

exports.help = {
  name: "roll",
  description: "Rolls A Die",
  usage: "roll"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0, 
  aliases: [] 
}
