exports.run = async function (bot, message) {
  console.log(`${message.author.tag} runned the example command which basically does nothing.`);
}

exports.help = {
  name: "<command name>",
  description: "<what the command does>",
  usage: "<how to use the command>"
} 

exports.config = {
  enabled: false,
  guildOnly: false,
  permlevel: 0, 
  aliases: [] 
}
