exports.run = async function (bot, message) {
  var args = message.content.split(/[ ]+/)
  if(args.length === 1){
      message.channel.send('You Did Not Define An Argument. **Usage:** `+setgame [Status]`')
  } else {
      result = args.join(" ").substring(9)
      bot.user.setPresence({ status: 'online', game: { name: result } });
  }
}

exports.help = {
  name: "setgame",
  description: "Sets The Status Of The Bot",
  usage: "setgame [Status]"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 8, 
  aliases: [] 
}
