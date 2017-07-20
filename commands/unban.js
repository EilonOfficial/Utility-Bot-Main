exports.run = async function (bot, message, args) {
  if(args.length === 1){
    message.guild.unban(args[0]).then(() => {
        message.guild.channels.find("name", "general").send(`<@${args[0]}> Has Been Unbanned`)
        message.guild.channels.find("name", "logs").send(`<@${args[0]}> Has Been Unbanned`)
    })
  } else message.channel.send('Invalid Arguments. **Example:** `+help unban`')
}

exports.help = {
  name: "unban",
  description: "Unbans A User",
  usage: "unban [UserID]"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 4, 
  aliases: [] 
}
