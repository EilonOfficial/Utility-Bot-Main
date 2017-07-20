exports.run = async function (bot, message) {
  const Discord = require("discord.js")
  const args = message.content.split(/\s+/g).slice(1);
  const embedcolors = require("../embedcolors.json")
  var embed = new Discord.RichEmbed()
  .setTitle("Report")
  .setAuthor(message.author.tag + "'s Report")
  .setFooter("Report")
  .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/No_sign.svg/2000px-No_sign.svg.png")
  .setTimestamp(message.createdAt)
  .setColor(embedcolors.green_positive)
  .addField("Possible Offender:", message.guild.member(message.mentions.users.first()).user.tag)
  .addField("Possible Offense:", args[1])
  .addField("Possible Proof:", args[2])
  message.guild.channels.find("name", "reports").send({embed})

  if(args.length < 3) message.channel.send('You Did Not Provide An Argument. **Usage:** `+report [@User] [Offense] [Link To Screenshot]`')
}

exports.help = {
  name: "report",
  description: "Reports A Possibly Malicious User",
  usage: "report [@User] [Offense] [Imgur.com Link To Screenshot]"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0, 
  aliases: [] 
}
