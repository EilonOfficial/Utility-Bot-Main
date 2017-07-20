const kicks = require("../data/kicks.json");
const Discord = require("discord.js");
const fs = require("fs")
exports.run = async function (bot, message, args) {
      let userid = args.slice(0).join(" ")
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
        if (foundCounter == 0) return message.channel.send("No kicks found for that user")
        message.channel.send("Found " + foundCounter + " kick(s).\n```" + found + "```");
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
      if (foundCounter == 0) return message.channel.send("No kicks found for that user")
      message.channel.send("Found " + foundCounter + " kick(s).\n```" + found + "```");
}

exports.help = {
  name: "kicks",
  description: "Shows the total kicks for a user.",
  usage: "kicks @mention / kicks <user ID>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0,
  aliases: []
}
