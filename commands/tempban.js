exports.run = async function (bot, message) {
  const config = require("../config.json")  
  const args = message.content.split(/\s/g).slice(1)
  if(args.length === 1){
  var User = message.guild.member(message.mentions.users.first())
  message.reply(`Are You Sure You Would Like To Ban ${User}? (Yes/No)`).then(() => {
      message.channel.awaitMessages(response => response.author === message.author, {
          max : 1,
          time : 30000
      }).then(() => {
          if(message.author.lastMessage.content === "Yes" || message.author.lastMessage.content === "yes"){
            message.channel.send(`Ok. How Long Would You Like To Ban ${User} For?`).then(() => {
                message.channel.awaitMessages(response => response.author === message.author, {
                    max : 1,
                    time : 30000
                }).then(() => {
                    if(message.author.lastMessage.content.startsWith("1") || message.author.lastMessage.content.startsWith("2") || message.author.lastMessage.content.startsWith("3") || message.author.lastMessage.content.startsWith("4") || message.author.lastMessage.content.startsWith("5") || message.author.lastMessage.content.startsWith("6") || message.author.lastMessage.content.startsWith(7) || message.author.lastMessage.content.startsWith("8") || message.author.lastMessage.content.startsWith("9") || message.author.lastMessage.content.startsWith("0")){
                        if(message.author.lastMessage.content.endsWith("1") || message.author.lastMessage.content.endsWith("2") || message.author.lastMessage.content.endsWith("3") || message.author.lastMessage.content.endsWith("4") || message.author.lastMessage.content.endsWith("5") || message.author.lastMessage.content.endsWith("6") || message.author.lastMessage.content.endsWith("7") || message.author.lastMessage.content.endsWith("8") || message.author.lastMessage.content.endsWith("9") || message.author.lastMessage.content.endsWith("0")){
                            var HowLong = message.author.lastMessage.content
                            User.ban(HowLong)
                        }  else message.channel.send("`Invalid Number`")
                    } else message.channel.send("`Invalid Number`")
                })
            });
          } else if(message.author.lastMessage.content === "No" || message.author.lastMessage.content === "no") message.channel.send('Ok. Command Cancelled.')
      })
  })
  } else message.channel.send(`You Did Not Provide An Argument. **Usage:** \`${config.prefix}tempban [@User]\``)
}

exports.help = {
  name: "tempban",
  description: "Tempararly Bans A User",
  usage: "tempban [@User]"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 4, 
  aliases: [] 
}
