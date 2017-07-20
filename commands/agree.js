const Discord = require("discord.js")
const config = require("../config.json")
const embedcolors = require("../embedcolors.json")
exports.run = async function (bot, message) {
  function pluck(array) {
    return array.map(function(item){ return item["name"];})
}
function hasRole(mem, role){
    if(pluck(mem.roles).includes(role)){
        return true;
    } else {
        return false;
    }
}
if(!hasRole(message.member, "Member")) {
  let role = message.guild.roles.find("name", "Member")
  message.guild.member(message.author).addRole(role)
  const embed = new Discord.RichEmbed()
  .setAuthor("Member Agreed To Guidelines", message.member.user.displayAvatarURL)
  .setColor(embedcolors.green_positive)
  .setFooter(`Member Agreed To Guidelines | Find More Info With: ${config.prefix}info ${message.author}`)
  .setTimestamp(message.createdAt)
  .addField("User:", message.author)
  .addField("Tag:", message.author.tag)
  .addField("Username:", message.member.user.username)
  .addField("Discriminator:", `#${message.member.user.discriminator}`)
  .addField("UserID:", message.author.id)
  .addField("Agreed At:", message.createdAt)
} else {
  message.author.send('```No Need To Agree! You Either Already Agreed Or Anti-Raid Is Off!```')
  message.channel.send('```No Need To Agree! You Either Already Agreed Or Anti-Raid Is Off!```')
}
}

exports.help = {
  name: "agree",
  description: "Declares That You Have Agreed To The Server Rules And Grants Access For You To Be A Member And Participate In The Server Itself.",
  usage: "agree"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0, 
  aliases: [] 
}
