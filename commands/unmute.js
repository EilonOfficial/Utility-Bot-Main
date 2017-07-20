exports.run = async function (bot, message) {
  const args = message.content.split(/\s+/g).slice(1);
  if(args.length === 1){
    message.channel.send(`Are You Sure You Would Like To UnMute ${message.mentions.members.first()}?`).then(() => {
        message.channel.awaitMessages(response => response.author === message.author, {
            max : 1,
            time : 10000,
        }).then(() => {
            if(message.author.lastMessage.content === "Yes"){
                message.mentions.members.first().addRole(message.guild.roles.find("name", "Member"))
                message.mentions.members.first().removeRole(message.guild.roles.find("name", "Muted"))
                message.channel.send(`${message.mentions.members.first()} Is Now Unmuted.`)
            } else if(message.author.lastMessage.content === "No") message.channel.send('Ok, command cancelled.')
            else message.channel.send('Invalid Entry.')
        })
    })
  } else message.channel.send('Invalid Arguments. **Example:** `+help unmute`')
}

exports.help = {
  name: "unmute",
  description: "Unmutes A Specified User",
  usage: "unmute [@User]"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 2, 
  aliases: [] 
}
