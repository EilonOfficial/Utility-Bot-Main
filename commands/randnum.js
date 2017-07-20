  exports.run = async function (bot, message) {
    var rand = [Math.floor(Math.random() * 1000)]
    message.reply("Your Number Is: " + rand)
}

exports.help = {
  name: "randnum",
  description: "Generates A Random Number 1-1000",
  usage: "randnum"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0, 
  aliases: ["rand#", "r#", "randomnumber", "randomnum"] 
}
