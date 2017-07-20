const fs = require("fs");
const Discord = require("discord.js")
const embedcolors = require("../embedcolors.json")
exports.run = async function (bot, message, args) {
  bot.tempmutes = require("../data/tempmutes.json");
  let toTempMute = message.mentions.members.first() || message.guild.members.get(args[0])
  message.channel.send('Minutes, Hours Or Days? (M/H/D)').then(() => {
      message.channel.awaitMessages(response => response.author === message.author, {
          max : 1,
          time : 10000,
      }).then(() => {
        if(message.author.lastMessage.content === "M"){
              bot.tempmutes[toTempMute.id] = {
      guild : message.guild.id,
      time: Date.now() + parseInt(args[1]) * 60000,
      name: message.mentions.members.first().user.id
  }
 message.mentions.members.first().addRole(message.guild.roles.find("name", "Muted"))
 message.mentions.members.first().removeRole(message.guild.roles.find("name", "Member"))
  fs.writeFile("./data/tempmutes.json", JSON.stringify(bot.tempmutes, null, 4), err => {
      if(err) throw err;
      message.channel.send(`${message.mentions.members.first()} Has Been Muted For: ${args[1]} Minute(s).`)
      const embed = new Discord.RichEmbed()
      .setAuthor("User Muted", message.mentions.members.first().user.displayAvatarURL)
      .setThumbnail(message.mentions.members.first().user.displayAvatarURL)
      .setColor(embedcolors.green_positive)
      .setFooter("User Muted")
      .addField("User Muted:", message.mentions.members.first().user)
      .addField("Reason", "None")
      .addField("Mute Length:", `${args[1]} Minute(s)`)
      message.guild.channels.find("name", "logs").send({embed})
  })
        } else if(message.author.lastMessage.content === "H"){
              bot.tempmutes[toTempMute.id] = {
      guild : message.guild.id,
      time: Date.now() + parseInt(args[1]) * 3.6e+6,
      name: message.mentions.members.first().user.id
  }
 message.mentions.members.first().addRole(message.guild.roles.find("name", "Muted"))
message.mentions.members.first().removeRole(message.guild.roles.find("name", "Member"))
  fs.writeFile("./data/tempmutes.json", JSON.stringify(bot.tempmutes, null, 4), err => {
      if(err) throw err;
      message.channel.send(`${message.mentions.members.first()} Has Been Muted For: ${args[1]} Hour(s).`)
            const embed = new Discord.RichEmbed()
      .setAuthor("User Muted", message.mentions.members.first().user.displayAvatarURL)
      .setThumbnail(message.mentions.members.first().user.displayAvatarURL)
      .setColor(embedcolors.green_positive)
      .setFooter("User Muted")
      .addField("User Muted:", message.mentions.members.first().user)
      .addField("Reason", "None")
      .addField("Mute Length:", `${args[1]} Hour(s)`)
      message.guild.channels.find("name", "logs").send({embed})
  })
        } else if(message.author.lastMessage.content === "D"){
                             bot.tempmutes[toTempMute.id] = {
      guild : message.guild.id,
      time: Date.now() + parseInt(args[1]) * 8.64e+7,
      name: message.mentions.members.first().user.id
  }
 message.mentions.members.first().addRole(message.guild.roles.find("name", "Muted"))
 message.mentions.members.first().removeRole(message.guild.roles.find("name", "Member"))
  fs.writeFile("./data/tempmutes.json", JSON.stringify(bot.tempmutes, null, 4), err => {
      if(err) throw err;
      message.channel.send(`${message.mentions.members.first()} Has Been Muted For: ${args[1]} Day(s).`)
            const embed = new Discord.RichEmbed()
      .setAuthor("User Muted", message.mentions.members.first().user.displayAvatarURL)
      .setThumbnail(message.mentions.members.first().user.displayAvatarURL)
      .setColor(embedcolors.green_positive)
      .setFooter("User Muted")
      .addField("User Muted:", message.mentions.members.first().user)
      .addField("Reason", "None")
      .addField("Mute Length:", `${args[1]} Day(s)`)
      message.guild.channels.find("name", "logs").send({embed})
  })         
        }
      })
  })
}
exports.help = {
  name: "tempmute",
  description: "Temporairly Mutes A User",
  usage: "tempmute [@User] [Minutes]"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 4, 
  aliases: [] 
}
