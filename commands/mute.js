exports.run = async function (bot, message) {
    const args = message.content.split(/\s+/g).slice(1);
    if(args.length === 1){
        message.channel.send(`Are You Sure You Want To Mute ${message.mentions.members.first().user}? (Yes/No)`).then(() => {
            message.channel.awaitMessages(response => response.author === message.author, {
                max : 1,
                time : 10000,
            }).then(() => {
                if(message.author.lastMessage.content === "Yes"){
                    message.mentions.members.first().addRole(message.guild.roles.find("name", "Muted"))
                    message.mentions.members.first().removeRole(message.guild.roles.find("name", "Member"))
                    message.channel.send(`Ok, Muted ${message.mentions.members.first()}.`)
                } else if(message.author.lastMessage.content === "No") message.channel.send('Ok, Command Cancelled')
                else message.channel.send('Invalid Entry')
            })
        })
    } else message.channel.send('Invalid Arguments. **Example:** `+help mute`')
}

exports.help = {
  name: "mute",
  description: "Mutes A User",
  usage: "mute [@User]"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 2, 
  aliases: [] 
}
