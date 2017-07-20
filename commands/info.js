exports.run = async function (bot, message) {
   const embedcolors = require("../embedcolors.json")
   const Discord = require('discord.js');
   const args = message.content.split(/\s+/g).slice(1);
   if(args.length < 1) message.channel.send('You Did Not Provide An Argument. **Usage:** `+info [@User]`')
   const avatar = message.guild.member(message.mentions.users.first()).user.avatarURL
   const DiscordUser = "@" + message.guild.member(message.mentions.users.first()).user.tag + "'s User Info"
   const UserId = message.guild.member(message.mentions.users.first()).user.id
   const Created = message.guild.member(message.mentions.users.first()).user.createdAt
   const Joined = message.guild.member(message.mentions.users.first()).joinedAt
   const Discriminator = "#" + message.guild.member(message.mentions.users.first()).user.discriminator
   var LMS = message.guild.member(message.mentions.users.first()).user.lastMessage
   const kicks = require("../data/kicks.json")
   const bans = require("../data/bans.json");
   const strikes = require("../data/strikes.json");
   
if(LMS === null) var LMS = "Not Found"

  function FindKicks(){
       let userid = message.guild.member(message.mentions.users.first()).user.id
      if(!userid) {
        let list = Object.keys(kicks);
        let found = '';
        let foundCounter = 0;
        let warnCase;
        //looking for the case id
        for (let i = 0; i < list.length; i++) {
            if (kicks[list[i]].user.id === message.author.id && kicks[list[i]].server.id === message.guild.id) {
                foundCounter++;
                found += `Case ID: ${(kicks[list[i]].kick.caseid)}\nUsername: ${kicks[list[i]].user.name}#${kicks[list[i]].user.discrim}\nAdmin: ${kicks[list[i]].admin.name}#${kicks[list[i]].admin.discrim}\nServer: ${kicks[list[i]].server.name}\nReason: ${kicks[list[i]].reason}\n\n`;
            }
        }
        getkicks = ("Found " + foundCounter + " kick(s).\n```" + found + "```");
        if (foundCounter == 0) getkicks = ("No kicks found for that user")
      }
      if(!message.guild.members.has(userid)) return;
      let list = Object.keys(kicks);
      let found = '';
      let foundCounter = 0;
      let warnCase;
      //looking for the case id
      for (let i = 0; i < list.length; i++) {
          if (kicks[list[i]].user.id === userid && kicks[list[i]].server.id === message.guild.id) {
              foundCounter++;
              found += `Case ID: ${(kicks[list[i]].kick.caseid)}\nUsername: ${kicks[list[i]].user.name}#${kicks[list[i]].user.discrim}\nAdmin: ${kicks[list[i]].admin.name}#${kicks[list[i]].admin.discrim}\nServer: ${kicks[list[i]].server.name}\nReason: ${kicks[list[i]].reason}\n\n`;
          }
      }
      getkicks = "Found " + foundCounter + " kick(s).\n```" + found + "```"
      if (foundCounter == 0) getkicks = ("No kicks found for that user")
  }
  function FindBans(){
            let userid = message.guild.member(message.mentions.users.first()).user.id
      if(!userid) {
        let list = Object.keys(bans);
        let found = '';
        let foundCounter = 0;
        let warnCase;
        //looking for the case id
        for (let i = 0; i < list.length; i++) {
            if (bans[list[i]].user.id === message.author.id && bans[list[i]].server.id === message.guild.id) {
                foundCounter++;
                found += `Case ID: ${(bans[list[i]].ban.caseid)}\nUsername: ${bans[list[i]].user.name}#${bans[list[i]].user.discrim}\nAdmin: ${bans[list[i]].admin.name}#${bans[list[i]].admin.discrim}\nServer: ${bans[list[i]].server.name}\nReason: ${bans[list[i]].reason}\n\n`;
            }
        }
        getbans = ("Found " + foundCounter + " ban(s).\n```" + found + "```");
        if (foundCounter == 0) getbans = ("No bans found for that user")
      }
      if(!message.guild.members.has(userid)) return;
      let list = Object.keys(bans);
      let found = '';
      let foundCounter = 0;
      let warnCase;
      //looking for the case id
      for (let i = 0; i < list.length; i++) {
          if (bans[list[i]].user.id === userid && bans[list[i]].server.id === message.guild.id) {
              foundCounter++;
              found += `Case ID: ${(bans[list[i]].ban.caseid)}\nUsername: ${bans[list[i]].user.name}#${bans[list[i]].user.discrim}\nAdmin: ${bans[list[i]].admin.name}#${bans[list[i]].admin.discrim}\nServer: ${bans[list[i]].server.name}\nReason: ${bans[list[i]].reason}\n\n`;
          }
      }
      getbans = "Found " + foundCounter + " ban(s).\n```" + found + "```"
      if (foundCounter == 0) getbans = ("No bans found for that user")
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
}
  FindBans()
  FindKicks()
  getstrikes()
   var Nickname = message.guild.member(message.mentions.users.first()).nickname
   if(Nickname === null) var Nickname = "No Nickname Found"   
   const embed = new Discord.RichEmbed()
   .setTitle(DiscordUser + ":")
   .setThumbnail(avatar)
   .setColor(embedcolors.green_positive)
   .addField("Identifier:", Discriminator)
   .addField("Nickname", Nickname)
   .addField("User ID:", UserId)
   .addField("Created At:", Created)
   .addField("Joined At:", Joined)
   .addField("Last Message Sent:", LMS)
   .addField("Bans:", getbans)
   .addField("Kicks:", getkicks)
   .addField("Strikes", findstrikes)
   message.channel.send({embed}) 
}


exports.help = {
  name: "info",
  description: "Brings Up User Information",
  usage: "info [@User]"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 2, 
  aliases: [] 
}
