exports.run = async function (bot, message, args) {
  const Discord = require("discord.js")
  const embedcolors = require("../embedcolors.json")
  const strikes = require("../data/strikes.json");
  const fs = require("fs")
    if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) return message.reply("I do not have the correct permissions to do this.")
  let mention = message.mentions.users.first()
  let reason = args.slice(1).join(" ")
  let log_channel = message.guild.channels.find("name", "logs");
  if(!log_channel) {
    if(!message.guild.member(bot.user).hasPermission("MANAGE_CHANNELS")) return message.reply("there is not a `mod-logs` channel.")
    message.guild.createChannel({name: "mod-logs", type: "text"})
  }
  if(!message.mentions.users.size) return message.reply("you must mention someone to strike.")
  if(!message.guild.member(mention).kickable) return message.reply("I cannot strike that member.")
  if(message.mentions.users.size > 1) return message.reply("you can only strike one person at a time.")
  if(reason.length < 1) return message.reply("you must provide a reason for this strike.")
  let caseid = genToken(20)


    function genToken(length) {
        let key = ""
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

        for (let i = 0; i < length; i++) {
            key += possible.charAt(Math.floor(Math.random() * possible.length))
        }

        return key
    }
    function getstrikes(){
             let userid = message.guild.member(message.mentions.users.first()).user.id
      if(!userid) {
        let list = Object.keys(strikes);
        let found = '';
        let foundCounter = 0;
        let warnCase;
        //looking for the case id
        for (let i = 0; i < list.length; i++) {
            if (strikes[list[i]].user.id === message.author.id && strikes[list[i]].server.id === message.guild.id) {
                foundCounter++;
                found += `Case ID: ${(strikes[list[i]].kick.caseid)}\nUsername: ${strikes[list[i]].user.name}#${strikes[list[i]].user.discrim}\nAdmin: ${strikes[list[i]].admin.name}#${strikes[list[i]].admin.discrim}\nServer: ${strikes[list[i]].server.name}\nReason: ${strikes[list[i]].reason}\n\n`;
            }
        }
        findstrikes = ("Found " + foundCounter + " strike(s).\n```" + found + "```")
        if (foundCounter == 0) findstrikes = ("No strikes found for that user")
      }
      if(!message.guild.members.has(userid)) return;
      let list = Object.keys(strikes);
      let found = '';
      let foundCounter = 0;
      let warnCase;
      //looking for the case id
      for (let i = 0; i < list.length; i++) {
          if (strikes[list[i]].user.id === userid && strikes[list[i]].server.id === message.guild.id) {
              foundCounter++;
              found += `Case ID: ${(strikes[list[i]].kick.caseid)}\nUsername: ${strikes[list[i]].user.name}#${strikes[list[i]].user.discrim}\nAdmin: ${strikes[list[i]].admin.name}#${strikes[list[i]].admin.discrim}\nServer: ${strikes[list[i]].server.name}\nReason: ${strikes[list[i]].reason}\n\n`;
          }
      }
      findstrikes = ("Found " + foundCounter + " strike(s).\n```" + found + "```");
      if (foundCounter == 0) findstrikes = ("No strikes found for that user")
      if(foundCounter > 2){
    message.guild.member(message.mentions.users.first()).ban();
    message.channel.send(message.guild.member(message.mentions.users.first()).user.tag + ' Has Been Striken And Banned')
}
    }
   const embed = new Discord.RichEmbed()
  .setAuthor(message.guild.member(message.mentions.users.first()).user.tag + " Has Been Striken")
  .setColor(embedcolors.yellow_warn)
  .addField("Moderator", message.author.tag)
  .addField("Reason", reason)
  .addField("Case ID:", caseid)

  message.guild.channels.find("name", "logs").send({embed})
  message.channel.send({embed})

    strikes[caseid] = {
  "kick" : {
    "caseid" : caseid
  },
    "admin": {
        "name": message.author.username,
        "discrim": message.author.discriminator,
        "id": message.author.id
    },
    "user": {
        "name": mention.username,
        "discrim": mention.discriminator,
        "id": mention.id
    },
    "server": {
        "name": message.guild.name,
        "id": message.guild.id,
        "channel": message.channel.name,
        "channel_id": message.channel.id
    },
    "reason": reason
}
fs.writeFile("./data/strikes.json", JSON.stringify(strikes))
getstrikes()
}

exports.help = {
  name: "strike",
  description: "Strikes The Mentioned User",
  usage: "strike [@User] [Reason]"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 2, 
  aliases: [] 
}
